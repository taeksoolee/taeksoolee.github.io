# No Build를 위한 lib 모음 입니다.

## 🧩 lit

### 1. `lib/*`을 `<root>`에 복사합니다.

### 2. jsconfig.json 생성 합니다.
```json
{
  "compilerOptions": {
    "paths": {
      "lib/*": ["./lib/*"]
    }
  }
}
```

### 3. 아래의 방법으로 사용합니다.

- *.html
```html
<!-- head 에 추가합니다. -->
<head>
  <script type="importmap">
    {
      "imports": {
        "lib/": "./lib/"
      }
    }
  </script>

  <!-- 작성한 파일 경로를 확인하여 작성합니다. -->
  <script type="module" src="./index.mjs"></script>
</head>

<head>
  <custom-component></custom-component>
</head>
```

- index.mjs
```js
import { LitElement, html, css } from 'lib/lit/index.mjs';

class CustomComponent extends LitElemenet {
  render() {

  }
}

customElement.define('custom-component', CustomComponent);
```