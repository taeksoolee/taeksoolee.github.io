import { LitElement, html } from 'lib/lit/index.mjs';

export class ProfileSection extends LitElement {
  createRenderRoot() { return this; }

  firstUpdated() {
    // 벤토 카드 stagger reveal
    gsap.from(this.querySelectorAll('.bento-card'), {
      opacity: 0,
      y: 60,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.13,
      scrollTrigger: {
        trigger: this,
        start: 'top 82%',
      },
    });

    // 스킬 태그 wave
    gsap.from(this.querySelectorAll('.skill-tag'), {
      opacity: 0,
      scale: 0.65,
      duration: 0.4,
      ease: 'back.out(1.7)',
      stagger: 0.055,
      scrollTrigger: {
        trigger: this,
        start: 'top 72%',
      },
    });

    // 섹션 제목 reveal
    gsap.from(this.querySelector('.section-title'), {
      opacity: 0,
      x: -40,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: this,
        start: 'top 85%',
      },
    });

    // "Frontend Developer" bounce
    const spans = this.querySelectorAll('#animationText span');
    const bounce = () => {
      gsap.fromTo(spans,
        { y: 0 },
        {
          y: -7, color: '#0ea5e9',
          duration: 0.28, ease: 'power2.out',
          stagger: 0.038,
          yoyo: true, repeat: 1,
        }
      );
    };
    setTimeout(bounce, 1200);
    setInterval(bounce, 5500);
  }

  render() {
    return html`
      <section id="about" class="scroll-mt-28">

        <h2 class="section-title text-5xl md:text-7xl font-sora font-extrabold tracking-tighter mb-12" style="color: var(--color-text);">
          About<span class="gradient-text">.</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-4 h-auto md:h-[600px]">

          <!-- 메인 프로필 카드 -->
          <div class="bento-card md:col-span-8 md:row-span-2 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden relative group">
            <div class="flex flex-col md:flex-row gap-10 items-start md:items-center">
              <div class="avatar flex-shrink-0">
                <div class="w-36 h-36 rounded-[2rem] shadow-2xl overflow-hidden group-hover:rotate-2 transition-transform duration-500"
                  style="ring: 2px solid rgba(37,99,235,0.3); box-shadow: 0 0 0 4px rgba(37,99,235,0.15);">
                  <img src="/images/my-profile-img.png" alt="이택수" class="w-full h-full object-cover" />
                </div>
              </div>
              <div class="space-y-4">
                <h2 class="text-5xl font-extrabold tracking-tight text-white">이택수</h2>
                <div id="animationText" class="font-sora font-bold text-blue-400 text-xl tracking-widest uppercase">
                  <span>F</span><span>r</span><span>o</span><span>n</span><span>t</span><span>e</span><span>n</span><span>d</span>
                  <span>&nbsp;</span>
                  <span>D</span><span>e</span><span>v</span><span>e</span><span>l</span><span>o</span><span>p</span><span>e</span><span>r</span>
                </div>
                <p class="font-medium max-w-md leading-relaxed" style="color: var(--color-muted);">
                  데이터의 흐름을 이해하고 시각적인 즐거움으로 치환합니다.<br>
                  단순한 코더가 아닌 제품의 가치를 높이는 엔지니어가 되고자 합니다.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 pt-8" style="border-top: 1px solid var(--color-border);">
              <div class="flex flex-col">
                <span class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-muted);">Location</span>
                <span class="font-bold" style="color: #e2e8f0;">Seoul, Korea</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-muted);">Email</span>
                <span class="font-bold" style="color: #e2e8f0;">leets1490@gmail.com</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold uppercase tracking-widest mb-1" style="color: var(--color-muted);">Focus</span>
                <span class="font-bold" style="color: #e2e8f0;">UX/UI, Creative</span>
              </div>
            </div>
          </div>

          <!-- 스킬 카드 -->
          <div class="bento-card md:col-span-4 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden"
            style="background: rgba(37,99,235,0.85); border-color: rgba(37,99,235,0.4);">
            <h3 class="font-sora font-extrabold text-2xl tracking-tight leading-tight text-white">Expertise in<br>Modern Web.</h3>
            <div class="flex flex-wrap gap-2 mt-6">
              <span class="skill-tag px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style="background: rgba(255,255,255,0.18); color: #fff;">React</span>
              <span class="skill-tag px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style="background: rgba(255,255,255,0.18); color: #fff;">Next.js</span>
              <span class="skill-tag px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style="background: rgba(255,255,255,0.18); color: #fff;">TypeScript</span>
              <span class="skill-tag px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style="background: rgba(255,255,255,0.18); color: #fff;">Three.js</span>
              <span class="skill-tag px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style="background: rgba(255,255,255,0.18); color: #fff;">GSAP</span>
              <span class="skill-tag px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style="background: rgba(255,255,255,0.18); color: #fff;">Firebase</span>
            </div>
            <i class="fa-solid fa-layer-group absolute -bottom-6 -right-6 text-9xl" style="opacity: 0.1; color: #fff;"></i>
          </div>

          <!-- 소셜 링크 카드 -->
          <div class="bento-card md:col-span-4 rounded-[2.5rem] p-8 flex items-center justify-around">
            <a href="https://github.com/taeksoolee" target="_blank" class="flex flex-col items-center gap-2 group">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all text-2xl"
                style="background: rgba(255,255,255,0.07); color: #94a3b8;"
                onmouseenter="this.style.background='rgba(37,99,235,0.25)'; this.style.color='#60a5fa';"
                onmouseleave="this.style.background='rgba(255,255,255,0.07)'; this.style.color='#94a3b8';">
                <i class="fa-brands fa-github"></i>
              </div>
              <span class="text-[10px] font-black uppercase" style="color: var(--color-muted);">Github</span>
            </a>
          </div>

        </div>
      </section>
    `;
  }
}

customElements.define('profile-section', ProfileSection);
