import { LitElement, html } from 'lib/lit/index.mjs';

// 카테고리별 식별 색 — GitHub 의 언어 점과 같은 역할
const ACCENT = {
  'CLI Tool':   '#60a5fa',
  'MCP Server': '#818cf8',
  'Game':       '#c084fc',
  'Mobile App': '#34d399',
  'PWA':        '#2dd4bf',
  'Demo':       '#38bdf8',
  'Blog':       '#fbbf24',
  'SaaS':       '#fb7185',
};

const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";

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

  get accent() {
    return ACCENT[this.category] || '#60a5fa';
  }

  get host() {
    try {
      return this.link.startsWith('http') ? new URL(this.link).host : `taeksoolee.com${this.link}`;
    } catch (e) {
      return this.link;
    }
  }

  render() {
    const accent = this.accent;

    return html`
      <a href="${this.link}" target="_blank" rel="noopener"
        class="project-card group flex flex-col h-full rounded-xl overflow-hidden no-underline"
        style="background: rgba(255,255,255,0.025); border: 1px solid var(--color-border);
               transition: border-color 0.18s ease, background 0.18s ease;"
        onmouseenter="this.style.borderColor='${accent}66'; this.style.background='rgba(255,255,255,0.05)';"
        onmouseleave="this.style.borderColor='var(--color-border)'; this.style.background='rgba(255,255,255,0.025)';">

        <!-- 썸네일 -->
        <!-- 프레임 2:1, 이미지 16:9 → 세로로만 여유가 생겨 좌우는 잘리지 않는다 -->
        <div class="aspect-[2/1] w-full overflow-hidden relative"
          style="border-bottom: 1px solid var(--color-border); background: rgba(255,255,255,0.02);">
          ${this.image
            ? html`<img src="${this.image}" alt="${this.title}" loading="lazy"
                     class="absolute left-0 w-full"
                     style="top: -6.25%; height: auto; will-change: transform;" />`
            : html`<div class="w-full h-full"
                     style="background: linear-gradient(135deg, ${accent}22 0%, transparent 70%);"></div>`}
        </div>

        <!-- 본문 -->
        <div class="flex flex-col flex-1 gap-3 p-5">

          <div class="flex items-center gap-2.5">
            <span style="font-family: ${MONO}; font-size: 11px; color: var(--color-muted);">${this.index}</span>
            <h3 class="text-[17px] font-bold tracking-tight text-white leading-none">${this.title}</h3>
            <span class="ml-auto px-2 py-[3px] rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0"
              style="font-family: ${MONO}; color: ${accent}; background: ${accent}1a; border: 1px solid ${accent}33;">
              ${this.category}
            </span>
          </div>

          <p class="text-[13.5px] leading-relaxed m-0" style="color: var(--color-muted);
             display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
            ${this.description}
          </p>

          <div class="flex flex-wrap gap-1.5 mt-auto pt-1">
            ${this.techStackArray.map(tag => html`
              <span class="px-2 py-[3px] rounded text-[10.5px]"
                style="font-family: ${MONO}; background: rgba(255,255,255,0.055);
                       color: #cbd5e1; border: 1px solid rgba(255,255,255,0.06);">${tag}</span>
            `)}
          </div>

          <!-- 메타 행 -->
          <div class="flex items-center gap-2 pt-3 text-[11px]"
            style="font-family: ${MONO}; color: var(--color-muted); border-top: 1px solid var(--color-border);">
            <span class="w-2 h-2 rounded-full shrink-0" style="background: ${accent};"></span>
            <span class="truncate">${this.infraArray.join(' · ')}</span>
            <span class="ml-auto flex items-center gap-1 shrink-0" style="color: var(--color-muted);">
              <span class="hidden sm:inline">${this.host}</span>
              <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 9px;"></i>
            </span>
          </div>

        </div>
      </a>
    `;
  }
}

customElements.define('project-card', ProjectCard);
