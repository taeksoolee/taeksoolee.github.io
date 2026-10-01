import { LitElement, html } from 'lib/lit/index.mjs';
import { observeReveal, countUp } from './scroll-fx.mjs';

export class StatsSection extends LitElement {
  createRenderRoot() { return this; }

  firstUpdated() {
    const items = this.querySelectorAll('.stat-item');
    items.forEach(i => i.classList.add('reveal'));
    observeReveal(items, { stagger: 90 });

    // 숫자는 처음 보일 때 한 번만 올라간다
    const nums = this.querySelectorAll('[data-count]');
    if (!nums.length || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver((entries, obs) => {
      if (!entries.some(e => e.isIntersecting)) return;
      obs.disconnect();
      nums.forEach(el => countUp(el, Number(el.dataset.count), el.dataset.suffix || ''));
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
    io.observe(this);
    this._io = io;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._io) this._io.disconnect();
  }

  render() {
    const stats = [
      { count: 3, suffix: '+', label: 'Years\nExperience', desc: '2022년부터 프론트엔드 개발' },
      { count: 8, suffix: '', label: 'Projects\nShipped', desc: '아래 Works Library에 전부' },
      { count: 2, suffix: '', label: 'npm\nPackages', desc: 'aiw · sync-tmp-mcp' },
      { count: 3, suffix: '', label: 'Servers\nOperated', desc: 'API · 시그널링 · 동기화' },
    ];

    return html`
      <section class="relative overflow-hidden py-24" style="border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">

        <div class="stats-grid relative grid grid-cols-2 md:grid-cols-4">
          ${stats.map((s, i) => html`
            <div class="stat-item flex flex-col items-center justify-center px-6 py-12 text-center relative"
              style="${i < stats.length - 1 ? 'border-right: 1px solid var(--color-border);' : ''}">

              <!-- 숫자 -->
              <div class="font-sora font-extrabold gradient-text"
                style="font-size: clamp(52px, 8vw, 88px); line-height: 1; letter-spacing: -0.04em;"
                data-count="${s.count}" data-suffix="${s.suffix}">
                ${s.count}${s.suffix}
              </div>

              <!-- 구분선 -->
              <div class="stat-divider mt-5 mb-4 w-8" style="height: 1px; background: var(--color-border);"></div>

              <!-- 라벨 -->
              <div class="font-bold uppercase tracking-[0.2em] text-[11px] leading-relaxed whitespace-pre-line"
                style="color: var(--color-muted);">${s.label}</div>

              <!-- 설명 -->
              <div class="mt-2 text-[11px] font-medium" style="color: rgba(148,163,184,0.45);">${s.desc}</div>
            </div>
          `)}
        </div>

      </section>
    `;
  }
}

customElements.define('stats-section', StatsSection);
