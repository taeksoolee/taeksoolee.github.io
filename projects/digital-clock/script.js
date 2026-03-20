const MINUTE_MS = 60000;
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

window.addEventListener('DOMContentLoaded', () => {
  const hoursEl  = document.querySelector('.clock-h');
  const minsEl   = document.querySelector('.clock-m');
  const dateEl   = document.getElementById('clock-date');
  const dayEl    = document.getElementById('clock-day');
  const secBar   = document.getElementById('sec-bar');
  const secLabel = document.getElementById('sec-label');

  const render = () => {
    const now = new Date();

    hoursEl.textContent = (now.getHours()   + '').padStart(2, '0');
    minsEl.textContent  = (now.getMinutes() + '').padStart(2, '0');

    const d = now.getDate(), m = MONTHS[now.getMonth()], y = now.getFullYear();
    dateEl.textContent = `${d} ${m} ${y}`;
    dayEl.textContent  = DAYS[now.getDay()];
  };

  const renderSeconds = () => {
    const sec = new Date().getSeconds();
    const pct = (sec / 59) * 100;
    secBar.style.width   = pct + '%';
    secLabel.textContent = (sec + '').padStart(2, '0') + 's';
  };

  let start = Date.now();

  function tick() {
    const now     = Date.now();
    const elapsed = now - start;

    render();

    start = now;
    setTimeout(tick, MINUTE_MS - (elapsed % MINUTE_MS));
  }

  render();
  renderSeconds();
  setInterval(renderSeconds, 1000);

  setTimeout(() => {
    start = Date.now();
    tick();
  }, MINUTE_MS - (start % MINUTE_MS) + 10);
});
