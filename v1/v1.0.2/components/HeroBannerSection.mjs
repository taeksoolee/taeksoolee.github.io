import { LitElement, html, css } from 'lib/lit/index.mjs';

export class HeroBannerSection extends LitElement {
  createRenderRoot() {
    return this;
  }

  static properties = {
    isBound: { type: Boolean }
  };

  constructor() {
    super();
    this.isBound = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.startAnimation();
  }

  startAnimation() {
    setInterval(() => {
      this.isBound = true;
      setTimeout(() => { this.isBound = false; }, 1000);
    }, 5000);
  }

  render() {
    const text = "Frontend Developer";
    return html`
      <section class="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-10 pt-20">
      <div class="reveal-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs tracking-widest uppercase">
        <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
        Currently Open to Offers
      </div>

      <h1 class="reveal-item text-6xl md:text-9xl font-sora font-extrabold tracking-tighter leading-none text-slate-900">
        Crafting <br> <span class="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-fill-transparent italic">Digital Depth.</span>
      </h1>

      <p class="reveal-item max-w-2xl text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
        안녕하세요, 프론트엔드 개발자 이택수입니다. <br>
        기술적 한계를 넘어 사용자에게 닿는 **완결성 있는 경험**을 추구합니다.
      </p>

      <div class="reveal-item flex gap-4 pt-4">
        <a href="#projects" class="btn btn-primary bg-blue-600 border-none btn-lg rounded-2xl px-12 text-white shadow-xl shadow-blue-200 hover:scale-105 transition-transform">View Works</a>
        <button onclick="window.scrollTo(0, 1000)" class="btn btn-ghost btn-lg text-slate-400 font-bold">Learn More</button>
      </div>
    </section>
    `;
  }
}
customElements.define('hero-banner-section', HeroBannerSection);