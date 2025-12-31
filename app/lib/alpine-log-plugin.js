/**
 * alpine-log-plugin.js
 */

(function() {
  function alpineLogPlugin(Alpine) {
    const prefix = () => {
      return '[' + new Date().toISOString() + ']';
    }

    const info = (...args) => {
      console.log(prefix(), ...args);
    }

    const error = (...args) => {
      console.log(prefix(), ...args);
    }
    
    Alpine.magic('log', () => {
      return {
        info, error,
      };
    });
  }

  if (window.Alpine) {
    window.Alpine.plugin(alpineLogPlugin);
  } else {
    document.addEventListener('alpine:init', () => {
      window.Alpine.plugin(alpineLogPlugin);
    });
  }
})();
