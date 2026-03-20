const MINUTE_MS = 60000;

window.addEventListener('DOMContentLoaded', () => {
  const [hours, minutes] = [...document.querySelectorAll('span')];

  const render = () => {
    const now = new Date();

    hours.innerText = (now.getHours()+'').padStart(2, '0');
    minutes.innerText = (now.getMinutes()+'').padStart(2, '0');
  }

  let start = Date.now();

  function tick() {
    const now = Date.now();
    const elapsed = now - start;

    // 작업 실행
    render();

    // 다음 tick을 정확히 1분 후에 실행되도록 보정
    start = now;
    setTimeout(tick, MINUTE_MS - (elapsed % MINUTE_MS)); // 60000ms = 1분
  }

  render();
  setTimeout(() => {
    start = Date.now();
    tick();
  }, MINUTE_MS - (start % MINUTE_MS) + 10); 
});