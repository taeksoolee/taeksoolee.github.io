import { LitElement, html } from 'lib/lit/index.mjs';

export class AppHeader extends LitElement {
  createRenderRoot() { return this; }

  firstUpdated() {
    const header = this.querySelector('header');
    let lastY = 0;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 100 && y > lastY) {
        gsap.to(header, { yPercent: -100, duration: 0.3, ease: 'power2.in', overwrite: 'auto' });
      } else {
        gsap.to(header, { yPercent: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      }
      lastY = y;
    }, { passive: true });

    // 초기 fade-in
    gsap.from(header, { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out', delay: 0.1 });
  }

  render() {
    return html`
      <header class="navbar sticky top-0 z-[100] px-6 lg:px-20 h-20"
        style="backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
               background: rgba(7,7,26,0.8); border-bottom: 1px solid var(--color-border);">
        <div class="flex-1">
          <a href="#" class="font-sora font-extrabold text-2xl tracking-tighter" style="color: #60a5fa;">
            Taeksoo<span style="color: #475569;">.dev</span>
          </a>
        </div>
        <div class="flex-none hidden md:block">
          <nav>
            <ul class="menu menu-horizontal font-bold gap-4 flex items-center" style="color: #94a3b8;">
              <li><a href="#about" class="transition-colors hover:text-blue-400" style="color: inherit;">About</a></li>
              <li><a href="#projects" class="transition-colors hover:text-blue-400" style="color: inherit;">Works</a></li>
              <li>
                <a href="https://github.com/taeksoolee" target="_blank"
                  class="btn btn-ghost btn-circle transition-colors hover:text-white"
                  style="color: #94a3b8;">
                  <i class="fa-brands fa-github text-xl"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
