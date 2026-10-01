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
