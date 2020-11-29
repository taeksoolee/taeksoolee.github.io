const prefixURL = "/blog/page";
const content = document.getElementById("content");

const memoBox = document.querySelector(".memo-box");

function ajaxGet(url) {
  return new Promise(function (resolve, reject) {
    fetch(url)
      .then((res) => {
        if (res.status !== 200) reject("error!!");
        return res.text();
      })
      .then((text) => {
        resolve(text);
      });
  });
}

const app = new Vue({
  el: "#app",
  data: {
    window: window,
    isLoading: false,
    slidePointX: 0,
    isMovingContentList: false,
    memoBox: memoBox,

    isOpendNav: false,
    isHideContentList: false,
    isWrapContentsList: false,
    isOpenPopupscreen: false,
    isMinPopupscreen: true,
    isMinMemobox: true,

    category: category,
    contents: contents,

    content: "", // 실제 컨텐트 정보
    selectedPage: {}, // meta data를 위한 변수 선언
    pageAnimation: null,

    //
    selectedCategoryName: "",
    contentListPosition: 0,
    contentListMovingCnt: 0,

    //
    pageList: [],
    tmpPageList: [],
    titleInput: "",
    categoryItemNameList: [],
    pageListSortStandardList: ["none", "title", "date", "desc"],
    pageListSortStandard: "none",
    pageListSortMethodList: ["asc", "desc"],
    pageListSortMethod: "asc",
    sortTmpPageList: [],

    // 팝업관련 변수
    popupText: "",
    // 메모관련 변수
    memoBoxPositionTop: 0,
    memoBoxPositionLeft: 0,
    memoBoxMovingObj: { is: false, x: 0, y: 0, tmp: { top: 0, left: 0 } },
    memoText: "",
    //

    selectedCategoryItemName: "all",
  },
  methods: {
    resetSlider: function () {
      this.contentListPosition = 0;
      this.contentListMovingCnt = 0;
    },
    toggleNav: function () {
      this.isOpendNav = !this.isOpendNav;
    },
    selectItem: function (categoryName) {
      location.href = "#app";
      this.isHideContentList = false;
      this.isOpendNav = false;

      this.selectedCategoryName = categoryName;

      this.resetSlider();
      this.titleInput = "";
    },
    toggleContentList: function () {
      this.isHideContentList = !this.isHideContentList;
    },
    toogleWrapContentList: function () {
      this.isWrapContentsList = !this.isWrapContentsList;
      this.resetSlider();
    },
    pageLoadAnimation: function () {
      const content = this.$refs.content;

      if (content.style.opacity < 1) {
        // animation 속도
        content.style.opacity = parseFloat(content.style.opacity) + 0.02;

        this.pageAnimation = window.requestAnimationFrame(
          this.pageLoadAnimation
        );
      } else {
        window.cancelAnimationFrame(this.pageAnimation);
      }
    },
    getPage: async function (page) {
      // 페이지를 변경하는 함수
      this.isLoading = true;
      try {
        let text = await ajaxGet(
          `${prefixURL}/${page.depth1}/${page.depth2}/${page.fileName}`
        );

        text = covertCodeForHTML(text, page.depth1);
        const content = this.$refs.content;
        content.style.opacity = 0;
        this.pageLoadAnimation();

        this.content = `<pre class="pre">${text}</pre>`;
        this.selectedPage = page; // metadata 획득

        // 목록 닫음

        if(this.window.innerWidth < 812) {
          this.isHideContentList = true;
        }

        window.localStorage.setItem("page", JSON.stringify(page));
      } catch (e) {
        console.error(e);
        console.log("페이지에 내용이 존재하지 않습니다.."); // 수정 예정
      } finally {
        this.isLoading = false;
      }
    },
    openPopup: async function (type) {
      this.isOpenPopupscreen = true;

      const text = await ajaxGet(`/blog/popup/${type}`);
      this.popupText = text;
    },
    closePopup: function () {
      this.isOpenPopupscreen = false;
      this.popupText = "";
    },
    toggleMinPopupscreen: function () {
      this.isMinPopupscreen = !this.isMinPopupscreen;
    },
    searchTitle: function () {
      const tmpPageList = this.selectCategoryItemName();

      if (this.titleInput === "") {
        this.pageList = tmpPageList;
        return;
      }

      const regexp = new RegExp(this.titleInput);
      const pageList = tmpPageList.filter((page) => {
        return regexp.test(page.title) || regexp.test(page.fileName);
      });

      this.pageList = pageList;
    },
    handleAppMouseup: function(e) {
      if(this.isMovingContentList) {
        this.isMovingContentList = false;
        if(this.slidePointX - e.screenX < 0) {
          // left
          this.slideContentList(true);
        } else {
          // right
          this.slideContentList(false);
        }
      }
    },
    handleAppMousemove: function(e) {
      this.handleMoveMemeBox(e);
    },
    handleContentListMousedown: function(e) {
      this.isMovingContentList = true;
      this.slidePointX = e.screenX;
    },
    slideContentList(isLeft) {
      // 필요 변수 함수 정의 
      const blockSize = 14.9;
      const that = this;
      const wiw = this.window.innerWidth;
      const contentViewCnt =
          wiw > 1256
            ? 5
            : wiw > 1017
            ? 4
            : wiw > 706
            ? 3
            : wiw > 463
            ? 2
            : 1;

      // 뒤로 더 넘기지 않을때 사용
      function blockingAnimation(isLeft) {
        if(isLeft) {
          that.contentListPosition -= blockSize;
          setTimeout(function () {
            that.contentListPosition += blockSize;
          }, 200);
        } else {
          that.contentListPosition += blockSize;
          setTimeout(function () {
            that.contentListPosition -= blockSize;
          }, 200);
        }
      }

      // 반대편으로 넘길 때 사용
      function overAnimation(isLeft) {
        if(that.pageList.length <= contentViewCnt) {
          blockingAnimation(isLeft);
          return;
        }

        if(isLeft) {
          that.contentListPosition = - (blockSize * (that.pageList.length - contentViewCnt));
          that.contentListMovingCnt = that.pageList.length - contentViewCnt ;
        } else {
          that.contentListPosition = 0;
          that.contentListMovingCnt = 0;
        }
      }

      // /필요 변수 함수 정의 
      if (isLeft) {
        if (this.contentListMovingCnt <= 0) {
          // blockingAnimation();
          overAnimation(isLeft);
          return;
        }

        this.contentListPosition += blockSize;
        this.contentListMovingCnt--;
      } else {
        const movingMaxCnt = this.pageList.length - contentViewCnt;

        if (this.contentListMovingCnt >= movingMaxCnt || this.pageList.length < contentViewCnt) {
          // blockingAnimation();
          overAnimation(isLeft);
          return;
        }

        this.contentListPosition -= blockSize;
        this.contentListMovingCnt++;
      }
    },

    // memo box event
    handleDownMemoBox: function (e) {
      if (this.isMinMemobox) return;
      this.memoBoxMovingObj.is = true;
      this.memoBoxMovingObj.x = e.screenX;
      this.memoBoxMovingObj.y = e.screenY;
    },
    handleUpMemoBox: function (e) {
      this.memoBoxMovingObj.is = false;
    },
    handleMoveMemeBox: function (e) {
      // memobox가 이동상태인지 확인
      if (this.memoBoxMovingObj.is) {
        const memoBoxPositionLeft =
          this.memoBoxPositionLeft + e.screenX - this.memoBoxMovingObj.x;
        const memoBoxPositionTop =
          this.memoBoxPositionTop + e.screenY - this.memoBoxMovingObj.y;

        // 가로 끝점에 닿는지, 시작점인지 확인
        if (
          !(memoBoxPositionLeft < 0) &&
          window.innerWidth -
            this.$refs.memoBox.offsetWidth -
            memoBoxPositionLeft >
            0
        ) {
          this.memoBoxPositionLeft = memoBoxPositionLeft;
          this.memoBoxMovingObj.x = e.screenX;
        }
        // 세로 끝점에 닿는지 확인
        if (
          !(memoBoxPositionTop < 0) &&
          window.innerHeight -
            this.$refs.memoBox.offsetHeight -
            memoBoxPositionTop >
            0
        ) {
          this.memoBoxPositionTop = memoBoxPositionTop;
          this.memoBoxMovingObj.y = e.screenY;
        }
      }
    },
    handleMinMemobox: function () {
      this.isMinMemobox = !this.isMinMemobox;
    },
    selectCategoryItemName: function (command) {
      if (command === "clearTitle") {
        this.titleInput = "";
      }

      let tmpPageList = [];
      if (this.selectedCategoryItemName === "all") {
        tmpPageList = this.tmpPageList;
      } else {
        tmpPageList = this.tmpPageList.filter(
          (page) => page.depth2 === this.selectedCategoryItemName
        );
      }

      this.pageList = tmpPageList;

      return tmpPageList;
    },
  },
  watch: {
    selectedCategoryName: function (selectedCategoryName) {
      if (selectedCategoryName === "*") {
        this.pageList = this.contents;
      } else {
        this.pageList = this.contents.filter(
          (c) => c.depth1 === selectedCategoryName
        );
      }

      this.tmpPageList = JSON.parse(JSON.stringify(this.pageList));

      window.localStorage.setItem("categoryName", selectedCategoryName);
    },
    popupText: function (text) {
      // console.log(text);
    },
    memoText: function (text) {
      this.window.localStorage.setItem("memoText", text);
    },
    memoAreaWidth: function (width) {
      window.localStorage("memoAreaWidth", width);
    },
    memoAreaWidth: function (height) {
      window.localStorage("memoAreaHeight", height);
    },
    isMinMemobox: function (isMinMemobox) {
      if (isMinMemobox) {
        this.memoBoxMovingObj.tmp = {
          top: this.memoBoxPositionTop,
          left: this.memoBoxPositionLeft,
        };
        this.memoBoxPositionLeft = 0;
        this.memoBoxPositionTop = 0;
      } else {
        this.memoBoxPositionLeft = this.memoBoxMovingObj.tmp.left;
        this.memoBoxPositionTop = this.memoBoxMovingObj.tmp.top;
      }
    },
    tmpPageList: function (pageList) {
      const categoryItemNameList = ["all"];
      this.pageList.forEach(function (page) {
        const tmp = categoryItemNameList.find((n) => {
          return n == page.depth2;
        });

        if (tmp === undefined) {
          categoryItemNameList.push(page.depth2);
        }
      });

      this.categoryItemNameList = categoryItemNameList;
      this.selectedCategoryItemName = "all";
    },
    pageListSortStandard: function (pageListSortStandard, prev) {
      // 구현해야 함... 미구현
      if (prev === "none") {

      }
      console.log(this.pageListSortMethod, pageListSortStandard);
    },
    pageListSortMethod: function (pageListSortMethod, prev) {
      console.log(pageListSortMethod, this.pageListSortStandard);
      this.sortTmpPageList = this.pageList;
    },
  },
  computed: {
    selectedCategoryItemNameList: function () {
      const result = [];
      console.log(this.pageList);
      this.pageList.forEach(function (page) {
        console.log(page);
      });

      return result;
    },
  },
  filters: {
    iconSrc: function (name) {
      return "/blog/image/icon/" + name + ".png";
    },
    convertDateToString: function (str) {
      if (str === undefined) return "";
      return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)}`;
    },
  },
  mounted: function () {
    this.selectedCategoryName = this.category[0].name;
    const page = window.localStorage.getItem("page");
    if (page !== null) {
      this.getPage(JSON.parse(page));
    }

    const categoryName = window.localStorage.getItem("categoryName");
    if (categoryName !== null) {
      this.selectItem(categoryName);
    }

    const memoText = window.localStorage.getItem("memoText");
    if (memoText !== null) {
      this.memoText = memoText;
    }
  },
  created: function () {
    window.document.getElementById("app").style.display = "block";
  },
});
