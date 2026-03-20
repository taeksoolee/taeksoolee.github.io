import { LitElement, html } from 'lib/lit/index.mjs';

export class AppFooter extends LitElement {
  createRenderRoot() { return this; }

  constructor() {
    super();
    this.currentYear = new Date().getFullYear();
  }

  firstUpdated() {
    // 마퀴 무한 루프
    const marqueeInner = this.querySelector('.marquee-inner');
    if (marqueeInner) {
      gsap.to(marqueeInner, {
        xPercent: -50,
        duration: 18,
        ease: 'none',
        repeat: -1,
      });
    }

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
    const marqueeText = "Let's build something epic.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    return html`
      <footer style="background: #03030d; border-top: 1px solid var(--color-border);">

        <!-- 마퀴 -->
        <div class="overflow-hidden py-6" style="border-bottom: 1px solid var(--color-border);">
          <div class="marquee-inner flex whitespace-nowrap">
            ${Array(8).fill(null).map(() => html`
              <span class="text-4xl md:text-5xl font-sora font-extrabold tracking-tighter px-6"
                style="color: rgba(255,255,255,0.06);">
                Let's build something epic.
              </span>
            `)}
          </div>
        </div>

        <!-- 본문 -->
        <div class="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row justify-between items-center gap-12">

          <div class="footer-cta space-y-4 text-center md:text-left">
            <h2 class="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter leading-none text-white">
              Let's build<br>something
              <span class="gradient-text underline decoration-4 underline-offset-8">epic</span>.
            </h2>
            <p class="font-medium pt-4" style="color: #475569;">
              © ${this.currentYear} Taeksoo Lee. Powered by Persistence.
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
