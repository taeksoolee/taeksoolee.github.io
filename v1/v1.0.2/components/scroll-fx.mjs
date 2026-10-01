// 스크롤 연동 효과를 한 곳에서 돌린다.
// 리스너 하나 + rAF 한 번으로 등록된 모든 대상을 갱신한다.
// 내용을 숨기는 연출(opacity 0 → 1)은 여기서 다루지 않는다. 위치만 다룬다.

const targets = new Set();
let ticking = false;
let bound = false;

function flush() {
  ticking = false;
  const vh = window.innerHeight;
  const y = window.scrollY;
  for (const fn of targets) {
    try { fn(y, vh); } catch (e) { /* 하나가 죽어도 나머지는 돈다 */ }
  }
}

function schedule() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(flush);
}

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** fn(scrollY, viewportHeight) 를 등록한다. 해제 함수를 돌려준다. */
export function registerScrollFx(fn) {
  if (prefersReducedMotion()) return () => {};

  targets.add(fn);
  if (!bound) {
    bound = true;
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
  }
  schedule();
  return () => targets.delete(fn);
}

/** 요소 중심이 뷰포트 중심에서 얼마나 떨어졌는지를 -1 ~ 1 로 */
export function centerProgress(el, vh) {
  const r = el.getBoundingClientRect();
  const p = ((r.top + r.height / 2) - vh / 2) / vh;
  return Math.max(-1, Math.min(1, p));
}

/** 화면 근처에 있는지 */
export function isNear(el, vh, margin = 200) {
  const r = el.getBoundingClientRect();
  return r.bottom > -margin && r.top < vh + margin;
}

/* ────────────────────────────────────────────────────────────────
   등장 연출
   기본 상태는 "보임" 이다. JS 가 돌 때만 html 에 js-reveal 을 붙여
   숨김 상태를 켠다. 스크립트가 죽으면 그냥 전부 보인다.
   ──────────────────────────────────────────────────────────────── */

let revealArmed = false;
const pending = new Set();

function revealAll() {
  for (const el of pending) el.classList.add('is-in');
  pending.clear();
}

function armReveal() {
  if (revealArmed) return;
  revealArmed = true;
  document.documentElement.classList.add('js-reveal');
  // 관찰이 어떤 이유로든 돌지 않으면 4초 뒤 전부 드러낸다
  setTimeout(revealAll, 4000);
}

/**
 * 요소들이 화면에 들어올 때 한 번 .is-in 을 붙인다.
 * reduced-motion 이거나 IntersectionObserver 가 없으면 바로 드러낸다.
 */
export function observeReveal(els, { stagger = 70, rootMargin = '0px 0px -8% 0px' } = {}) {
  const list = [...els].filter(Boolean);
  if (!list.length) return;

  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    for (const el of list) el.classList.add('is-in');
    return;
  }

  armReveal();
  for (const el of list) pending.add(el);

  const io = new IntersectionObserver((entries, obs) => {
    // 같은 타이밍에 들어온 것끼리만 순차로
    const hit = entries.filter(e => e.isIntersecting).map(e => e.target);
    hit.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('is-in');
        pending.delete(el);
      }, i * stagger);
      obs.unobserve(el);
    });
  }, { rootMargin, threshold: 0 });

  for (const el of list) io.observe(el);
}

/** 숫자 카운트업. 마크업에는 최종값이 들어 있어야 한다. */
export function countUp(el, target, suffix = '', duration = 900) {
  if (prefersReducedMotion()) return;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  el.textContent = '0' + suffix;
  requestAnimationFrame(step);
}
