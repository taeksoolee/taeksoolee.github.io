const contents = [
  {
    title: "html",
    depth1: schema.html,
    depth2: schema.html,
    depth3: schema.html,
    depth4: schema.html,
    fileName: "html.htm",
    desc: "html",
    date: "20201121",
  },
  {
    title: "css",
    depth1: schema.css,
    depth2: schema.css,
    depth3: schema.css,
    depth4: schema.css,
    fileName: "css.htm",
    desc: "css",
    date: "20201121",
  },
  {
    title: "flex box",
    depth1: schema.css,
    depth2: schema.css,
    depth3: schema.css,
    depth4: schema.css,
    fileName: "flex-box.htm",
    desc: "flex-box,justify-contents,align-items",
    date: "20201127",
  },
  {
    title: "grid layout",
    depth1: schema.css,
    depth2: schema.css,
    depth3: schema.css,
    depth4: schema.css,
    fileName: "grid-layout.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "animation",
    depth1: schema.css,
    depth2: schema.css,
    depth3: schema.css,
    depth4: schema.css,
    fileName: "animation.htm",
    desc: "animtation",
    date: "20201121",
  },
  {
    title: "less",
    depth1: schema.css,
    depth2: schema.less,
    depth3: schema.less,
    depth4: schema.less,
    fileName: "less.htm",
    desc: "less",
    date: "20201202",
  },
  {
    title: "sass",
    depth1: schema.css,
    depth2: schema.sass,
    depth3: schema.sass,
    depth4: schema.sass,
    fileName: "sass.htm",
    desc: "sass",
    date: "20201202",
  },
  {
    title: "scss",
    depth1: schema.css,
    depth2: schema.scss,
    depth3: schema.scss,
    depth4: schema.scss,
    fileName: "scss.htm",
    desc: "scss",
    date: "20201202",
  },
  {
    title: "bootstrap",
    depth1: schema.css,
    depth2: schema.bootstrap,
    depth3: schema.bootstrap,
    depth4: schema.bootstrap,
    fileName: "bootstrap.htm",
    desc: "bootstrap",
    date: "20201202",
  },
  {
    title: "javascript",
    depth1: schema.javascript,
    depth2: schema.javascript,
    depth3: schema.javascript,
    depth4: schema.javascript,
    fileName: "javascript.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "es6",
    depth1: schema.javascript,
    depth2: schema.javascript,
    depth3: schema.javascript,
    depth4: schema.javascript,
    fileName: "es6.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "es7",
    depth1: schema.javascript,
    depth2: schema.javascript,
    depth3: schema.javascript,
    depth4: schema.javascript,
    fileName: "es7.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "dom",
    depth1: schema.javascript,
    depth2: schema.javascript,
    depth3: schema.javascript,
    depth4: schema.javascript,
    fileName: "dom.htm",
    desc: "",
    date: "20201204",
  },
  {
    title: "worker 객체: 멀티스레드",
    depth1: schema.javascript,
    depth2: schema.javascript,
    depth3: schema.javascript,
    depth4: schema.javascript,
    fileName: "worker.htm",
    desc: "",
    date: "20201205",
  },
  {
    title: "d3",
    depth1: schema.javascript,
    depth2: schema.d3,
    depth3: schema.d3,
    depth4: schema.d3,
    fileName: "d3.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "angularjs",
    depth1: schema.javascript,
    depth2: schema.angularjs,
    depth3: schema.angularjs,
    depth4: schema.angularjs,
    fileName: "angularjs.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "react",
    depth1: schema.javascript,
    depth2: schema.react,
    depth3: schema.react,
    depth4: schema.react,
    fileName: "react.htm",
    desc: "",
    date: "20201127",
  },
  {
    title: "react hook",
    depth1: schema.javascript,
    depth2: schema.react,
    depth3: schema.react,
    depth4: schema.react,
    fileName: "hooks.htm",
    desc: "",
    date: "20201129",
  },
  {
    title: "redux",
    depth1: schema.javascript,
    depth2: schema.react,
    depth3: schema.redux,
    depth4: schema.redux,
    fileName: "redux.htm",
    desc: "react,redux",
    date: "20201127",
  },
  {
    title: "next",
    depth1: schema.javascript,
    depth2: schema.react,
    depth3: schema.next,
    depth4: schema.next,
    fileName: "next.htm",
    desc: "",
    date: "20201127",
  },
  {
    title: "react-native",
    depth1: schema.javascript,
    depth2: schema.reactNative,
    depth3: schema.reactNative,
    depth4: schema.reactNative,
    fileName: "react-native.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "vue",
    depth1: schema.javascript,
    depth2: schema.vue,
    depth3: schema.vue,
    depth4: schema.vue,
    fileName: "vue.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "vuex",
    depth1: schema.javascript,
    depth2: schema.vue,
    depth3: schema.vue,
    depth4: schema.vue,
    fileName: "vuex.htm",
    desc:
      "state, 상태, getters, mutation, 전이, mapState, mapGetters, mapMutations",
    date: "20201201",
  },
  {
    title: "vue cli",
    depth1: schema.javascript,
    depth2: schema.vue,
    depth3: schema.vue,
    depth4: schema.vue,
    fileName: "vue-cli.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "vue-3.x",
    depth1: schema.javascript,
    depth2: schema.vue,
    depth3: schema.vue,
    depth4: schema.vue,
    fileName: "vue3.htm",
    desc: "mixin",
    date: "20201201",
  },
  {
    title: "vue-directive",
    depth1: schema.javascript,
    depth2: schema.vue,
    depth3: schema.vue,
    depth4: schema.vue,
    fileName: "vue-directive.htm",
    desc: "",
    date: "20201201",
  },
  {
    title: "vue-config",
    depth1: schema.javascript,
    depth2: schema.vue,
    depth3: schema.vue,
    depth4: schema.vue,
    fileName: "vue-dconfig.htm",
    desc: "",
    date: "20201202",
  },
  {
    title: "vue-render",
    depth1: schema.javascript,
    depth2: schema.vue,
    depth3: schema.vue,
    depth4: schema.vue,
    fileName: "vue-render.htm",
    desc: "",
    date: "20201201",
  },
  {
    title: "vue-slot",
    depth1: schema.javascript,
    depth2: schema.vue,
    depth3: schema.vue,
    depth4: schema.vue,
    fileName: "vue-slot.htm",
    desc: "scope",
    date: "20201202",
  },
  {
    title: "vue-fontawesome : 아이콘",
    depth1: schema.javascript,
    depth2: schema.vue,
    depth3: schema.vue,
    depth4: schema.vue,
    fileName: "vue-fontawesome.htm",
    desc: "",
    date: "20201202",
  },
  {
    title: "vue-animation",
    depth1: schema.javascript,
    depth2: schema.vue,
    depth3: schema.vue,
    depth4: schema.vue,
    fileName: "vue-animation.htm",
    desc: "",
    date: "20201204",
  },
  {
    title: "babel",
    depth1: schema.javascript,
    depth2: schema.babel,
    depth3: schema.babel,
    depth4: schema.babel,
    fileName: "babel.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "grunt",
    depth1: schema.javascript,
    depth2: schema.grunt,
    depth3: schema.grunt,
    depth4: schema.grunt,
    fileName: "grunt.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "webpack",
    depth1: schema.javascript,
    depth2: schema.webpack,
    depth3: schema.webpack,
    depth4: schema.webpack,
    fileName: "webpack.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "gulp",
    depth1: schema.javascript,
    depth2: schema.gulp,
    depth3: schema.gulp,
    depth4: schema.gulp,
    fileName: "gulp.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "threejs",
    depth1: schema.javascript,
    depth2: schema.threejs,
    depth3: schema.threejs,
    depth4: schema.threejs,
    fileName: "threejs.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "amcharts",
    depth1: schema.javascript,
    depth2: schema.amcharts,
    depth3: schema.amcharts,
    depth4: schema.amcharts,
    fileName: "amcharts.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "jquery",
    depth1: schema.javascript,
    depth2: schema.jquery,
    depth3: schema.jquery,
    depth4: schema.jquery,
    fileName: "jquery.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "svelte",
    depth1: schema.javascript,
    depth2: schema.svelte,
    depth3: schema.svelte,
    depth4: schema.svelte,
    fileName: "svelte.htm",
    desc: "",
    date: "20201202",
  },
  {
    title: "typescript",
    depth1: schema.typescript,
    depth2: schema.typescript,
    depth3: schema.typescript,
    depth4: schema.typescript,
    fileName: "typescript.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "angular",
    depth1: schema.typescript,
    depth2: schema.angular,
    depth3: schema.angular,
    depth4: schema.angular,
    fileName: "angular.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "nodejs",
    depth1: schema.nodejs,
    depth2: schema.nodejs,
    depth3: schema.nodejs,
    depth4: schema.nodejs,
    fileName: "nodejs.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "node server",
    depth1: schema.nodejs,
    depth2: schema.nodejs,
    depth3: schema.nodejs,
    depth4: schema.nodejs,
    fileName: "node-server.htm",
    desc: "",
    date: "20201205",
  },
  {
    title: "nodemailer",
    depth1: schema.nodejs,
    depth2: schema.nodejs,
    depth3: schema.nodejs,
    depth4: schema.nodejs,
    fileName: "nodemailer.htm",
    desc: "",
    date: "20201205",
  },
  {
    title: "npm - node package manager",
    depth1: schema.nodejs,
    depth2: schema.npm,
    depth3: schema.npm,
    depth4: schema.npm,
    fileName: "npm.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "dotenv (환경변수 설정)",
    depth1: schema.nodejs,
    depth2: schema.nodejs,
    depth3: schema.nodejs,
    depth4: schema.nodejs,
    fileName: "dotenv.htm",
    desc: "",
    date: "20201201",
  },
  {
    title: "express",
    depth1: schema.nodejs,
    depth2: schema.express,
    depth3: schema.express,
    depth4: schema.express,
    fileName: "express.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "express-graphql",
    depth1: schema.nodejs,
    depth2: schema.express,
    depth3: schema.graphql,
    depth4: schema.graphql,
    fileName: "graphql.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "express 설치도구",
    depth1: schema.nodejs,
    depth2: schema.express,
    depth3: schema.express,
    depth4: schema.express,
    fileName: "generator.htm",
    desc: "generate",
    date: "20201207",
  },
  {
    title: "nestjs",
    depth1: schema.nodejs,
    depth2: schema.nestjs,
    depth3: schema.nestjs,
    depth4: schema.nestjs,
    fileName: "nestjs.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "sockeio",
    depth1: schema.nodejs,
    depth2: schema.socketio,
    depth3: schema.socketio,
    depth4: schema.socketio,
    fileName: "socketio.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "java",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "java.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "variable 변수",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "variable.htm",
    desc: "java",
    date: "20201205",
  },
  {
    title: "operator 연산자",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "operator.htm",
    desc: "java",
    date: "20201205",
  },
  {
    title: "반복문 / 분기문",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "control.htm",
    desc: "java, control",
    date: "20201205",
  },
  {
    title: "array 배열",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "array.htm",
    desc: "java",
    date: "20201205",
  },
  {
    title: "java-oop",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "oop.htm",
    desc: "java, 오버로드, overload, this, construct, static, method, class",
    date: "20201205",
  },
  {
    title: "java-oop: encapsulation 캡슐화",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "oop-encapsulation.htm",
    desc: "java, getter, setter",
    date: "20201205",
  },
  {
    title: "java-oop: relation 관계(+상속)",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "oop-relation.htm",
    desc:
      "java, 일반화, Generalization, 실체화, Realization, 연관, Association, 집합, Aggregation, 복합, Compostion, 의존 Dependency, 상속 Inheritance, super, override, final, 추상클래스, abstract class",
    date: "20201205",
  },
  {
    title: "interface",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "interface.htm",
    desc: "java",
    date: "20201205",
  },
  {
    title: "enum",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "enum.htm",
    desc: "java",
    date: "20201205",
  },
  {
    title: "Access Modifier",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "access-modifier.htm",
    desc: "java",
    date: "20201205",
  },
  {
    title: "package와 import",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "package-import.htm",
    desc: "java",
    date: "20201205",
  },
  {
    title: "jdk api",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "api.htm",
    desc: "java, wrapper, util, gui, awt, swing, net, io",
    date: "20201205",
  },
  {
    title: "collection api",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "api-collection.htm",
    desc: "Map, Set, List",
    date: "20201205",
  },
  {
    title: "stream api",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "api-stream.htm",
    desc: "M",
    date: "20201205",
  },
  {
    title: "exception / throw",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "api.htm",
    desc: "java",
    date: "20201205",
  },
  {
    title: "multi thread",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "multi-thread.htm",
    desc: "java, 다중쓰레드, 멀티쓰레드",
    date: "20201205",
  },
  {
    title: "annotation",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "annotation.htm",
    desc: "java",
    date: "20201205",
  },
  {
    title: "javaFX",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "javafx.htm",
    desc: "java, gui",
    date: "20201205",
  },
  {
    title: "외부 라이브러리",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "lib.htm",
    desc: "java, ojdbc6, 오라클, 프록시",
    date: "20201205",
  },
  {
    title: "로그 log",
    depth1: schema.java,
    depth2: schema.java,
    depth3: schema.java,
    depth4: schema.java,
    fileName: "log.htm",
    desc: "Log4j, slf4j, logback",
    date: "20201205",
  },
  {
    title: "servlet",
    depth1: schema.java,
    depth2: schema.jsp,
    depth3: schema.jsp,
    depth4: schema.jsp,
    fileName: "servlet.htm",
    desc: "java, cookie, seesion, file upload, lifecycle",
    date: "20201205",
  },
  {
    title: "jsp",
    depth1: schema.java,
    depth2: schema.jsp,
    depth3: schema.jsp,
    depth4: schema.jsp,
    fileName: "jsp.htm",
    desc: "java, jdbc, pagin, address, 주소 테이블",
    date: "20201205",
  },
  {
    title: "spring",
    depth1: schema.java,
    depth2: schema.spring,
    depth3: schema.spring,
    depth4: schema.spring,
    fileName: "spring.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "spring boot",
    depth1: schema.java,
    depth2: schema.springboot,
    depth3: schema.springboot,
    depth4: schema.springboot,
    fileName: "springboot.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "my batis",
    depth1: schema.java,
    depth2: schema.mybatis,
    depth3: schema.mybatis,
    depth4: schema.mybatis,
    fileName: "mybatis.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "maven",
    depth1: schema.java,
    depth2: schema.maven,
    depth3: schema.maven,
    depth4: schema.maven,
    fileName: "maven.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "gradle",
    depth1: schema.java,
    depth2: schema.gradle,
    depth3: schema.gradle,
    depth4: schema.gradle,
    fileName: "gradle.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "android",
    depth1: schema.java,
    depth2: schema.android,
    depth3: schema.android,
    depth4: schema.android,
    fileName: "android.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "python",
    depth1: schema.python,
    depth2: schema.python,
    depth3: schema.python,
    depth4: schema.python,
    fileName: "python.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "openpyxl",
    depth1: schema.python,
    depth2: schema.python,
    depth3: schema.python,
    depth4: schema.python,
    fileName: "openpyxl.htm",
    desc: "excel, 엑셀",
    date: "20201204",
  },
  {
    title: "pyautogui",
    depth1: schema.python,
    depth2: schema.python,
    depth3: schema.python,
    depth4: schema.python,
    fileName: "pyautogui.htm",
    desc: "python, gui",
    date: "20201204",
  },
  {
    title: "pymysql",
    depth1: schema.python,
    depth2: schema.python,
    depth3: schema.python,
    depth4: schema.python,
    fileName: "pymysql.htm",
    desc: "mysql, mariadb",
    date: "20201204",
  },
  {
    title: "pynput",
    depth1: schema.python,
    depth2: schema.python,
    depth3: schema.python,
    depth4: schema.python,
    fileName: "pymysql.htm",
    desc: "keyboard event",
    date: "20201204",
  },
  {
    title: "python 가상환경",
    depth1: schema.python,
    depth2: schema.python,
    depth3: schema.python,
    depth4: schema.python,
    fileName: "python-venv.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "pyinstaller - python 실행파일",
    depth1: schema.python,
    depth2: schema.python,
    depth3: schema.python,
    depth4: schema.python,
    fileName: "pyinstaller.htm",
    desc: "",
    date: "20201202",
  },
  {
    title: "flask",
    depth1: schema.python,
    depth2: schema.flask,
    depth3: schema.flask,
    depth4: schema.flask,
    fileName: "flask.htm",
    desc: "",
    date: "20201205",
  },
  {
    title: "jinja",
    depth1: schema.python,
    depth2: schema.flask,
    depth3: schema.jinja,
    depth4: schema.jinja,
    fileName: "jinja.htm",
    desc: "",
    date: "20201205",
  },
  {
    title: "django",
    depth1: schema.python,
    depth2: schema.django,
    depth3: schema.django,
    depth4: schema.django,
    fileName: "django.htm",
    desc: "",
    date: "20201126",
  },
  {
    title: "django-orm",
    depth1: schema.python,
    depth2: schema.django,
    depth3: schema.django,
    depth4: schema.django,
    fileName: "django-orm.htm",
    desc: "",
    date: "20201203",
  },
  {
    title: "django-mysql",
    depth1: schema.python,
    depth2: schema.django,
    depth3: schema.django,
    depth4: schema.django,
    fileName: "django-mysql.htm",
    desc: "mariadb",
    date: "20201203",
  },
  {
    title: "pygame",
    depth1: schema.python,
    depth2: schema.pygame,
    depth3: schema.pygame,
    depth4: schema.pygame,
    fileName: "pygame.htm",
    desc: "python",
    date: "20201205",
  },
  {
    title: "selenium",
    depth1: schema.python,
    depth2: schema.selenium,
    depth3: schema.selenium,
    depth4: schema.selenium,
    fileName: "selenium.htm",
    desc: "python",
    date: "20201205",
  },
  {
    title: "beautifulsoup",
    depth1: schema.python,
    depth2: schema.beautifulsoup,
    depth3: schema.beautifulsoup,
    depth4: schema.beautifulsoup,
    fileName: "beautifulsoup.htm",
    desc: "python",
    date: "20201205",
  },
  {
    title: "pip",
    depth1: schema.python,
    depth2: schema.pip,
    depth3: schema.pip,
    depth4: schema.pip,
    fileName: "python.htm",
    desc: "",
    date: "20201202",
  },
  {
    title: "python mongodb",
    depth1: schema.python,
    depth2: schema.python,
    depth3: schema.python,
    depth4: schema.python,
    fileName: "pymongo.htm",
    desc: "",
    date: "20201126",
  },
  {
    title: "go",
    depth1: schema.go,
    depth2: schema.go,
    depth3: schema.go,
    depth4: schema.go,
    fileName: "go.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "go json",
    depth1: schema.go,
    depth2: schema.go,
    depth3: schema.go,
    depth4: schema.go,
    fileName: "go-json.htm",
    desc: "",
    date: "20201127",
  },
  {
    title: "echo framework",
    depth1: schema.go,
    depth2: schema.echo,
    depth3: schema.echo,
    depth4: schema.echo,
    fileName: "echo.htm",
    desc: "",
    date: "20201205",
  },
  {
    title: "C",
    depth1: schema.c,
    depth2: schema.c,
    depth3: schema.c,
    depth4: schema.c,
    fileName: "c.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "역사",
    depth1: schema.c,
    depth2: schema.c,
    depth3: schema.c,
    depth4: schema.c,
    fileName: "history.htm",
    desc: "c, history",
    date: "20201206",
  },
  {
    title: "포인터",
    depth1: schema.c,
    depth2: schema.c,
    depth3: schema.c,
    depth4: schema.c,
    fileName: "pointer.htm",
    desc: "c, pointer",
    date: "20201206",
  },
  {
    title: "알고리즘",
    depth1: schema.c,
    depth2: schema.c,
    depth3: schema.c,
    depth4: schema.c,
    fileName: "algorithm.htm",
    desc: "c, algorithm",
    date: "20201206",
  },
  {
    title: "컴파일",
    depth1: schema.c,
    depth2: schema.c,
    depth3: schema.c,
    depth4: schema.c,
    fileName: "compile.htm",
    desc: "c, compiler",
    date: "20201206",
  },
  {
    title: "parallel",
    depth1: schema.c,
    depth2: schema.c,
    depth3: schema.c,
    depth4: schema.c,
    fileName: "parallel.htm",
    desc: "c, parallel",
    date: "20201206",
  },
  {
    title: "c++",
    depth1: schema.cpp,
    depth2: schema.cpp,
    depth3: schema.cpp,
    depth4: schema.cpp,
    fileName: "cpp.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "c#",
    depth1: schema.csharp,
    depth2: schema.csharp,
    depth3: schema.csharp,
    depth4: schema.csharp,
    fileName: "csharp.htm",
    desc: "c, sharp",
    date: "20201206",
  },
  {
    title: "dotnet",
    depth1: schema.csharp,
    depth2: schema.dotnet,
    depth3: schema.dotnet,
    depth4: schema.dotnet,
    fileName: "dotnet.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "unity",
    depth1: schema.csharp,
    depth2: schema.unity,
    depth3: schema.unity,
    depth4: schema.unity,
    fileName: "unity.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "rust",
    depth1: schema.rust,
    depth2: schema.rust,
    depth3: schema.rust,
    depth4: schema.rust,
    fileName: "rust.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "nvm",
    depth1: schema.linux,
    depth2: schema.linux,
    depth3: schema.linux,
    depth4: schema.nodejs,
    fileName: "nvm.htm",
    desc: "",
    date: "20201209",
  },
  {
    title: "linux",
    depth1: schema.linux,
    depth2: schema.linux,
    depth3: schema.linux,
    depth4: schema.linux,
    fileName: "linux.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "tmux",
    depth1: schema.linux,
    depth2: schema.linux,
    depth3: schema.linux,
    depth4: schema.linux,
    fileName: "tmux.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "man",
    depth1: schema.linux,
    depth2: schema.linux,
    depth3: schema.linux,
    depth4: schema.linux,
    fileName: "man.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "cron",
    depth1: schema.linux,
    depth2: schema.linux,
    depth3: schema.linux,
    depth4: schema.linux,
    fileName: "cron.htm",
    desc: "",
    date: "20201202",
  },
  {
    title: "파일형식",
    depth1: schema.linux,
    depth2: schema.linux,
    depth3: schema.linux,
    depth4: schema.linux,
    fileName: "file-format.htm",
    desc: "",
    date: "20201207",
  },
  {
    title: "vim",
    depth1: schema.linux,
    depth2: schema.vim,
    depth3: schema.vim,
    depth4: schema.vim,
    fileName: "vim.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "zsh",
    depth1: schema.linux,
    depth2: schema.zsh,
    depth3: schema.zsh,
    depth4: schema.zsh,
    fileName: "zsh.htm",
    desc: "oh-my-zsh, ohmyzsh",
    date: "20201121",
  },
  {
    title: "ssh",
    depth1: schema.linux,
    depth2: schema.ssh,
    depth3: schema.ssh,
    depth4: schema.ssh,
    fileName: "ssh.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "ssl",
    depth1: schema.linux,
    depth2: schema.ssl,
    depth3: schema.ssl,
    depth4: schema.ssl,
    fileName: "ssl.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "ubuntu",
    depth1: schema.linux,
    depth2: schema.ubuntu,
    depth3: schema.ubuntu,
    depth4: schema.ubuntu,
    fileName: "ubuntu.htm",
    desc: "chrome, wine, 한글설치, zip, unzip",
    date: "20201121",
  },
  {
    title: "centos",
    depth1: schema.linux,
    depth2: schema.centos,
    depth3: schema.centos,
    depth4: schema.centos,
    fileName: "centos.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "kali",
    depth1: schema.kali,
    depth2: schema.kali,
    depth3: schema.kali,
    depth4: schema.kali,
    fileName: "kali.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "stack(buffer)overflow",
    depth1: schema.kali,
    depth2: schema.kali,
    depth3: schema.kali,
    depth4: schema.kali,
    fileName: "kali.htm",
    desc: "버퍼오버플로우, 스택오버플로우",
    date: "20201121",
  },
  {
    title: "metasploit",
    depth1: schema.kali,
    depth2: schema.metasploit,
    depth3: schema.metasploit,
    depth4: schema.metasploit,
    fileName: "metasploit.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "wireshark",
    depth1: schema.kali,
    depth2: schema.wireshark,
    depth3: schema.wireshark,
    depth4: schema.wireshark,
    fileName: "wireshark.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "burpsuite",
    depth1: schema.kali,
    depth2: schema.burpsuite,
    depth3: schema.burpsuite,
    depth4: schema.burpsuite,
    fileName: "burpsuite.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "ollydbg",
    depth1: schema.kali,
    depth2: schema.dbg,
    depth3: schema.ollydbg,
    depth4: schema.ollydbg,
    fileName: "ollydbg.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "docker",
    depth1: schema.docker,
    depth2: schema.docker,
    depth3: schema.docker,
    depth4: schema.docker,
    fileName: "docker.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "docker hub",
    depth1: schema.docker,
    depth2: schema.docker,
    depth3: schema.docker,
    depth4: schema.docker,
    fileName: "dockerhub.htm",
    desc: "dockerhub",
    date: "20201205",
  },
  {
    title: "kubernetes",
    depth1: schema.docker,
    depth2: schema.kubernetes,
    depth3: schema.kubernetes,
    depth4: schema.kubernetes,
    fileName: "kubernetes.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "database",
    depth1: schema.database,
    depth2: schema.database,
    depth3: schema.database,
    depth4: schema.database,
    fileName: "database.htm",
    desc: "transcation, 트랜젝션",
    date: "20201121",
  },
  {
    title: "sql",
    depth1: schema.database,
    depth2: schema.sql,
    depth3: schema.sql,
    depth4: schema.sql,
    fileName: "sql.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "oracle",
    depth1: schema.database,
    depth2: schema.oracle,
    depth3: schema.oracle,
    depth4: schema.oracle,
    fileName: "oracle.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "oracle function",
    depth1: schema.database,
    depth2: schema.oracle,
    depth3: schema.oracle,
    depth4: schema.oracle,
    fileName: "function.htm",
    desc: "",
    date: "20201129",
  },
  {
    title: "mysql / mariadb",
    depth1: schema.database,
    depth2: schema.mysql,
    depth3: schema.mysql,
    depth4: schema.mysql,
    fileName: "mysql.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "mysql / mariadb : index",
    depth1: schema.database,
    depth2: schema.mysql,
    depth3: schema.mysql,
    depth4: schema.mysql,
    fileName: "sql-index.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "mysql / mariadb : engine",
    depth1: schema.database,
    depth2: schema.mysql,
    depth3: schema.mysql,
    depth4: schema.mysql,
    fileName: "mysql.htm",
    desc: "InnoDB, MyISAM",
    date: "20201206",
  },
  {
    title: "nosql",
    depth1: schema.database,
    depth2: schema.nosql,
    depth3: schema.nosql,
    depth4: schema.nosql,
    fileName: "nosql.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "mongodb",
    depth1: schema.database,
    depth2: schema.mongodb,
    depth3: schema.mongodb,
    depth4: schema.mongodb,
    fileName: "mongodb.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "mlab",
    depth1: schema.database,
    depth2: schema.mongodb,
    depth3: schema.mongodb,
    depth4: schema.mongodb,
    fileName: "mlab.htm",
    desc: "클라우드서비스",
    date: "20201205",
  },
  {
    title: "mongodb sharding",
    depth1: schema.database,
    depth2: schema.mongodb,
    depth3: schema.mongodb,
    depth4: schema.mongodb,
    fileName: "sharding.htm",
    desc: "",
    date: "20201130",
  },
  {
    title: "redis",
    depth1: schema.database,
    depth2: schema.redis,
    depth3: schema.redis,
    depth4: schema.redis,
    fileName: "redis.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "firebase",
    depth1: schema.database,
    depth2: schema.firebase,
    depth3: schema.firebase,
    depth4: schema.firebase,
    fileName: "firebase.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "server",
    depth1: schema.server,
    depth2: schema.server,
    depth3: schema.server,
    depth4: schema.server,
    fileName: "server.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "nginx",
    depth1: schema.server,
    depth2: schema.nginx,
    depth3: schema.nginx,
    depth4: schema.nginx,
    fileName: "nginx.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "apache",
    depth1: schema.server,
    depth2: schema.apache,
    depth3: schema.apache,
    depth4: schema.apache,
    fileName: "apache.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "cloud",
    depth1: schema.cloud,
    depth2: schema.cloud,
    depth3: schema.cloud,
    depth4: schema.cloud,
    fileName: "cloud.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "aws",
    depth1: schema.cloud,
    depth2: schema.aws,
    depth3: schema.aws,
    depth4: schema.aws,
    fileName: "aws.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "oracle cloud",
    depth1: schema.cloud,
    depth2: schema.oracleclude,
    depth3: schema.oracleclude,
    depth4: schema.oracleclude,
    fileName: "oraclecloud.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "ide",
    depth1: schema.ide,
    depth2: schema.ide,
    depth3: schema.ide,
    depth4: schema.ide,
    fileName: "ide.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "eclipse",
    depth1: schema.ide,
    depth2: schema.eclipse,
    depth3: schema.eclipse,
    depth4: schema.eclipse,
    fileName: "eclipse.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "eclipse-web",
    depth1: schema.ide,
    depth2: schema.eclipse,
    depth3: schema.eclipse,
    depth4: schema.eclipse,
    fileName: "web.htm",
    desc: "",
    date: "20201205",
  },
  {
    title: "eclipse-git",
    depth1: schema.ide,
    depth2: schema.eclipse,
    depth3: schema.git,
    depth4: schema.git,
    fileName: "eclipse-git.htm",
    desc: "",
    date: "20201205",
  },
  {
    title: "eclipse-svn",
    depth1: schema.ide,
    depth2: schema.eclipse,
    depth3: schema.svn,
    depth4: schema.svn,
    fileName: "eclipse-svn.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "vscode",
    depth1: schema.ide,
    depth2: schema.vscode,
    depth3: schema.vscode,
    depth4: schema.vscode,
    fileName: "vscode.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "git",
    depth1: schema.git,
    depth2: schema.git,
    depth3: schema.git,
    depth4: schema.git,
    fileName: "git.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "github",
    depth1: schema.git,
    depth2: schema.github,
    depth3: schema.github,
    depth4: schema.github,
    fileName: "github.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "gitlab",
    depth1: schema.git,
    depth2: schema.gitlab,
    depth3: schema.gitlab,
    depth4: schema.gitlab,
    fileName: "gitlab.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "etc",
    depth1: schema.etc,
    depth2: schema.etc,
    depth3: schema.etc,
    depth4: schema.etc,
    fileName: "etc.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "regexp : 정규식",
    depth1: schema.etc,
    depth2: schema.etc,
    depth3: schema.etc,
    depth4: schema.etc,
    fileName: "regexp.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "programing",
    depth1: schema.etc,
    depth2: schema.etc,
    depth3: schema.etc,
    depth4: schema.etc,
    fileName: "programing.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "license",
    depth1: schema.etc,
    depth2: schema.etc,
    depth3: schema.etc,
    depth4: schema.etc,
    fileName: "license.htm",
    desc: "MIT",
    date: "20201206",
  },
  {
    title: "operating system",
    depth1: schema.etc,
    depth2: schema.os,
    depth3: schema.os,
    depth4: schema.os,
    fileName: "os.htm",
    desc: "os, 운영체제",
    date: "20201206",
  },
  {
    title: "windows",
    depth1: schema.etc,
    depth2: schema.windows,
    depth3: schema.windows,
    depth4: schema.windows,
    fileName: "windows.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "chocolate",
    depth1: schema.etc,
    depth2: schema.windows,
    depth3: schema.choco,
    depth4: schema.choco,
    fileName: "choco.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "virtualbox",
    depth1: schema.etc,
    depth2: schema.virtualbox,
    depth3: schema.virtualbox,
    depth4: schema.virtualbox,
    fileName: "virtualbox.htm",
    desc: "",
    date: "20201205",
  },
  {
    title: "network",
    depth1: schema.etc,
    depth2: schema.network,
    depth3: schema.network,
    depth4: schema.network,
    fileName: "network.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "iso 7 layer",
    depth1: schema.etc,
    depth2: schema.network,
    depth3: schema.network,
    depth4: schema.network,
    fileName: "network.htm",
    desc: "ISO, iso, 7계층, network",
    date: "20201121",
  },
  {
    title: "octet",
    depth1: schema.etc,
    depth2: schema.network,
    depth3: schema.network,
    depth4: schema.network,
    fileName: "octet.htm",
    desc: "network",
    date: "20201207",
  },
  {
    title: "network protocol",
    depth1: schema.etc,
    depth2: schema.network,
    depth3: schema.network,
    depth4: schema.network,
    fileName: "protocol.htm",
    desc: "프로토콜",
    date: "20201206",
  },
  {
    title: "protocol : snmp",
    depth1: schema.etc,
    depth2: schema.network,
    depth3: schema.network,
    depth4: schema.network,
    fileName: "snmp.htm",
    desc: "SNMP, network, 프로토콜",
    date: "20201207",
  },
  {
    title: "network web",
    depth1: schema.etc,
    depth2: schema.network,
    depth3: schema.network,
    depth4: schema.network,
    fileName: "web.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "network ssh",
    depth1: schema.etc,
    depth2: schema.network,
    depth3: schema.ssh,
    depth4: schema.ssh,
    fileName: "ssh.htm",
    desc: "",
    date: "20201206",
  },
  {
    title: "hardware",
    depth1: schema.etc,
    depth2: schema.hardware,
    depth3: schema.hardware,
    depth4: schema.hardware,
    fileName: "hardware.htm",
    desc: "",
    date: "20201121",
  },
  {
    title: "raspberrypi",
    depth1: schema.etc,
    depth2: schema.raspberrypi,
    depth3: schema.raspberrypi,
    depth4: schema.raspberrypi,
    fileName: "raspberrypi.htm",
    desc: "",
    date: "20201121",
  },
];
