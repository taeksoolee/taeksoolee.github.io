import { LitElement, html, css } from 'lib/lit/index.mjs';

export class SpotLight extends LitElement {
  static styles = css`
    :host { display: block; }

    .spotlight {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 9999;
    }

    .layer-1 {
      background: radial-gradient(
        280px circle at var(--x, -200%) var(--y, -200%),
        rgba(37, 99, 235, 0.13),
        transparent 70%
      );
    }

    .layer-2 {
      background: radial-gradient(
        700px circle at var(--x2, -200%) var(--y2, -200%),
        rgba(14, 165, 233, 0.05),
        transparent 60%
      );
    }
  `;

  constructor() {
    super();
    this._target = { x: -200, y: -200 };
    this._pos1 = { x: -200, y: -200 };
    this._pos2 = { x: -200, y: -200 };
    this._tickerCb = null;
    this._mouseCb = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._mouseCb = (e) => {
      this._target.x = e.clientX;
      this._target.y = e.clientY;
    };
    window.addEventListener('mousemove', this._mouseCb);

    this.updateComplete.then(() => {
      const l1 = this.renderRoot.querySelector('#sl1');
      const l2 = this.renderRoot.querySelector('#sl2');

      this._tickerCb = () => {
        // layer1: 빠른 추적
        this._pos1.x += (this._target.x - this._pos1.x) * 0.1;
        this._pos1.y += (this._target.y - this._pos1.y) * 0.1;
        // layer2: 느린 추적
        this._pos2.x += (this._target.x - this._pos2.x) * 0.045;
        this._pos2.y += (this._target.y - this._pos2.y) * 0.045;

        l1.style.setProperty('--x', `${this._pos1.x}px`);
        l1.style.setProperty('--y', `${this._pos1.y}px`);
        l2.style.setProperty('--x2', `${this._pos2.x}px`);
        l2.style.setProperty('--y2', `${this._pos2.y}px`);
      };

      gsap.ticker.add(this._tickerCb);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('mousemove', this._mouseCb);
    if (this._tickerCb) gsap.ticker.remove(this._tickerCb);
  }

  render() {
    return html`
      <div class="spotlight layer-1" id="sl1"></div>
      <div class="spotlight layer-2" id="sl2"></div>
    `;
  }
}

customElements.define('spot-light', SpotLight);
