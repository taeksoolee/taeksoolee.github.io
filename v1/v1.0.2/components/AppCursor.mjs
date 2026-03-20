import { LitElement, html, css } from 'lib/lit/index.mjs';

export class AppCursor extends LitElement {
  static styles = css`
    :host { display: block; }

    .c-dot {
      position: fixed;
      width: 5px;
      height: 5px;
      background: #fff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999998;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
    }

    .c-ring {
      position: fixed;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999997;
      transform: translate(-50%, -50%);
      border: 1.5px solid rgba(37, 99, 235, 0.6);
      transition: width 0.22s cubic-bezier(0.23, 1, 0.32, 1),
                  height 0.22s cubic-bezier(0.23, 1, 0.32, 1),
                  background 0.22s ease,
                  border-color 0.22s ease,
                  opacity 0.3s ease;
    }

    .c-ring.hovered {
      width: 56px;
      height: 56px;
      background: rgba(37, 99, 235, 0.1);
      border-color: rgba(14, 165, 233, 0.75);
    }

    .c-ring.clicking {
      width: 20px;
      height: 20px;
      background: rgba(37, 99, 235, 0.3);
    }

    .c-ring.hidden {
      opacity: 0;
    }
  `;

  constructor() {
    super();
    this._target = { x: -300, y: -300 };
    this._dot = { x: -300, y: -300 };
    this._ring = { x: -300, y: -300 };
    this._hovered = false;
    this._tickerCb = null;
  }

  connectedCallback() {
    super.connectedCallback();

    // 터치 디바이스에서는 비활성화
    if (window.matchMedia('(hover: none)').matches) return;

    // 전역 cursor: none 주입
    this._styleEl = document.createElement('style');
    this._styleEl.textContent = 'html, html * { cursor: none !important; }';
    document.head.appendChild(this._styleEl);

    this._mouseCb = (e) => {
      this._target.x = e.clientX;
      this._target.y = e.clientY;
    };
    this._overCb = (e) => {
      if (e.target.closest('a, button, [role="button"], [data-cursor]')) {
        this._hovered = true;
      }
    };
    this._outCb = (e) => {
      if (e.target.closest('a, button, [role="button"], [data-cursor]')) {
        this._hovered = false;
      }
    };
    this._downCb = () => {
      const ring = this.renderRoot.querySelector('#c-ring');
      if (ring) ring.classList.add('clicking');
    };
    this._upCb = () => {
      const ring = this.renderRoot.querySelector('#c-ring');
      if (ring) ring.classList.remove('clicking');
    };
    // 화면 밖으로 나가면 숨김
    this._leaveCb = () => {
      const ring = this.renderRoot.querySelector('#c-ring');
      if (ring) ring.classList.add('hidden');
    };
    this._enterCb = () => {
      const ring = this.renderRoot.querySelector('#c-ring');
      if (ring) ring.classList.remove('hidden');
    };

    window.addEventListener('mousemove', this._mouseCb, { passive: true });
    document.addEventListener('mouseover', this._overCb);
    document.addEventListener('mouseout', this._outCb);
    window.addEventListener('mousedown', this._downCb);
    window.addEventListener('mouseup', this._upCb);
    document.documentElement.addEventListener('mouseleave', this._leaveCb);
    document.documentElement.addEventListener('mouseenter', this._enterCb);

    this.updateComplete.then(() => {
      const dot = this.renderRoot.querySelector('#c-dot');
      const ring = this.renderRoot.querySelector('#c-ring');

      this._tickerCb = () => {
        this._dot.x += (this._target.x - this._dot.x) * 0.88;
        this._dot.y += (this._target.y - this._dot.y) * 0.88;
        this._ring.x += (this._target.x - this._ring.x) * 0.11;
        this._ring.y += (this._target.y - this._ring.y) * 0.11;

        dot.style.left = this._dot.x + 'px';
        dot.style.top = this._dot.y + 'px';
        ring.style.left = this._ring.x + 'px';
        ring.style.top = this._ring.y + 'px';

        if (this._hovered) ring.classList.add('hovered');
        else ring.classList.remove('hovered');
      };

      gsap.ticker.add(this._tickerCb);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._styleEl) this._styleEl.remove();
    window.removeEventListener('mousemove', this._mouseCb);
    document.removeEventListener('mouseover', this._overCb);
    document.removeEventListener('mouseout', this._outCb);
    window.removeEventListener('mousedown', this._downCb);
    window.removeEventListener('mouseup', this._upCb);
    document.documentElement.removeEventListener('mouseleave', this._leaveCb);
    document.documentElement.removeEventListener('mouseenter', this._enterCb);
    if (this._tickerCb) gsap.ticker.remove(this._tickerCb);
  }

  render() {
    return html`
      <div class="c-dot" id="c-dot"></div>
      <div class="c-ring" id="c-ring"></div>
    `;
  }
}

customElements.define('app-cursor', AppCursor);
