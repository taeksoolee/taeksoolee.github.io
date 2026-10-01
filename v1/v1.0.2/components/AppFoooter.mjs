import { LitElement, html } from 'lib/lit/index.mjs';
import { observeReveal } from './scroll-fx.mjs';

// PocketBase — 컬렉션 이름은 프로젝트명 접두사 규칙(evcaro_* 처럼)을 따른다
const PB_URL = 'https://pocketbase.taeksoolee.com';
const PB_COLLECTION = 'portfolio_contacts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// 연속 전송 쿨다운.
// 전송이 끝나도 쿨다운 동안은 계속 'sending' 으로 둔다. 완료 안내와 폼
// 초기화도 쿨다운이 끝날 때 한꺼번에 처리해서, 전체가 "보내는 중 → 완료"
// 한 흐름으로 읽히게 한다. 남은 초를 띄우면 "기다려라" 로 읽혀서 뺐다.
// 어디까지나 UX 용이다 — 실수로 두 번 누르거나 보내고 또 보내는 걸 막는다.
// 엔드포인트를 직접 호출하는 쪽은 이걸 거치지 않으므로 보안 대책이 아니다.
// 남용 차단은 PocketBase 의 API 규칙과 레이트 리밋에서만 강제된다.
const COOLDOWN_MS = 10 * 1000;
const COOLDOWN_KEY = 'tsl:contact-sent-at';

export class AppFooter extends LitElement {
  createRenderRoot() { return this; }

  static properties = {
    _status: { type: String, state: true },   // idle | sending | ok | error
    _error:  { type: String, state: true },
    _cooldown: { type: Number, state: true }, // 남은 초
  };

  constructor() {
    super();
    this.currentYear = new Date().getFullYear();
    this._status = 'idle';
    this._error = '';
    this._cooldown = 0;
  }

  firstUpdated() {
    const els = [this.querySelector('.footer-cta'), this.querySelector('.footer-form')].filter(Boolean);
    els.forEach(e => e.classList.add('reveal'));
    observeReveal(els, { stagger: 110 });
    this._resumeCooldown();   // 새로고침해도 쿨다운이 이어지도록
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._tick) clearTimeout(this._tick);
  }

  _readSentAt() {
    try { return Number(localStorage.getItem(COOLDOWN_KEY)) || 0; } catch (e) { return 0; }
  }

  _resumeCooldown() {
    const left = COOLDOWN_MS - (Date.now() - this._readSentAt());
    if (left <= 0) return;
    this._startCooldown(left);
  }

  /** 쿨다운만 건다 (새로고침으로 이어받은 경우) */
  _startCooldown(ms) {
    if (this._tick) clearTimeout(this._tick);
    this._cooldown = 1;                     // 남은 초가 아니라 단순 플래그
    this._tick = setTimeout(() => { this._cooldown = 0; }, ms);
  }

  /** 쿨다운이 끝나는 순간 완료 안내와 폼 초기화를 함께 처리한다 */
  _finishAfterCooldown(form, ms) {
    if (this._tick) clearTimeout(this._tick);
    this._cooldown = 1;
    this._tick = setTimeout(() => {
      this._cooldown = 0;
      this._status = 'ok';
      if (form) form.reset();
    }, ms);
  }

  _validate({ name, email, message }) {
    if (!name) return '이름을 입력해 주세요.';
    if (name.length > 80) return '이름이 너무 깁니다.';
    if (!email) return '이메일을 입력해 주세요.';
    if (!EMAIL_RE.test(email)) return '이메일 형식을 확인해 주세요.';
    if (message.length < 5) return '내용을 5자 이상 입력해 주세요.';
    if (message.length > 4000) return '내용이 너무 깁니다. 4000자 이내로 부탁드립니다.';
    return '';
  }

  async _submit(e) {
    e.preventDefault();
    if (this._status === 'sending') return;

    if (this._cooldown > 0) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // 봇이 채우는 칸 — 값이 있으면 보내지 않고 성공한 것처럼 둔다
    if ((data.get('website') || '').toString().trim()) {
      this._status = 'sending';
      this._finishAfterCooldown(form, COOLDOWN_MS);
      return;
    }

    const payload = {
      name: (data.get('name') || '').toString().trim(),
      email: (data.get('email') || '').toString().trim(),
      message: (data.get('message') || '').toString().trim(),
      source: location.host,
    };

    const err = this._validate(payload);
    if (err) { this._status = 'error'; this._error = err; return; }

    this._status = 'sending';
    this._error = '';

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);

    try {
      const res = await fetch(`${PB_URL}/api/collections/${PB_COLLECTION}/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        // PocketBase 원문 대신 상황에 맞는 문장을 보여준다
        if (res.status === 429) throw new Error('요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요.');
        if (res.status === 404) throw new Error('문의 접수처를 찾지 못했습니다.');
        if (res.status === 403) throw new Error('지금은 접수가 막혀 있습니다.');
        if (res.status === 400) {
          let field = '';
          try {
            const body = await res.json();
            field = body?.data ? Object.keys(body.data)[0] : '';
          } catch (_) { /* 본문이 JSON 이 아닐 수 있다 */ }
          throw new Error(field ? `입력값을 확인해 주세요. (${field})` : '입력값을 확인해 주세요.');
        }
        throw new Error(`전송에 실패했습니다. (${res.status})`);
      }

      try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch (e3) {}
      this._finishAfterCooldown(form, COOLDOWN_MS);   // _status 는 'sending' 유지
    } catch (e2) {
      this._status = 'error';
      if (e2.name === 'AbortError') {
        this._error = '응답이 없습니다. 잠시 후 다시 시도해 주세요.';
      } else if (e2 instanceof TypeError) {
        // fetch 자체가 실패 — 네트워크 끊김, CORS, 차단 등
        this._error = '서버에 연결하지 못했습니다.';
      } else {
        this._error = e2.message || '전송에 실패했습니다.';
      }
    } finally {
      clearTimeout(timer);
    }
    // 성공 경로는 _status 를 'sending' 으로 유지한 채 쿨다운이 끝낸다.
  }

  _renderStatus() {
    if (this._status === 'ok') {
      return html`
        <p class="mono text-[12px] flex items-center gap-2" style="color: #7dd3fc;" role="status">
          <i class="fa-solid fa-check"></i> 보냈습니다. 확인하는 대로 답장드리겠습니다.
        </p>`;
    }
    if (this._status === 'error') {
      return html`
        <p class="mono text-[12px] flex items-start gap-2" style="color: #fb7185;" role="alert">
          <i class="fa-solid fa-triangle-exclamation mt-[2px]"></i>
          <span>${this._error}
            <a href="mailto:leets1490@gmail.com" style="color: #7dd3fc;">메일로 보내기</a>
          </span>
        </p>`;
    }
    return html`
      <p class="mono text-[11px]" style="color: #475569;">
        보내주신 이메일은 답장에만 씁니다.
      </p>`;
  }

  render() {
    const sending = this._status === 'sending';
    const cooling = this._cooldown > 0;
    const blocked = sending || cooling;

    return html`
      <footer style="background: #03030d; border-top: 1px solid var(--color-border);">
        <div class="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">

          <!-- 왼쪽: 제목 + 직접 연락 -->
          <div class="footer-cta space-y-4">
            <h2 class="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter leading-none text-white">
              Contact
            </h2>
            <p class="max-w-sm leading-relaxed" style="color: var(--color-muted);">
              프로젝트 제안, 채용, 혹은 만든 도구에 대한 이야기 모두 환영합니다.
            </p>
            <div class="mono text-[12px] flex flex-col gap-2 pt-2">
              <a href="mailto:leets1490@gmail.com" class="nav-link w-fit" style="color: #94a3b8;">leets1490@gmail.com</a>
              <a href="https://github.com/taeksoolee" target="_blank" rel="noopener"
                class="nav-link w-fit" style="color: #94a3b8;">github.com/taeksoolee</a>
            </div>
            <p class="font-medium pt-6" style="color: #475569;">
              © ${this.currentYear} Taeksoo Lee
            </p>
          </div>

          <!-- 오른쪽: 문의 폼 -->
          <form class="footer-form neon-ring rounded-xl p-6 md:p-7 flex flex-col gap-4"
            style="background: rgba(56,189,248,0.03);"
            @submit=${this._submit} novalidate>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="field-label mono" for="cf-name">name</label>
                <input class="field" id="cf-name" name="name" type="text" required maxlength="80"
                  placeholder="이름" autocomplete="name" ?disabled=${blocked}>
              </div>
              <div>
                <label class="field-label mono" for="cf-email">email</label>
                <input class="field" id="cf-email" name="email" type="email" required
                  placeholder="답장받을 주소" autocomplete="email" ?disabled=${blocked}>
              </div>
            </div>

            <div>
              <label class="field-label mono" for="cf-message">message</label>
              <textarea class="field" id="cf-message" name="message" rows="5" required maxlength="4000"
                placeholder="어떤 이야기든 편하게 적어주세요." ?disabled=${blocked}></textarea>
            </div>

            <div class="honeypot" aria-hidden="true">
              <label for="cf-website">website</label>
              <input id="cf-website" name="website" type="text" tabindex="-1" autocomplete="off">
            </div>

            <div class="flex flex-col gap-3 pt-1">
              <button type="submit" ?disabled=${blocked}
                class="mono inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
                style="color: #04121c; background: linear-gradient(135deg, #7dd3fc, var(--neon));
                       box-shadow: 0 0 22px -8px rgba(56,189,248,0.85);
                       transition: box-shadow 0.18s ease, opacity 0.18s ease;
                       ${blocked ? 'opacity:0.6; cursor:progress;' : ''}">
                ${blocked
                  ? html`<i class="fa-solid fa-circle-notch fa-spin" style="font-size: 11px;"></i> sending`
                  : html`send message <i class="fa-solid fa-paper-plane" style="font-size: 10px;"></i>`}
              </button>
              <div aria-live="polite">${this._renderStatus()}</div>
            </div>
          </form>

        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
