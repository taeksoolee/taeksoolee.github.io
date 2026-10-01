import { LitElement, html } from 'lib/lit/index.mjs';

export class AppHeader extends LitElement {
  createRenderRoot() { return this; }

  firstUpdated() {
    const header = this.querySelector('header');
    const bar = this.querySelector('.scroll-bar');
    let lastY = 0;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 100 && y > lastY) {
        gsap.to(header, { yPercent: -100, duration: 0.28, ease: 'power2.in', overwrite: 'auto' });
      } else {
        gsap.to(header, { yPercent: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      }
      lastY = y;
    }, { passive: true });

    if (bar) {
      gsap.set(bar, { scaleX: 0, transformOrigin: 'left' });
      ScrollTrigger.create({
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      });
    }

  }

  _openProjects() {
    window.dispatchEvent(new CustomEvent('toggle-projects'));
  }

  render() {
    return html`
      <header class="navbar sticky top-0 z-[100] px-6 lg:px-20 h-16 relative"
        style="backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
               background: rgba(7,7,26,0.86); border-bottom: 1px solid var(--color-border);">

        <div class="flex-1">
          <a href="#" class="font-sora font-extrabold text-xl tracking-tighter neon-text" style="color: #7dd3fc;">
            Taeksoo<span class="mono font-normal" style="color: #475569;">.dev</span>
          </a>
        </div>

        <div class="flex-none flex items-center gap-5">

          <!-- Projects 트리거 -->
          <button
            @click=${this._openProjects}
            class="neon-ring mono hidden md:flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] tracking-wider"
            style="color: #94a3b8; background: rgba(56,189,248,0.04);"
            onmouseenter="this.style.color='#e2e8f0';"
            onmouseleave="this.style.color='#94a3b8';"
            title="모든 프로젝트 보기 (⌘K)"
          >
            <i class="fa-solid fa-table-cells" style="font-size: 10px;"></i>
            <span>projects</span>
            <span class="hidden lg:inline-flex items-center gap-1 ml-1">
              <kbd style="padding: 1px 5px; border: 1px solid rgba(255,255,255,0.14); border-radius: 4px; color: #64748b;">⌘</kbd>
              <kbd style="padding: 1px 5px; border: 1px solid rgba(255,255,255,0.14); border-radius: 4px; color: #64748b;">K</kbd>
            </span>
          </button>

          <nav class="hidden md:flex items-center gap-6 mono text-[11px] uppercase tracking-[0.18em]">
            <a href="#about"    class="nav-link" style="color: #94a3b8;">about</a>
            <a href="#projects" class="nav-link" style="color: #94a3b8;">works</a>
            <a href="https://github.com/taeksoolee" target="_blank" rel="noopener"
              class="nav-link flex items-center" style="color: #94a3b8;" title="GitHub">
              <i class="fa-brands fa-github" style="font-size: 16px;"></i>
            </a>
          </nav>

          <!-- 모바일 -->
          <button
            @click=${this._openProjects}
            class="md:hidden neon-ring rounded-lg w-9 h-9 flex items-center justify-center"
            style="color: #94a3b8; background: rgba(56,189,248,0.04);"
            title="모든 프로젝트 보기">
            <i class="fa-solid fa-table-cells text-sm"></i>
          </button>

        </div>

        <!-- 스크롤 진행도 -->
        <div class="scroll-bar absolute bottom-0 left-0 w-full"
          style="height: 2px; transform-origin: left;
                 background: linear-gradient(90deg, #2563eb, var(--neon));
                 box-shadow: 0 0 10px rgba(56,189,248,0.8);"></div>

      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
