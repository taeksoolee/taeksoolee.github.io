import { LitElement, html } from 'lib/lit/index.mjs';
import * as THREE from 'three';

const SCRAMBLE_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&*%!?';

function scrambleChar(el, finalChar, delay = 0) {
  if (!finalChar || finalChar.trim() === '') return;
  setTimeout(() => {
    let count = 0;
    const total = 8;
    const id = setInterval(() => {
      el.textContent = SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
      if (++count >= total) {
        el.textContent = finalChar;
        clearInterval(id);
      }
    }, 38);
  }, delay);
}

export class HeroBannerSection extends LitElement {
  createRenderRoot() { return this; }

  firstUpdated() {
    this._initThree();
    this._initTextGSAP();
    this._initMagnetic();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animId) cancelAnimationFrame(this._animId);
    if (this._renderer) this._renderer.dispose();
    if (this._mouseCb) window.removeEventListener('mousemove', this._mouseCb);
    if (this._resizeCb) window.removeEventListener('resize', this._resizeCb);
  }

  _initThree() {
    const canvas = this.querySelector('#hero-canvas');
    const w = canvas.offsetWidth || window.innerWidth;
    const h = window.innerHeight * 0.9;
    canvas.style.height = h + 'px';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    this._renderer = renderer;

    // 파티클
    const COUNT = 65;
    const pData = [];
    const pPos = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 13;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 2;
      pData.push({ x, y, z, vx: (Math.random() - 0.5) * 0.003, vy: (Math.random() - 0.5) * 0.003 });
      pPos[i * 3] = x;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = z;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.035, transparent: true, opacity: 0.85 });
    scene.add(new THREE.Points(pGeo, pMat));

    // 연결선
    const MAX_SEGS = COUNT * (COUNT - 1) / 2;
    const linePos = new Float32Array(MAX_SEGS * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lineGeo.setDrawRange(0, 0);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.2 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // 마우스 시차
    const mouse = { x: 0, y: 0 };
    this._mouseCb = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.25;
    };
    window.addEventListener('mousemove', this._mouseCb);

    // 리사이즈
    this._resizeCb = () => {
      const nw = canvas.offsetWidth || window.innerWidth;
      const nh = window.innerHeight * 0.9;
      canvas.style.height = nh + 'px';
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', this._resizeCb);

    // 스크롤 페이드
    gsap.to(canvas, {
      opacity: 0,
      scrollTrigger: {
        trigger: this.querySelector('section'),
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    const animate = () => {
      this._animId = requestAnimationFrame(animate);

      for (let i = 0; i < COUNT; i++) {
        pData[i].x += pData[i].vx;
        pData[i].y += pData[i].vy;
        if (Math.abs(pData[i].x) > 6.5) pData[i].vx *= -1;
        if (Math.abs(pData[i].y) > 4) pData[i].vy *= -1;
        pPos[i * 3] = pData[i].x;
        pPos[i * 3 + 1] = pData[i].y;
        pPos[i * 3 + 2] = pData[i].z;
      }
      pGeo.attributes.position.needsUpdate = true;

      let seg = 0;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pData[i].x - pData[j].x;
          const dy = pData[i].y - pData[j].y;
          if (dx * dx + dy * dy < 6.25) {
            linePos[seg * 6 + 0] = pData[i].x; linePos[seg * 6 + 1] = pData[i].y; linePos[seg * 6 + 2] = pData[i].z;
            linePos[seg * 6 + 3] = pData[j].x; linePos[seg * 6 + 4] = pData[j].y; linePos[seg * 6 + 5] = pData[j].z;
            seg++;
          }
        }
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.setDrawRange(0, seg * 2);

      camera.position.x += (mouse.x - camera.position.x) * 0.025;
      camera.position.y += (mouse.y - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();
  }

  _initTextGSAP() {
    const chars = this.querySelectorAll('.hero-char');
    const badge = this.querySelector('.hero-badge');
    const sub = this.querySelector('.hero-sub');
    const cta = this.querySelector('.hero-cta');

    gsap.set(chars, { opacity: 0, y: 70, rotateX: -90 });
    gsap.set([badge, sub, cta], { opacity: 0, y: 24 });

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(badge, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .add(() => {
        // 각 글자: fade-up 시작과 동시에 스크램블
        chars.forEach((el, i) => {
          const orig = el.dataset.orig || el.textContent;
          gsap.to(el, {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.5, ease: 'power2.out',
            delay: i * 0.025,
            onStart() { scrambleChar(el, orig, 0); },
          });
        });
      }, '-=0.2')
      .to(sub, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, `+=${chars.length * 0.025 + 0.3}`)
      .to(cta, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
  }

  // 마그네틱 버튼
  _initMagnetic() {
    this.querySelectorAll('.hero-cta a').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.32;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.32;
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
      });
    });
  }

  render() {
    const toChars = (str) => str.split('').map((ch) =>
      ch === ' '
        ? html`<span class="hero-char inline-block" data-orig=" ">&nbsp;</span>`
        : html`<span class="hero-char inline-block" data-orig="${ch}">${ch}</span>`
    );

    return html`
      <section class="relative flex flex-col items-center justify-center text-center space-y-10 pt-20 overflow-hidden" style="min-height: 90vh;">

        <canvas id="hero-canvas" class="absolute inset-0 w-full" style="z-index: 0;"></canvas>

        <div class="relative flex flex-col items-center space-y-10" style="z-index: 1;">

          <div class="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-xs tracking-widest uppercase"
            style="background: rgba(37,99,235,0.12); border-color: rgba(37,99,235,0.3); color: #93c5fd;">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Currently Open to Offers
          </div>

          <h1 class="font-sora font-extrabold tracking-tighter leading-none" style="font-size: clamp(52px, 12vw, 144px); perspective: 900px;">
            <span class="block text-white">${toChars('Crafting')}</span>
            <span class="block gradient-text italic">${toChars('Digital Depth.')}</span>
          </h1>

          <p class="hero-sub max-w-2xl text-lg md:text-xl font-medium leading-relaxed" style="color: var(--color-muted);">
            안녕하세요, 프론트엔드 개발자 이택수입니다.<br>
            기술적 한계를 넘어 사용자에게 닿는 완결성 있는 경험을 추구합니다.
          </p>

          <div class="hero-cta flex gap-4 pt-4">
            <a href="#projects" class="btn btn-primary btn-lg rounded-2xl px-12 shadow-2xl"
              style="box-shadow: 0 20px 40px -10px rgba(37,99,235,0.4);">View Works</a>
            <a href="#about" class="btn btn-ghost btn-lg font-bold hover:text-white transition-colors"
              style="color: var(--color-muted);">Learn More</a>
          </div>

        </div>
      </section>
    `;
  }
}

customElements.define('hero-banner-section', HeroBannerSection);
