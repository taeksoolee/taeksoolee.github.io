import { LitElement, html } from 'lib/lit/index.mjs';
import { registerScrollFx, centerProgress, isNear, observeReveal } from './scroll-fx.mjs';

export class ProfileSection extends LitElement {
  createRenderRoot() { return this; }

  firstUpdated() {
    const cards = this.querySelectorAll('.bento-card');
    cards.forEach(c => c.classList.add('reveal', 'neon-ignite'));
    observeReveal(cards, { stagger: 90 });

    const title = this.querySelector('.section-title');
    if (!title) return;
    this._offFx = registerScrollFx((y, vh) => {
      if (!isNear(title, vh)) return;
      title.style.transform = `translate3d(0, ${(centerProgress(title, vh) * -18).toFixed(1)}px, 0)`;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._offFx) this._offFx();
  }

  render() {
    return html`
      <section id="about" class="scroll-mt-28">

        <h2 class="section-title text-5xl md:text-7xl font-sora font-extrabold tracking-tighter mb-12" style="color: var(--color-text);">
          About
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_auto] gap-4">

          <!-- 메인 프로필 카드 -->
          <div class="bento-card md:col-span-8 md:row-span-2 rounded-xl p-10 flex flex-col justify-between overflow-hidden relative group">
            <div class="flex flex-col md:flex-row gap-10 items-start md:items-center">
              <div class="avatar flex-shrink-0">
                <div class="w-36 h-36 rounded-2xl shadow-2xl overflow-hidden group-hover:rotate-2 transition-transform duration-500"
                  style="ring: 2px solid rgba(37,99,235,0.3); box-shadow: 0 0 0 4px rgba(37,99,235,0.15);">
                  <img src="/images/my-profile-img.png" alt="이택수" class="w-full h-full object-cover" />
                </div>
              </div>
              <div class="space-y-4">
                <h2 class="text-5xl font-extrabold tracking-tight text-white">이택수</h2>
                <div id="animationText" class="font-sora font-bold text-blue-400 text-xl tracking-widest uppercase">
                  <span>F</span><span>r</span><span>o</span><span>n</span><span>t</span><span>e</span><span>n</span><span>d</span>
                  <span>&nbsp;</span>
                  <span>D</span><span>e</span><span>v</span><span>e</span><span>l</span><span>o</span><span>p</span><span>e</span><span>r</span>
                </div>
                <p class="font-medium max-w-md leading-relaxed" style="color: var(--color-muted);">
                  AI 에이전트로 일하다 불편한 게 보이면 도구로 만들어 씁니다.<br>
                  aiw와 sync-tmp 둘 다 그렇게 나왔습니다.<br>
                  프론트엔드가 주력이지만 서버와 배포까지 직접 굴립니다.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6" style="border-top: 1px solid var(--color-border);">
              <div class="flex flex-col">
                <span class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-muted);">Location</span>
                <span class="font-bold" style="color: #e2e8f0;">Seoul, Korea</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-muted);">Email</span>
                <span class="font-bold" style="color: #e2e8f0;">leets1490@gmail.com</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-muted);">Focus</span>
                <span class="font-bold" style="color: #e2e8f0;">웹 · 앱 · 개발 도구</span>
              </div>
            </div>
          </div>

          <!-- 스킬 카드 -->
          <div class="bento-card neon-ring md:col-span-4 rounded-xl p-6 flex flex-col gap-5 relative overflow-hidden"
            style="background: rgba(56,189,248,0.05);">
            <h3 class="font-sora font-extrabold text-2xl tracking-tight leading-tight neon-text" style="color: #7dd3fc;">Stack</h3>
            <div class="flex flex-wrap gap-2">
              <span class="skill-tag mono px-2 py-[3px] rounded text-[10.5px]" style="background: rgba(255,255,255,0.055); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.08);">React</span>
              <span class="skill-tag mono px-2 py-[3px] rounded text-[10.5px]" style="background: rgba(255,255,255,0.055); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.08);">Next.js</span>
              <span class="skill-tag mono px-2 py-[3px] rounded text-[10.5px]" style="background: rgba(255,255,255,0.055); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.08);">TypeScript</span>
              <span class="skill-tag mono px-2 py-[3px] rounded text-[10.5px]" style="background: rgba(255,255,255,0.055); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.08);">Three.js</span>
              <span class="skill-tag mono px-2 py-[3px] rounded text-[10.5px]" style="background: rgba(255,255,255,0.055); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.08);">GSAP</span>
              <span class="skill-tag mono px-2 py-[3px] rounded text-[10.5px]" style="background: rgba(255,255,255,0.055); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.08);">Flutter</span>
            </div>
            <i class="fa-solid fa-layer-group absolute -bottom-6 -right-6 text-9xl" style="opacity: 0.07; color: var(--neon);"></i>
          </div>

          <!-- 링크 카드 -->
          <div class="bento-card md:col-span-4 rounded-xl p-6 flex flex-col gap-1">
            <h3 class="mono text-[11px] uppercase tracking-[0.18em] mb-2" style="color: var(--color-muted);">Links</h3>
            ${[
              { icon: 'fa-brands fa-github',  label: 'github.com/taeksoolee', url: 'https://github.com/taeksoolee' },
              { icon: 'fa-brands fa-npm',     label: 'npmjs.com/~taeksoolee', url: 'https://www.npmjs.com/~taeksoolee' },
              { icon: 'fa-solid fa-pen-nib',  label: 'blog.taeksoolee.com',   url: 'https://blog.taeksoolee.com' },
            ].map(l => html`
              <a href="${l.url}" target="_blank" rel="noopener"
                class="mono flex items-center gap-3 rounded-lg px-3 py-2.5 text-[12px] no-underline"
                style="color: #94a3b8; transition: background 0.16s ease, color 0.16s ease;"
                onmouseenter="this.style.background='rgba(56,189,248,0.08)'; this.style.color='#e2e8f0';"
                onmouseleave="this.style.background='transparent'; this.style.color='#94a3b8';">
                <i class="${l.icon} shrink-0" style="width: 14px; font-size: 13px;"></i>
                <span class="truncate">${l.label}</span>
                <i class="fa-solid fa-arrow-up-right-from-square ml-auto shrink-0" style="font-size: 9px; opacity: 0.6;"></i>
              </a>
            `)}
          </div>

        </div>
      </section>
    `;
  }
}

customElements.define('profile-section', ProfileSection);
