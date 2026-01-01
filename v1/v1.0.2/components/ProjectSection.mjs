import { LitElement, html, css } from 'lib/lit/index.mjs';

export class ProjectSection extends LitElement {
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.projects = [
      {
        title: 'My Blog',
        description: '개인 기술 블로그. 최신 웹 개발 트렌드와 프로젝트 경험을 공유하는 공간입니다. ai를 이용해 글을 작성합니다.',
        image: '/images/projects/blog-thumb-1.png',
        link: 'https://blog.taeksoolee.com',
        type: 'Blog',
        category: 'Blog',
        techstack: ['astro', 'tailwindcss', 'htmx', 'cloudflare pages', 'cloudflare d1' ],
        infra: [ 'cloudflare' ],
      },
      {
        title: 'Evcaro',
        description: '전기차 지원금 조회 앱. 산재된 공공 데이터를 통합하여 사용자 맞춤형 보조금 정보를 실시간으로 제공합니다.',
        image: '/images/projects/evcaro-thumb-1.png',
        link: 'https://evcaro.taeksoolee.com',
        type: 'Web App',
        category: 'Web App',
        techstack: ['react', 'styled-compoentnts', 'firebase', 'google spreadsheet' ],
        infra: ['firebase hosting', 'firebase realtimedb' ],
      }, {
        title: 'JumpFit',
        description: '피트니스 센터 통합 예약관리 솔루션. 복잡한 일정 관리 시스템을 직관적인 UI로 해결한 B2B 프로젝트입니다.',
        image: '/images/projects/jumpfit-thumb-2.png',
        link: 'https://jumpfit.taeksoolee.com',
        type: 'SaaS',
        category: 'SaaS',
        techstack: ['react', 'tailwindcss', 'nextjs', 'django', 'docker' ],
        infra: ['vercel', 'render.io' ],
      }
    ]
  }

  render() {
    return html`
      <section id="projects" class="scroll-mt-28">
        <div class="reveal-item flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 class="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter text-slate-900">Works Library<span class="text-blue-600">.</span></h2>
          <p class="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] pb-2">Crafting solutions since 2022</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          ${this.projects.map(project => html`
            <project-card
              title="${project.title}"
              description="${project.description}"
              image="${project.image}"
              link="${project.link}"
              type="${project.type}"
              index="${`${project.index}`.padStart(2, '0') + '.'}"
              category="${project.category}"
              techstack='${project.techstack.join(",")}'
              infra='${project.infra.join(",")}'
            ></project-card>
          `)}
        </div>
      </section>
    `
  }
}

customElements.define('project-section', ProjectSection);
