const [leftInnerEye, rightInnerEye] = [...document.querySelectorAll('.inner-eye')];

window.addEventListener('mousemove', (e) => {
  const leftX = (e.clientX / window.innerWidth  * 100 / 2) - 25;
  const leftY = (e.clientY / window.innerHeight * 100 / 2) - 25;

  leftInnerEye.style.top  = `${leftY}px`;
  leftInnerEye.style.left = `${leftX}px`;

  const rightX = (e.clientX / window.innerWidth  * 100 / 2) - 25;
  const rightY = (e.clientY / window.innerHeight * 100 / 2) - 25;

  rightInnerEye.style.top  = `${rightY}px`;
  rightInnerEye.style.left = `${rightX}px`;
});

/* ── color palette ── */
const BG_COLORS = Object.freeze([
  { name: 'dark',    bg: '#07071a', iris: '#07071a'  },
  { name: 'slate',   bg: '#0f172a', iris: '#0f172a'  },
  { name: 'red',     bg: '#1a0707', iris: '#1a0707'  },
  { name: 'orange',  bg: '#1a0e00', iris: '#1c1200'  },
  { name: 'green',   bg: '#071a0b', iris: '#071a0b'  },
  { name: 'sky',     bg: '#07131a', iris: '#07131a'  },
  { name: 'blue',    bg: '#070d1a', iris: '#070d1a'  },
  { name: 'purple',  bg: '#0e071a', iris: '#0e071a'  },
]);

const DOT_SWATCHES = ['#07071a','#0f172a','#3b0000','#3b1a00','#003b0e','#003b3b','#00163b','#1e003b'];

let colorIdx = 0;

const root      = document.documentElement;
const paletteEl = document.getElementById('palette-row');

function applyColor(idx) {
  const c = BG_COLORS[idx];
  root.style.setProperty('--bg-color', c.bg);
  root.style.setProperty('--iris',     c.iris);
  paletteEl.querySelectorAll('.palette-dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

// build dots
DOT_SWATCHES.forEach((swatch, i) => {
  const dot = document.createElement('div');
  dot.className = 'palette-dot' + (i === 0 ? ' active' : '');
  dot.style.background = swatch;
  dot.title = BG_COLORS[i].name;
  dot.addEventListener('click', e => { e.stopPropagation(); colorIdx = i; applyColor(i); });
  paletteEl.appendChild(dot);
});

window.addEventListener('click', () => {
  colorIdx = (colorIdx + 1) % BG_COLORS.length;
  applyColor(colorIdx);
});
