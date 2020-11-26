//syntax에 맞는 코드 형식 변환

function covertCodeForHTML(text, language) {
  switch (language) {
    case schema.javascript:
      return text
        .replaceAll("function", '<span class="function">function</span>')
        .replaceAll("if", '<span class="if">if</span>')
        .replaceAll("else", '<span class="else">else</span>')
        .replaceAll("switch", '<span class="switch">switch</span>')
        .replaceAll("case", '<span class="case">case</span>')
        .replaceAll("continue", '<span class="continue">continue</span>')
        .replaceAll("break", '<span class="break">break</span>')
        .replaceAll("default", '<span class="default">default</span>')
        .replaceAll("return", '<span class="return">return</span>')
        .replaceAll("var", '<span class="var">var</span>')
        .replaceAll("const", '<span class="const">const</span>')
        .replaceAll("let", '<span class="let">let</span>')
        .replaceAll("try", '<span class="try">try</span>')
        .replaceAll("catch", '<span class="catch">catch</span>')
        .replaceAll("class ", '<span class="class">class </span>')
        .replaceAll("interface ", '<span class="interface">interface </span>')
        .replaceAll("extends", '<span class="extends">extends</span>')
        .replaceAll("impliments", '<span class="impliments">impliments</span>')
        .replaceAll("import", '<span class="import">import</span>')
        .replaceAll("module.export", '<span class="module-export">catch</span>')
        .replaceAll(
          "export defualt",
          '<span class="export-default">export default</span>'
        )
        .replaceAll("export", '<span class="export">catch</span>')
        .replaceAll("require", '<span class="require">require</span>')
        .replaceAll(".", '<span class="dot">.</span>')
        .replaceAll("{", '<span class="bracket">{</span>')
        .replaceAll("}", '<span class="bracket">}</span>')
        .replaceAll("(", '<span class="bracket">(</span>')
        .replaceAll(")", '<span class="bracket">)</span>')
        .replaceAll("[", '<span class="bracket">[</span>')
        .replaceAll("]", '<span class="bracket">]</span>');
    case schema.go:
      return text;
    case schema.linux:
      return text;
    default:
      return text;
  }
}
