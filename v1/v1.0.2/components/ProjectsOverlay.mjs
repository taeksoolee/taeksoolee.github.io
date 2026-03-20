import { LitElement, html } from 'lib/lit/index.mjs';

const PROJECTS = [
  { title: 'Background Remover', url: '/projects/background-remover-app/', cat: 'app',  desc: 'AI 온디바이스 배경 제거', icon: '🖼️' },
  { title: '3D Tetris',          url: '/projects/3d-tetris/',               cat: 'game', desc: 'Three.js 3D 테트리스',    icon: '🎮' },
  { title: '3D Portfolio',       url: '/projects/3d-page/portfoilo/',        cat: 'demo', desc: '3D 스크롤 포트폴리오',   icon: '🌐' },
  { title: 'Mobile Template',    url: '/projects/mobile-app-template/home.html', cat: 'ui',   desc: '모바일 앱 UI 템플릿',   icon: '📱' },
  { title: 'Profile Card',       url: '/projects/profile-card/',             cat: 'ui',   desc: '인터랙티브 프로필 카드', icon: '👤' },
  { title: 'Resume',             url: '/projects/resume/',                   cat: 'ui',   desc: '이력서 페이지',          icon: '📋' },
  { title: 'PDF Converter',      url: '/projects/pdf-convert/',              cat: 'tool', desc: '이미지 → PDF 변환',      icon: '📄' },
  { title: 'Color Picker',       url: '/projects/tools/color-picker.html',   cat: 'tool', desc: 'RGB ↔ Hex 변환기',       icon: '🎨' },
  { title: 'Digital Clock',      url: '/projects/digital-clock/',            cat: 'tool', desc: '실시간 디지털 시계',     icon: '🕐' },
  { title: 'Image Services',     url: '/projects/image-services/imgbb.html', cat: 'tool', desc: 'ImgBB 이미지 업로드',    icon: '📤' },
  { title: 'Pokemon Explorer',   url: '/projects/pokemon/',                  cat: 'demo', desc: 'PokeAPI 포켓몬 탐색기',  icon: '🐾' },
  { title: 'With Speech',        url: '/projects/with-speech/',              cat: 'demo', desc: '음성 명령 텍스트 리더',  icon: '🎤' },
  { title: 'Scroll Snap',        url: '/projects/scroll-snap/',              cat: 'demo', desc: 'CSS 스크롤 스냅 데모',   icon: '📜' },
  { title: 'Music Synth',        url: '/projects/music/',                    cat: 'demo', desc: '웹 신시사이저',           icon: '🎵' },
  { title: 'Cursor Eyes',        url: '/projects/cursor-eyes/',              cat: 'demo', desc: '마우스 추적 눈 효과',    icon: '👁️' },
  { title: 'Vibe Coding',        url: '/projects/vibe-coding/firework.html', cat: 'fun',  desc: '파티클 폭죽 & 테트리스', icon: '🎇' },
  { title: 'White Day Candy',    url: '/projects/my-gifts/white-day-candy.html', cat: 'fun', desc: '화이트데이 캔디 페이지', icon: '🍬' },
  { title: 'Boo Snot',           url: '/projects/boo_snot/',                 cat: 'fun',  desc: '캐릭터 루프 애니메이션', icon: '👻' },
];

const CATS = [
  { key: 'all',  label: 'All'  },
  { key: 'app',  label: 'App'  },
  { key: 'game', label: 'Game' },
  { key: 'tool', label: 'Tool' },
  { key: 'ui',   label: 'UI'   },
  { key: 'demo', label: 'Demo' },
  { key: 'fun',  label: 'Fun'  },
];

export class ProjectsOverlay extends LitElement {
  // Light DOM — Shadow DOM 없음. CSS는 index.html 글로벌 스타일에 위치
  createRenderRoot() { return this; }

  static properties = {
    _query:  { type: String,  state: true },
    _cat:    { type: String,  state: true },
    _selIdx: { type: Number,  state: true },
  };

  constructor() {
    super();
    this._isOpen = false;
    this._query  = '';
    this._cat    = 'all';
    this._selIdx = -1;
  }

  connectedCallback() {
    super.connectedCallback();

    this._toggleCb = () => this._toggle();
    window.addEventListener('toggle-projects', this._toggleCb);

    this._keyCb = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this._toggle();
        return;
      }
      if (!this._isOpen) return;

      const items = this._filtered();
      if      (e.key === 'Escape')    { this._close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); this._selIdx = Math.min(this._selIdx + 1, items.length - 1); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); this._selIdx = Math.max(this._selIdx - 1, 0); }
      else if (e.key === 'Enter' && this._selIdx >= 0) {
        window.open(items[this._selIdx].url, '_blank');
        this._close();
      }
    };
    window.addEventListener('keydown', this._keyCb);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('toggle-projects', this._toggleCb);
    window.removeEventListener('keydown', this._keyCb);
  }

  _toggle() { this._isOpen ? this._close() : this._openOverlay(); }

  _openOverlay() {
    this._isOpen = true;
    this._query  = '';
    this._selIdx = -1;
    document.body.style.overflow = 'hidden';

    // updateComplete: Light DOM이지만 reactive 프로퍼티 변경이 없으므로
    // 이미 렌더된 DOM을 바로 사용
    const ov    = this.querySelector('.po-overlay');
    const panel = this.querySelector('.po-panel');

    if (!ov || !panel) {
      console.warn('[ProjectsOverlay] DOM not ready');
      return;
    }

    gsap.set(ov, { display: 'flex', opacity: 0 });
    gsap.to(ov, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(panel,
      { opacity: 0, y: -20, scale: 0.97 },
      { opacity: 1, y: 0,   scale: 1,    duration: 0.3, ease: 'power3.out' }
    );

    requestAnimationFrame(() => {
      const cards = this.querySelectorAll('.po-card');
      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', stagger: 0.018, delay: 0.07 }
        );
      }
      this.querySelector('.po-search')?.focus();
    });
  }

  _close() {
    this._isOpen = false;
    document.body.style.overflow = '';

    const ov = this.querySelector('.po-overlay');
    if (!ov) return;

    gsap.to(ov, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => { ov.style.display = 'none'; },
    });
  }

  _filtered() {
    const q = this._query.trim().toLowerCase();
    return PROJECTS.filter(p => {
      const matchCat = this._cat === 'all' || p.cat === this._cat;
      const matchQ   = !q || p.title.toLowerCase().includes(q) || p.desc.includes(q);
      return matchCat && matchQ;
    });
  }

  render() {
    const items = this._filtered();

    return html`
      <div class="po-overlay" @click=${(e) => e.target === e.currentTarget && this._close()}>
        <div class="po-panel">

          <!-- 검색창 -->
          <div class="po-search-wrap">
            <i class="fa-solid fa-magnifying-glass po-search-icon"></i>
            <input
              class="po-search"
              type="text"
              placeholder="프로젝트 검색..."
              .value=${this._query}
              @input=${(e) => { this._query = e.target.value; this._selIdx = -1; }}
              autocomplete="off"
              spellcheck="false"
            />
            <span class="po-kbd">ESC</span>
          </div>

          <!-- 카테고리 필터 -->
          <div class="po-cats">
            ${CATS.map(c => html`
              <button
                class="po-cat-btn ${this._cat === c.key ? 'active' : ''}"
                @click=${() => { this._cat = c.key; this._selIdx = -1; }}>
                ${c.label}
              </button>
            `)}
          </div>

          <!-- 결과 수 -->
          <div class="po-count">${items.length} projects</div>

          <!-- 카드 그리드 -->
          <div class="po-grid">
            ${items.length === 0
              ? html`<div class="po-empty">검색 결과 없음</div>`
              : items.map((p, i) => html`
                  <a
                    class="po-card ${this._selIdx === i ? 'sel' : ''}"
                    href="${p.url}"
                    target="_blank"
                    @mouseenter=${() => { this._selIdx = i; }}
                    @click=${() => this._close()}
                  >
                    <span class="po-icon">${p.icon}</span>
                    <span class="po-title">${p.title}</span>
                    <span class="po-desc">${p.desc}</span>
                    <span class="po-cat-label">${p.cat}</span>
                  </a>
                `)
            }
          </div>

        </div>
      </div>
    `;
  }
}

customElements.define('projects-overlay', ProjectsOverlay);
