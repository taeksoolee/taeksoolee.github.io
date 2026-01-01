import { LitElement, html, css } from 'lib/lit/index.mjs';

class ProjectCard extends LitElement {
  createRenderRoot() {
    return this;
  }

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

  render() {
    return html`
      <div class="reveal-item group flex flex-col space-y-6">
        <div class="aspect-video bg-slate-200 rounded-[3rem] overflow-hidden relative border border-slate-100">
          <div class="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-all duration-500 z-10"></div>
          
          <img src="${this.image}" 
               alt="${this.title}" 
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          
          <a href="${this.link}" 
             target="_blank" 
             class="absolute right-8 bottom-8 w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 z-20">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

        <div>
          <div class="flex flex-wrap gap-2 mb-2">
            ${this.techStackArray.map(tag => html`
              <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">${tag}</span>
            `)}
          </div>

          <div class="flex flex-wrap gap-2">
            ${this.infraArray.map(item => html`
              <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">${item}</span>
            `)}
          </div>
        </div>

        <div class="px-4 space-y-3">
          <div class="flex items-center gap-4">
            <span class="text-blue-600 font-bold font-sora tracking-tighter text-xl italic">${this.index}</span>
            <h3 class="text-3xl font-extrabold text-slate-900 tracking-tight">${this.title}</h3>
            <span class="badge badge-outline border-slate-200 font-bold text-[10px] opacity-50">${this.category}</span>
          </div>
          <p class="text-slate-500 font-medium leading-relaxed max-w-lg">
            ${this.description}
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('project-card', ProjectCard);