/**
 * alpine-async-data-plugin.js
 */

(function() {
  function alpineAsyncDataPlugin(Alpine) {
    Alpine.magic('asyncData', () => {
      return (name, query) => {
        if (typeof name === 'undefined' || !name) {
          console.error('Async data name is required.');
          return null;
        }
        if (typeof query !== 'function') {
          console.error('Async data query must be a function.');
          return null;
        }

        return {
          data: [],
          isLoading: false,
          isFetched: false,
          async fetch() {
            this[name].isLoading = true;
            const data = await query();
            this[name].data = data;
            this[name].isLoading = false;
            this[name].isFetched = true;
          }
        }
      };
    });
  }

  if (window.Alpine) {
    window.Alpine.plugin(alpineAsyncDataPlugin);
  } else {
    document.addEventListener('alpine:init', () => {
      window.Alpine.plugin(alpineAsyncDataPlugin);
    });
  }
})();
