const prefixURL = "/blog/page";
const content = document.getElementById("content");

function ajaxGet(url) {
  return new Promise(function (resolve, reject) {
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        resolve(text);
      });
  });
}

const app = new Vue({
  el: "#app",
  data: {
    isOpendNav: false,
    category: category,
    selectedCategoryName: "",
    contents: contents,
  },
  methods: {
    toggleNav: function () {
      this.isOpendNav = !this.isOpendNav;
    },
    selectItem: function (categoryName) {
      this.selectedCategoryName = categoryName;
    },
    postPage: async function (page) {
      const text = await ajaxGet(
        `${prefixURL}/${page.depth1}/${page.depth2}/${page.fileName}`
      );
      console.log(text);
    },
  },
  computed: {
    pageList: function () {
      return this.contents.filter(
        (c) => c.depth1 === this.selectedCategoryName
      );
    },
  },
  filters: {
    iconSrc: function (name) {
      return "/blog/image/icon/" + name + ".png";
    },
  },
  mounted: function () {
    console.log("hello vue!!");

    this.selectedCategoryName = this.category[0].name;
  },
});
