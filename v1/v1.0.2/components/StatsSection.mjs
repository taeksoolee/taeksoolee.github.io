import { LitElement, html } from 'lib/lit/index.mjs';

export class StatsSection extends LitElement {
  createRenderRoot() { return this; }

  firstUpdated() {
    // 전체 섹션 reveal
    gsap.from(this.querySelector('.stats-grid'), {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: this,
        start: 'top 82%',
      },
    });

    // 숫자 카운트업 - 뷰포트 진입 시
    ScrollTrigger.create({
      trigger: this,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        this.querySelectorAll('[data-count]').forEach((el) => {
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const isFloat = el.dataset.float === 'true';
          const obj = { val: 0 };

          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate() {
              const v = isFloat ? obj.val.toFixed(1) : Math.round(obj.val);
              el.textContent = prefix + v + suffix;
            },
          });
        });

        // 구분선 grow 애니메이션
        gsap.from(this.querySelectorAll('.stat-divider'), {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
        });
      },
    });
  }

  render() {
    const stats = [
      { count: 3, suffix: '+', label: 'Years\nExperience', desc: '2022년부터 프론트엔드 개발' },
      { count: 20, suffix: '+', label: 'Projects\nShipped', desc: '기획부터 배포까지' },
      { count: 10, suffix: '+', label: 'Tech\nStack', desc: '프레임워크 및 도구' },
      { count: 99, suffix: '%', label: 'Passion\nLevel', desc: '항상 새로운 것을 배우는 중' },
    ];

    return html`
      <section class="relative overflow-hidden py-24" style="border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">

        <!-- 배경 데코 텍스트 -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span class="font-sora font-extrabold whitespace-nowrap"
            style="font-size: clamp(80px, 18vw, 180px); color: rgba(255,255,255,0.018); letter-spacing: -0.04em;">
            FRONTEND DEV
          </span>
        </div>

        <div class="stats-grid relative grid grid-cols-2 md:grid-cols-4">
          ${stats.map((s, i) => html`
            <div class="stat-item flex flex-col items-center justify-center px-6 py-12 text-center relative"
              style="${i < stats.length - 1 ? 'border-right: 1px solid var(--color-border);' : ''}">

              <!-- 숫자 -->
              <div class="font-sora font-extrabold gradient-text"
                style="font-size: clamp(52px, 8vw, 88px); line-height: 1; letter-spacing: -0.04em;"
                data-count="${s.count}"
                data-suffix="${s.suffix}">
                0${s.suffix}
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
