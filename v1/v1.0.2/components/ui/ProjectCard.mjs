import { LitElement, html } from 'lib/lit/index.mjs';

class ProjectCard extends LitElement {
  createRenderRoot() { return this; }

  constructor() {
    super();
    this.index = '';
    this.title = '';
    this.category = '';
    this.description = '';
    this.image = '';
    this.link = '';
    this.techstack = '';
    this.infra = '';
  }

  static properties = {
    index: { type: String },
    title: { type: String },
    category: { type: String },
    description: { type: String },
    image: { type: String },
    link: { type: String },
    techstack: { type: String },
    infra: { type: String },
  };

  get techStackArray() {
    return this.techstack ? this.techstack.split(',') : [];
  }

  get infraArray() {
    return this.infra ? this.infra.split(',') : [];
  }

  firstUpdated() {
    const card = this.querySelector('.card-tilt');
    if (!card) return;

    // 스크롤 reveal
    gsap.from(this, {
      opacity: 0,
      y: 80,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this,
        start: 'top 88%',
      },
    });

    // 3D tilt on hover
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = -((e.clientY - rect.top) / rect.height - 0.5) * 9;
      gsap.to(card, {
        rotateY: x,
        rotateX: y,
        transformPerspective: 900,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });
  }

  render() {
    return html`
      <div class="card-tilt group flex flex-col space-y-6" style="transform-style: preserve-3d; will-change: transform;">

        <!-- 이미지 영역 -->
        <div class="aspect-video rounded-[2.5rem] overflow-hidden relative"
          style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);">

          <!-- 호버 오버레이 -->
          <div class="absolute inset-0 transition-all duration-500 z-10"
            style="background: rgba(37,99,235,0); transition: background 0.5s ease;"
            onmouseenter="this.style.background='rgba(37,99,235,0.18)'"
            onmouseleave="this.style.background='rgba(37,99,235,0)'">
          </div>

          <img src="${this.image}"
               alt="${this.title}"
               class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

          <!-- 링크 버튼 -->
          <a href="${this.link}"
             target="_blank"
             class="absolute right-6 bottom-6 w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-2xl z-20 transition-all duration-400 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
             style="background: #fff; color: #0f172a; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

        <!-- 태그 영역 -->
        <div class="space-y-2 px-1">
          <div class="flex flex-wrap gap-2">
            ${this.techStackArray.map(tag => html`
              <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style="background: rgba(37,99,235,0.18); color: #93c5fd;">${tag}</span>
            `)}
          </div>
          <div class="flex flex-wrap gap-2">
            ${this.infraArray.map(item => html`
              <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style="background: rgba(255,255,255,0.07); color: #94a3b8;">${item}</span>
            `)}
          </div>
        </div>

        <!-- 텍스트 영역 -->
        <div class="px-2 space-y-3">
          <div class="flex items-center gap-4">
            <span class="font-bold font-sora tracking-tighter text-xl italic gradient-text">${this.index}</span>
            <h3 class="text-3xl font-extrabold tracking-tight text-white">${this.title}</h3>
            <span class="text-[10px] font-bold uppercase px-2 py-1 rounded"
              style="border: 1px solid rgba(255,255,255,0.12); color: #64748b;">${this.category}</span>
          </div>
          <p class="font-medium leading-relaxed max-w-lg" style="color: var(--color-muted);">
            ${this.description}
          </p>
        </div>

      </div>
    `;
  }
}

customElements.define('project-card', ProjectCard);
