import { LitElement, html, css } from 'lib/lit/index.mjs';

const PROJECTS = [
  { title: 'Background Remover', url: '/projects/background-remover-app/', cat: 'app',  desc: 'AI 온디바이스 배경 제거', icon: '🖼️' },
  { title: '3D Tetris',          url: '/projects/3d-tetris/',               cat: 'game', desc: 'Three.js 3D 테트리스',   icon: '🎮' },
  { title: '3D Portfolio',       url: '/projects/3d-page/portfoilo/',        cat: 'demo', desc: '3D 스크롤 포트폴리오',   icon: '🌐' },
  { title: 'Mobile Template',    url: '/projects/mobile-app-template/',      cat: 'ui',   desc: '모바일 앱 UI 템플릿',   icon: '📱' },
  { title: 'Profile Card',       url: '/projects/profile-card/',             cat: 'ui',   desc: '인터랙티브 프로필 카드', icon: '👤' },
  { title: 'Resume',             url: '/projects/resume/',                   cat: 'ui',   desc: '이력서 페이지',         icon: '📋' },
  { title: 'PDF Converter',      url: '/projects/pdf-convert/',              cat: 'tool', desc: '이미지 → PDF 변환',     icon: '📄' },
  { title: 'Color Picker',       url: '/projects/tools/color-picker.html',   cat: 'tool', desc: 'RGB ↔ Hex 변환기',      icon: '🎨' },
  { title: 'Digital Clock',      url: '/projects/digital-clock/',            cat: 'tool', desc: '실시간 디지털 시계',    icon: '🕐' },
  { title: 'Image Services',     url: '/projects/image-services/imgbb.html', cat: 'tool', desc: 'ImgBB 이미지 업로드',   icon: '📤' },
  { title: 'Pokemon Explorer',   url: '/projects/pokemon/',                  cat: 'demo', desc: 'PokeAPI 포켓몬 탐색기', icon: '🐾' },
  { title: 'With Speech',        url: '/projects/with-speech/',              cat: 'demo', desc: '음성 명령 텍스트 리더', icon: '🎤' },
  { title: 'Scroll Snap',        url: '/projects/scroll-snap/',              cat: 'demo', desc: 'CSS 스크롤 스냅 데모',  icon: '📜' },
  { title: 'Music Synth',        url: '/projects/music/',                    cat: 'demo', desc: '웹 신시사이저',         icon: '🎵' },
  { title: 'Cursor Eyes',        url: '/projects/cursor-eyes/',              cat: 'demo', desc: '마우스 추적 눈 효과',   icon: '👁️' },
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
  static styles = css`
    :host { display: block; }

    /* ── 오버레이 전체 ── */
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 99980;
      background: rgba(3, 3, 13, 0.97);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding: clamp(60px, 8vh, 100px) 24px 60px;
      overflow-y: auto;
    }

    .panel { width: 100%; max-width: 960px; }

    /* ── 검색창 ── */
    .search-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-radius: 16px;
      margin-bottom: 14px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      transition: border-color 0.2s;
    }
    .search-wrap:focus-within {
      border-color: rgba(37,99,235,0.5);
    }
    .search-icon { font-size: 15px; color: #4b5563; flex-shrink: 0; }
    .search-input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      color: #f8fafc;
      font-size: 15px;
      font-family: inherit;
    }
    .search-input::placeholder { color: #374151; }
    .kbd {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #374151;
      padding: 3px 8px;
      border: 1px solid #1f2937;
      border-radius: 6px;
      flex-shrink: 0;
    }

    /* ── 카테고리 탭 ── */
    .cats {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .cat-btn {
      padding: 5px 16px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border: 1px solid rgba(255,255,255,0.09);
      background: transparent;
      color: #4b5563;
      cursor: none;
      transition: background 0.18s, border-color 0.18s, color 0.18s;
    }
    .cat-btn:hover { color: #94a3b8; border-color: rgba(255,255,255,0.2); }
    .cat-btn.active {
      background: rgba(37,99,235,0.22);
      border-color: rgba(37,99,235,0.55);
      color: #93c5fd;
    }

    /* ── 결과 수 ── */
    .result-count {
      font-size: 11px;
      color: #1f2937;
      margin-bottom: 14px;
      letter-spacing: 0.05em;
    }

    /* ── 카드 그리드 ── */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 10px;
    }

    /* ── 프로젝트 카드 ── */
    .proj-card {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 18px 16px;
      background: rgba(255,255,255,0.035);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
      text-decoration: none;
      cursor: none;
      transition: background 0.18s, border-color 0.18s, transform 0.18s;
      outline: none;
    }
    .proj-card:hover,
    .proj-card.sel {
      background: rgba(37,99,235,0.13);
      border-color: rgba(37,99,235,0.48);
      transform: translateY(-2px);
    }
    .proj-icon { font-size: 22px; line-height: 1; margin-bottom: 2px; }
    .proj-title {
      font-size: 13px;
      font-weight: 700;
      color: #e2e8f0;
      line-height: 1.3;
    }
    .proj-desc {
      font-size: 11px;
      color: #475569;
      line-height: 1.45;
    }
    .proj-cat {
      margin-top: auto;
      padding-top: 8px;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(37,99,235,0.7);
    }

    /* ── 빈 결과 ── */
    .empty {
      grid-column: 1 / -1;
      text-align: center;
      padding: 56px 0;
      color: #1f2937;
      font-size: 14px;
    }
  `;

  static properties = {
    _query:  { type: String, state: true },
    _cat:    { type: String, state: true },
    _selIdx: { type: Number, state: true },
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
      // Ctrl/Cmd + K
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

  _toggle() { this._isOpen ? this._close() : this._open(); }

  _open() {
    this._isOpen = true;
    this._query  = '';
    this._selIdx = -1;
    document.body.style.overflow = 'hidden';

    const ov    = this.renderRoot.querySelector('.overlay');
    const panel = this.renderRoot.querySelector('.panel');
    gsap.set(ov, { display: 'flex', opacity: 0 });
    gsap.to(ov, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(panel,
      { opacity: 0, y: -18, scale: 0.97 },
      { opacity: 1, y: 0,   scale: 1,    duration: 0.3, ease: 'power3.out' }
    );

    // 카드 stagger (다음 프레임 - 렌더 후)
    requestAnimationFrame(() => {
      gsap.fromTo(
        this.renderRoot.querySelectorAll('.proj-card'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', stagger: 0.018, delay: 0.07 }
      );
    });

    setTimeout(() => this.renderRoot.querySelector('.search-input')?.focus(), 130);
  }

  _close() {
    this._isOpen = false;
    document.body.style.overflow = '';

    const ov = this.renderRoot.querySelector('.overlay');
    gsap.to(ov, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => gsap.set(ov, { display: 'none' }),
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
      <div class="overlay" @click=${(e) => e.target === e.currentTarget && this._close()}>
        <div class="panel">

          <!-- 검색창 -->
          <div class="search-wrap">
            <span class="search-icon">⌕</span>
            <input
              class="search-input"
              type="text"
              placeholder="프로젝트 검색..."
              .value=${this._query}
              @input=${(e) => { this._query = e.target.value; this._selIdx = -1; }}
              autocomplete="off"
              spellcheck="false"
            />
            <span class="kbd">ESC</span>
          </div>

          <!-- 카테고리 필터 -->
          <div class="cats">
            ${CATS.map(c => html`
              <button
                class="cat-btn ${this._cat === c.key ? 'active' : ''}"
                @click=${() => { this._cat = c.key; this._selIdx = -1; }}>
                ${c.label}
              </button>
            `)}
          </div>

          <!-- 결과 수 -->
          <div class="result-count">${items.length} projects</div>

          <!-- 카드 그리드 -->
          <div class="grid">
            ${items.length === 0 ? html`
              <div class="empty">검색 결과 없음</div>
            ` : items.map((p, i) => html`
              <a
                class="proj-card ${this._selIdx === i ? 'sel' : ''}"
                href="${p.url}"
                target="_blank"
                @mouseenter=${() => { this._selIdx = i; }}
                @click=${() => this._close()}
              >
                <span class="proj-icon">${p.icon}</span>
                <span class="proj-title">${p.title}</span>
                <span class="proj-desc">${p.desc}</span>
                <span class="proj-cat">${p.cat}</span>
              </a>
            `)}
          </div>

        </div>
      </div>
    `;
  }
}

customElements.define('projects-overlay', ProjectsOverlay);
