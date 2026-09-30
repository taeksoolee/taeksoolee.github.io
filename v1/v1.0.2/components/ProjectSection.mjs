import { LitElement, html } from 'lib/lit/index.mjs';

export class ProjectSection extends LitElement {
  createRenderRoot() { return this; }

  constructor() {
    super();
    this.projects = [
      {
        title: 'AI Workflow',
        description: 'AI 에이전트 도구 10종(Claude Code, Cursor, Copilot, Codex 등)의 규칙·스킬·MCP 설정을 .ai-workflow/ 한 곳에서 관리하는 CLI. SSoT를 두고 도구별 설정 파일을 전부 자동 생성합니다.',
        image: '/images/projects/docs-common-thumb.jpg',
        link: '/ai-workflow/',
        type: 'CLI',
        category: 'CLI Tool',
        techstack: ['node.js', 'esm', 'npm package', 'mcp'],
        infra: ['npm registry', 'GitHub Pages'],
      },
      {
        title: 'sync-tmp',
        description: 'AI와 작업하며 tmp/ 에 쌓인 맥락(조사 노트·계획·중간 산출물)을 PC 간에 옮기는 MCP 서버. 모든 push가 출발 버전을 함께 보내 오래된 PC의 덮어쓰기를 막고, 기존 tmp/ 는 보존합니다.',
        image: '/images/projects/sync-tmp-thumb.jpg',
        link: 'https://sync-tmp.taeksoolee.com',
        type: 'MCP Server',
        category: 'MCP Server',
        techstack: ['mcp', 'node.js', 'zod', 'npm package'],
        infra: ['cloudflare workers'],
      },
      {
        title: '3D Portfolio',
        description: 'Three.js와 GSAP ScrollTrigger를 활용한 3D 스크롤 포트폴리오 페이지. 고정 캔버스 3D 배경, 글래스모피즘 카드, 네온 사이언 글로우 효과.',
        image: '/images/projects/3d-portfolio-thumb.jpg',
        link: '/projects/3d-page/portfoilo/',
        type: 'Demo',
        category: 'Demo',
        techstack: ['Three.js', 'GSAP', 'ScrollTrigger', 'WebGL'],
        infra: ['GitHub Pages'],
      },
      {
        title: 'My Blog',
        description: '개인 기술 블로그. 최신 웹 개발 트렌드와 프로젝트 경험을 공유하는 공간입니다. ai를 이용해 글을 작성합니다.',
        image: '/images/projects/blog-thumb-2.jpg',
        link: 'https://blog.taeksoolee.com',
        type: 'Blog',
        category: 'Blog',
        techstack: ['astro', 'tailwindcss', 'htmx', 'cloudflare pages', 'cloudflare d1'],
        infra: ['cloudflare'],
      },
      {
        title: 'Evcaro',
        description: '전기차 보조금 조회 PWA. 산재된 공공 데이터를 통합해 지역별 보조금·잔여대수·예상 차 가격을 제공합니다. 전체 리뉴얼을 거쳐 Next.js + PocketBase 구성으로 재구축했습니다.',
        image: '/images/projects/evcaro-thumb-2.jpg',
        link: 'https://evcaro.taeksoolee.com',
        type: 'PWA',
        category: 'PWA',
        techstack: ['next.js', 'react', 'tailwindcss', 'pocketbase'],
        infra: ['vercel', 'github actions'],
      },
      {
        title: 'JumpFit',
        description: '피트니스 센터 통합 예약관리 솔루션. 복잡한 일정 관리 시스템을 직관적인 UI로 해결한 B2B 프로젝트입니다.',
        image: '/images/projects/jumpfit-thumb-3.jpg',
        link: 'https://jumpfit.taeksoolee.com',
        type: 'SaaS',
        category: 'SaaS',
        techstack: ['react', 'tailwindcss', 'nextjs', 'django', 'drf', 'docker', 'postgres'],
        infra: ['vercel', 'render.io', 'neon'],
      },
    ];
  }

  firstUpdated() {
    // 섹션 제목 reveal
    const title = this.querySelector('.section-heading');
    const sub = this.querySelector('.section-sub');

    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this,
        start: 'top 85%',
      },
    });

    if (sub) {
      gsap.from(sub, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: this,
          start: 'top 85%',
        },
      });
    }
  }

  render() {
    return html`
      <section id="projects" class="scroll-mt-28">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 class="section-heading text-5xl md:text-7xl font-sora font-extrabold tracking-tighter" style="color: var(--color-text);">
            Works Library<span class="gradient-text">.</span>
          </h2>
          <p class="section-sub font-bold uppercase tracking-[0.3em] text-[10px] pb-2" style="color: var(--color-muted);">
            Crafting solutions since 2022
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          ${this.projects.map((project, index) => html`
            <project-card
              title="${project.title}"
              description="${project.description}"
              image="${project.image}"
              link="${project.link}"
              type="${project.type}"
              index="${`${index + 1}`.padStart(2, '0') + '.'}"
              category="${project.category}"
              techstack="${project.techstack.join(',')}"
              infra="${project.infra.join(',')}"
            ></project-card>
          `)}
        </div>
      </section>
    `;
  }
}

customElements.define('project-section', ProjectSection);
