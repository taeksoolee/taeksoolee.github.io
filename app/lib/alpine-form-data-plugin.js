/**
 * alpine-async-data-plugin.js
 */

(function() {
  function alpineFormDataPlugin(Alpine) {
    Alpine.magic('formData', () => {
      return (fields) => {
        if (!Array.isArray(fields)) {
          console.error('Form fields must be an array.');
          return null;
        } else {
          fields.forEach(field => {
            if (typeof field !== 'string') {
              console.error('Each form field must have a name.');
              return null;
            }
          });
        }
  
        return {
          data: fields.reduce((acc, field) => {
            acc[field] = '';
            return acc;
          }, {}),
        }
      }
    });
  }

  if (window.Alpine) {
    window.Alpine.plugin(alpineFormDataPlugin);
  } else {
    document.addEventListener('alpine:init', () => {
      window.Alpine.plugin(alpineFormDataPlugin);
    });
  }

})();