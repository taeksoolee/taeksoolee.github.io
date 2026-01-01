import { LitElement, html, css } from 'lib/lit/index.mjs';

export class SpotLight extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .spotlight {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /* 초기 위치를 화면 밖으로 설정 */
      background: radial-gradient(
        600px circle at var(--x, -100%) var(--y, -100%), 
        rgba(37, 99, 235, 0.08), 
        transparent 40%
      );
      pointer-events: none;
      z-index: 9999;
    }
  `;

  constructor() {
    super();
    this._handler = (e) => this._updateSpotlight(e);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('mousemove', this._handler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('mousemove', this._handler);
  }

  _updateSpotlight(e) {
    // Shadow DOM 내부의 엘리먼트에 접근할 때는 this.renderRoot를 사용합니다.
    // (createRenderRoot를 안 썼다면 기본적으로 shadowRoot를 가리킵니다)
    window.requestAnimationFrame(() => {
      const spotlight = this.renderRoot.querySelector('#spotlight');
      if (spotlight) {
        spotlight.style.setProperty('--x', `${e.clientX}px`);
        spotlight.style.setProperty('--y', `${e.clientY}px`);
      }
    });
  }

  render() {
    return html`
      <div class="spotlight" id="spotlight"></div>
    `;
  }
}

customElements.define('spot-light', SpotLight);