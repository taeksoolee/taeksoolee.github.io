import { LitElement, html, css } from 'lib/lit/index.mjs';

export class AppFooter extends LitElement {
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.currentYear = new Date().getFullYear();
  }

  render() {
    return html`
      <footer class="bg-slate-900 text-white py-32 px-6">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div class="space-y-4 text-center md:text-left">
            <h2 class="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter leading-none">Let's build <br> something <span class="text-blue-500 underline decoration-4 underline-offset-8">epic</span>.</h2>
            <p class="text-slate-400 font-medium pt-4">© ${this.currentYear} Taeksoo Lee. Powered by Persistence.</p>
          </div>
          <div class="flex gap-8">
            <!-- <a href="#" class="w-20 h-20 rounded-full border border-slate-700 flex items-center justify-center text-3xl hover:bg-white hover:text-slate-900 transition-all"><i class="fa-solid fa-paper-plane"></i></a> -->
            <a href="https://github.com/taeksoolee" class="w-20 h-20 rounded-full border border-slate-700 flex items-center justify-center text-3xl hover:bg-white hover:text-slate-900 transition-all"><i class="fa-brands fa-github"></i></a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);