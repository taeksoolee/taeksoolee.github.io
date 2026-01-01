import { LitElement, html } from 'lib/lit/index.mjs';

export class ProfileSection extends LitElement {
  createRenderRoot() {
    return this;
  }
  
  firstUpdated() {
    const animationText = document.querySelector('#animationText');
    const spans = animationText.querySelectorAll('span');
    const triggerAnimation = () => {
      spans.forEach((span, index) => {
        span.classList.remove('bound');
        setTimeout(() => span.classList.add('bound'), index * 80);
      });
    };
    setInterval(triggerAnimation, 6000);
    window.onload = triggerAnimation;
  }

  render() {
    return html`
    <section id="about" class="scroll-mt-28">
      <div class="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-4 h-auto md:h-[600px]">

        <div class="reveal-item md:col-span-8 md:row-span-2 bento-card rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden relative group">
          <div class="flex flex-col md:flex-row gap-10 items-start md:items-center">
            <div class="avatar">
              <div class="w-40 h-40 rounded-[2rem] ring ring-blue-100 ring-offset-4 shadow-2xl overflow-hidden group-hover:rotate-2 transition-transform duration-500">
                <img src="/images/my-profile-img.png" alt="이택수" />
              </div>
            </div>
            <div class="space-y-4">
              <h2 class="text-5xl font-extrabold text-slate-900 tracking-tight">이택수</h2>
              <div id="animationText" class="font-sora font-bold text-blue-600 text-xl tracking-widest uppercase opacity-80">
                <span>F</span><span>r</span><span>o</span><span>n</span><span>t</span><span>e</span><span>n</span><span>d</span>
                <span class="mx-1"></span>
                <span>D</span><span>e</span><span>v</span><span>e</span><span>l</span><span>o</span><span>p</span><span>e</span><span>r</span>
              </div>
              <p class="text-slate-500 font-medium max-w-md leading-relaxed">
                데이터의 흐름을 이해하고 시각적인 즐거움으로 치환합니다.
                단순한 코더가 아닌 제품의 가치를 높이는 엔지니어가 되고자 합니다.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 border-t border-slate-100 pt-8">
            <div class="flex flex-col"><span class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</span><span class="font-bold text-slate-800">Seoul, Korea</span></div>
            <div class="flex flex-col"><span class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</span><span class="font-bold text-slate-800">leets1490@gmail.com</span></div>
            <div class="flex flex-col"><span class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Focus</span><span class="font-bold text-slate-800">UX/UI, Perf.</span></div>
          </div>
        </div>

        <div class="reveal-item md:col-span-4 bento-card rounded-[2.5rem] p-8 bg-blue-600 text-white flex flex-col justify-between relative overflow-hidden">
          <h3 class="font-sora font-extrabold text-2xl tracking-tight leading-tight">Expertise in <br> Modern Web.</h3>
          <div class="flex flex-wrap gap-2 mt-6">
            <span class="px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">React</span>
            <span class="px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">Next.js</span>
            <span class="px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">TS</span>
            <span class="px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">Firebase</span>
          </div>
          <i class="fa-solid fa-layer-group absolute -bottom-6 -right-6 text-9xl opacity-10"></i>
        </div>

        <div class="reveal-item md:col-span-4 bento-card rounded-[2.5rem] p-8 flex items-center justify-around">
          <a href="https://github.com/taeksoolee" target="_blank" class="flex flex-col items-center gap-2 group">
            <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all text-2xl"><i class="fa-brands fa-github"></i></div>
            <span class="text-[10px] font-black uppercase opacity-40">Github</span>
          </a>
          <!-- <a href="#" class="flex flex-col items-center gap-2 group">
            <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all text-2xl"><i class="fa-solid fa-file-invoice"></i></div>
            <span class="text-[10px] font-black uppercase opacity-40">Notion</span>
          </a>
          <a href="#" class="flex flex-col items-center gap-2 group">
            <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all text-2xl"><i class="fa-brands fa-linkedin-in"></i></div>
            <span class="text-[10px] font-black uppercase opacity-40">Linkedin</span>
          </a> -->
        </div>
      </div>
    </section>
    `
  }
}

customElements.define('profile-section', ProfileSection);
