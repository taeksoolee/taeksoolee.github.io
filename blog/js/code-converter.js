function covertCodeForHTML(text, language) {
  switch (language) {
    case schema.html:
      return convertJavascript(text);
    case schema.css:
      return convertJavascript(text);
    case schema.javascript:
      return convertJavascript(text);
    case schema.typescript:
      return convertJavascript(text);
    case schema.nodejs:
      return convertJavascript(text);
    case schema.java:
      return convertJavascript(text);
    case schema.python:
      return convertPython(text);
    case schema.go:
      return convertJavascript(text);
    case schema.c:
      return convertJavascript(text);
    case schema.rust:
      return convertJavascript(text);
    case schema.linux:
      return convertJavascript(text);
    case schema.kali:
      return convertJavascript(text);
    case schema.docker:
      return convertJavascript(text);
    case schema.database:
      return convertJavascript(text);
    case schema.server:
      return convertJavascript(text);
    case schema.cloud:
      return convertJavascript(text);
    case schema.ide:
      return convertJavascript(text);
    case schema.git:
      return convertJavascript(text);
    case schema.etc:
      return convertJavascript(text);
    default:
      return convertJavascript(text);
  }
}

function convertJavascript(text) {
  return text
    .convertHTML()
    .replaceAll(/(function )/g, (t) => `<span class="c-blue">${t}</span>`)
    .replaceAll(/(if )|(else )/g, (t) => `<span class="c-green">${t}</span>`)
    .replaceAll(
      /(switch)|(case)|(continue)|(break)|(default)|(return)|(try)|(catch)/g,
      (t) => `<span class="switch">${t}</span>`
    )
    .replaceAll(/(var)/g, (t) => `<span class="c-yellow">${t}</span>`)
    .replaceAll(
      /(const )|(let )/g,
      (t) => `<span class="c-lightgreen">${t}</span>`
    )
    .replaceAll(
      /(class )|(interface)|(impliments)|(extends)/g,
      (t) => `<span class=".c-lightpurple">${t}</span>`
    )
    .replaceAll(
      /(require)|(import)|(export)|(module\.exports)|(export default)|(from)/g,
      (t) => `<span class="c-lightpink">${t}</span>`
    )
    .replaceAll(
      /[\+-/%=?:{}()[]]/g,
      (t) => '<span class="c-skyblue">' + t + "</span>"
    );
}

function convertPython(text) {
  return (
    text
      .convertHTML()
      .replaceAll(/(def)/g, (t) => `<span class="c-blue">${t}</span>`)
      .replaceAll(/(if)|(else)/g, (t) => `<span class="c-green">${t}</span>`)
      .replaceAll(
        /(switch)|(case)|(continue)|(break)|(default)|(return)|(try)|(except)/g,
        (t) => `<span class="switch">${t}</span>`
      )
      // .replaceAll(/(var)/g, (t) => `<span class="c-yellow">${t}</span>`)
      // .replaceAll(
      //   /(const)|(let)/g,
      //   (t) => `<span class="c-lightgreen">${t}</span>`
      // )
      .replaceAll(
        /(class )|(interface)|(impliments)|(extends)/g,
        (t) => `<span class=".c-lightpurple">${t}</span>`
      )
      .replaceAll(
        /(require)|(import)|(export)|(module\.export)|(export default)|(:)/g,
        (t) => `<span class="c-lightpink">${t}</span>`
      )
      .replaceAll(
        /[\+-/%=?:{}()[]]/g,
        (t) => '<span class="c-skyblue">' + t + "</span>"
      )
  );
}

//syntax에 맞는 코드 형식 변환
String.prototype.convertHTML = function () {
  return (
    this
      // 코드 안에 samp 태그를 사용하면 html 태그 사용가능 하도록 설정 (꺽쇠 무시)
      .replaceAll(/<code>.*<\/code>/gs, function (codeText) {
        const startcode = "codecodecode";
        const endcode = "/code/code/code";

        return codeText
          .replaceAll("<code>", startcode)
          .replaceAll("</code>", endcode)
          .replaceAll(/<samp>.*<\/samp>/gs, function (sampText) {
            return sampText
              .replaceAll("<samp>", "")
              .replaceAll("</samp>", "")
              .replaceAll(/[<>]/g, function (tag) {
                return `<span>${tag}</span>`;
              });
          })
          .replaceAll(startcode, "<code>")
          .replaceAll(endcode, "</code>");
      })
  );
};