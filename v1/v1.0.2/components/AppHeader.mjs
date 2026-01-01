import { LitElement, html, css } from 'lib/lit/index.mjs';

export class AppHeader extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <header class="navbar sticky top-0 z-[100] px-6 lg:px-20 transition-all duration-300 backdrop-blur-md bg-white/70 border-b border-slate-200 h-20">
        <div class="flex-1">
          <a href="#" class="font-sora font-extrabold text-2xl tracking-tighter text-blue-600">
            Taeksoo<span class="text-slate-400">.dev</span>
          </a>
        </div>
        <div class="flex-none hidden md:block">
          <nav>
            <ul class="menu menu-horizontal font-bold text-slate-500 gap-4 flex items-center">
              <li><a href="#about" class="hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#projects" class="hover:text-blue-600 transition-colors">Works</a></li>
              <li><a href="https://github.com/taeksoolee" target="_blank" class="btn btn-ghost btn-circle"><i class="fa-brands fa-github text-xl"></i></a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}
customElements.define('app-header', AppHeader);