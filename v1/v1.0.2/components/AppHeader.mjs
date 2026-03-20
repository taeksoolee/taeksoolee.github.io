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

    gsap.from(header, { opacity: 0, y: -20, duration: 0.7, ease: 'power2.out', delay: 0.1 });
  }

  _openProjects() {
    window.dispatchEvent(new CustomEvent('toggle-projects'));
  }

  render() {
    return html`
      <header class="navbar sticky top-0 z-[100] px-6 lg:px-20 h-20 relative"
        style="backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
               background: rgba(7,7,26,0.82); border-bottom: 1px solid var(--color-border);">

        <div class="flex-1">
          <a href="#" class="font-sora font-extrabold text-2xl tracking-tighter" style="color: #60a5fa;">
            Taeksoo<span style="color: #475569;">.dev</span>
          </a>
        </div>

        <div class="flex-none flex items-center gap-2">

          <!-- Projects 트리거 버튼 -->
          <button
            @click=${this._openProjects}
            class="hidden md:flex items-center gap-2 font-bold text-sm transition-all duration-200 rounded-xl px-4 py-2"
            style="color: #64748b; border: 1px solid rgba(255,255,255,0.09); background: transparent;"
            onmouseenter="this.style.color='#93c5fd'; this.style.borderColor='rgba(37,99,235,0.45)'; this.style.background='rgba(37,99,235,0.1)';"
            onmouseleave="this.style.color='#64748b'; this.style.borderColor='rgba(255,255,255,0.09)'; this.style.background='transparent';"
            title="모든 프로젝트 보기 (⌘K)"
          >
            <i class="fa-solid fa-table-cells text-xs"></i>
            <span>Projects</span>
            <span class="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold tracking-widest"
              style="color: #1e293b;">
              <span style="padding: 1px 5px; border: 1px solid #1e293b; border-radius: 4px;">⌘</span>
              <span style="padding: 1px 5px; border: 1px solid #1e293b; border-radius: 4px;">K</span>
            </span>
          </button>

          <nav class="hidden md:block">
            <ul class="menu menu-horizontal font-bold gap-1 flex items-center">
              <li><a href="#about"    class="transition-colors hover:text-blue-400" style="color: #94a3b8;">About</a></li>
              <li><a href="#projects" class="transition-colors hover:text-blue-400" style="color: #94a3b8;">Works</a></li>
              <li>
                <a href="https://github.com/taeksoolee" target="_blank"
                  class="btn btn-ghost btn-circle transition-colors hover:text-white"
                  style="color: #94a3b8;">
                  <i class="fa-brands fa-github text-xl"></i>
                </a>
              </li>
            </ul>
          </nav>

          <!-- 모바일: 그리드 아이콘만 -->
          <button
            @click=${this._openProjects}
            class="md:hidden btn btn-ghost btn-circle"
            style="color: #64748b;"
            title="모든 프로젝트 보기">
            <i class="fa-solid fa-table-cells text-lg"></i>
          </button>

        </div>

        <!-- 스크롤 진행도 바 -->
        <div class="scroll-bar absolute bottom-0 left-0 w-full"
          style="height: 2px; background: linear-gradient(90deg, #2563eb, #0ea5e9); transform-origin: left;"></div>

      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
