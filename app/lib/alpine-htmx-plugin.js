/**
 * alpine-htmx-plugin.js
 */

(function() {
  function alpineHtmxPlugin(Alpine) {
    const triggerName = 'alpineReady';
    Alpine.directive('htmx-init', (el, {expression}, {evaluate}) => {
      htmx.process(el);

      const htmxGetContainer = document.querySelectorAll(`[hx-get][hx-trigger="${triggerName}"]`);
      console.log(htmxGetContainer);
      htmxGetContainer.forEach(container => {
        htmx.trigger(container, triggerName);
      });
    });
  }

  if (window.Alpine) {
    window.Alpine.plugin(alpineHtmxPlugin);
  } else {
    document.addEventListener('alpine:init', () => {
      window.Alpine.plugin(alpineHtmxPlugin);
    });
  }
})();
