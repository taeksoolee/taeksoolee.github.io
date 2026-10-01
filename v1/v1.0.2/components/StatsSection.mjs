import { LitElement, html } from 'lib/lit/index.mjs';

export class StatsSection extends LitElement {
  createRenderRoot() { return this; }

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
                style="font-size: clamp(52px, 8vw, 88px); line-height: 1; letter-spacing: -0.04em;">
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
