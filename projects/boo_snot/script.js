(function() {
  const snot = document.getElementById('snot');
  let top = 0;
  setInterval(() => {
    top += 10;
    snot.style.top = `${top}px`;

    if (top > 120) {
      top = 0;
    }
  }, 400);
})();
