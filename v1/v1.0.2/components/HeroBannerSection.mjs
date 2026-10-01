import { LitElement, html } from 'lib/lit/index.mjs';
import * as THREE from 'three';
import { registerScrollFx } from './scroll-fx.mjs';

export class HeroBannerSection extends LitElement {
  createRenderRoot() { return this; }

  firstUpdated() {
    this._initThree();
    this._initParallax();
  }

  _initParallax() {
    const canvas = this.querySelector('#hero-canvas');
    const content = this.querySelector('.hero-content');
    const section = this.querySelector('section');
    if (!section) return;

    this._offFx = registerScrollFx((y) => {
      const h = section.offsetHeight;
      if (y > h) return;                       // 히어로를 지나면 멈춘다
      // 배경이 가장 느리고, 본문이 그다음, 스크롤이 가장 빠르다
      if (canvas)  canvas.style.transform  = `translate3d(0, ${(y * 0.34).toFixed(1)}px, 0)`;
      if (content) content.style.transform = `translate3d(0, ${(y * 0.13).toFixed(1)}px, 0)`;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._offFx) this._offFx();
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

  render() {
    return html`
      <section class="relative flex flex-col items-center justify-center text-center space-y-10 pt-20 overflow-hidden" style="min-height: 90vh;">

        <canvas id="hero-canvas" class="absolute inset-0 w-full" style="z-index: 0; will-change: transform;"></canvas>

        <div class="hero-content relative flex flex-col items-center space-y-10" style="z-index: 1; will-change: transform;">

          <div class="hero-badge neon-ring mono inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase"
            style="background: rgba(56,189,248,0.06); color: #7dd3fc;">
            <span class="w-1.5 h-1.5 rounded-full animate-pulse"
              style="background: var(--neon); box-shadow: 0 0 8px var(--neon);"></span>
            currently open to offers
          </div>

          <h1 class="hero-title font-sora font-extrabold tracking-tighter leading-none" style="font-size: clamp(52px, 12vw, 144px);">
            <span class="block text-white">Crafting</span>
            <span class="block gradient-text italic neon-text">Digital Depth.</span>
          </h1>

          <p class="hero-sub max-w-2xl text-lg md:text-xl font-medium leading-relaxed" style="color: var(--color-muted);">
            안녕하세요, 프론트엔드 개발자 이택수입니다.<br>
            기술적 한계를 넘어 사용자에게 닿는 완결성 있는 경험을 추구합니다.
          </p>

          <div class="hero-cta flex flex-wrap justify-center items-center gap-3 pt-4 mono text-[12px] tracking-[0.14em] uppercase">
            <a href="#projects"
              class="inline-flex items-center gap-2 rounded-lg px-7 py-3 font-bold no-underline"
              style="color: #04121c; background: linear-gradient(135deg, #7dd3fc, var(--neon));
                     box-shadow: 0 0 26px -6px rgba(56,189,248,0.85);
                     transition: box-shadow 0.18s ease, transform 0.18s ease;"
              onmouseenter="this.style.boxShadow='0 0 34px -2px rgba(56,189,248,1)';"
              onmouseleave="this.style.boxShadow='0 0 26px -6px rgba(56,189,248,0.85)';">
              view works
              <i class="fa-solid fa-arrow-right" style="font-size: 10px;"></i>
            </a>
            <a href="#about"
              class="neon-ring inline-flex items-center rounded-lg px-7 py-3 font-bold no-underline"
              style="color: #94a3b8; background: rgba(56,189,248,0.04);"
              onmouseenter="this.style.color='#e2e8f0';"
              onmouseleave="this.style.color='#94a3b8';">
              about me
            </a>
          </div>

        </div>
      </section>
    `;
  }
}

customElements.define('hero-banner-section', HeroBannerSection);
