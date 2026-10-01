import { LitElement, html } from 'lib/lit/index.mjs';

export class AppFooter extends LitElement {
  createRenderRoot() { return this; }

  constructor() {
    super();
    this.currentYear = new Date().getFullYear();
  }

  firstUpdated() {
    // CTA 텍스트 reveal
    gsap.from(this.querySelector('.footer-cta'), {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this,
        start: 'top 90%',
      },
    });

    // 소셜 링크 reveal
    gsap.from(this.querySelector('.footer-social'), {
      opacity: 0,
      x: 40,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: this,
        start: 'top 90%',
      },
    });
  }

  render() {
    return html`
      <footer style="background: #03030d; border-top: 1px solid var(--color-border);">

        <!-- 본문 -->
        <div class="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row justify-between items-center gap-12">

          <div class="footer-cta space-y-4 text-center md:text-left">
            <h2 class="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter leading-none text-white">
              Contact
            </h2>
            <a href="mailto:leets1490@gmail.com"
              class="inline-block text-lg md:text-xl font-bold tracking-tight transition-colors"
              style="color: #94a3b8;"
              onmouseenter="this.style.color='#fff';"
              onmouseleave="this.style.color='#94a3b8';">leets1490@gmail.com</a>
            <p class="font-medium pt-4" style="color: #475569;">
              © ${this.currentYear} Taeksoo Lee
            </p>
          </div>

          <div class="footer-social flex gap-6">
            <a href="https://github.com/taeksoolee" target="_blank"
              class="w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300"
              style="border: 1px solid rgba(255,255,255,0.12); color: #94a3b8;"
              onmouseenter="this.style.background='#fff'; this.style.color='#07071a'; this.style.borderColor='#fff';"
              onmouseleave="this.style.background='transparent'; this.style.color='#94a3b8'; this.style.borderColor='rgba(255,255,255,0.12)';">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>

        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
