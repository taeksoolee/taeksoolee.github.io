/**
 * alpine-supabase-plugin.js
 */

(function() {
  function alpineSupabasePlugin(Alpine) {
    if (!window.supabase) {
      console.error('Supabase script is not loaded.');
      return null;
    }

    if (!window.SUPABASE_OPTIONS) {
      console.error('SUPABASE_OPTIONS is not defined.');
      return null;
    } else {
      if (!window.SUPABASE_OPTIONS.supabaseUrl) {
        console.error('SUPABASE_OPTIONS.supabaseUrl is not defined.');
        return null;
      } else if (!window.SUPABASE_OPTIONS.supabaseKey) {
        console.error('SUPABASE_OPTIONS.supabaseKey is not defined.');
        return null;
      }
    }

    const { supabaseKey, supabaseUrl } = window.SUPABASE_OPTIONS;
    const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
    Alpine.magic('supabase', () => {
      return supabaseClient;
    });

    Alpine.store('supabaseAuth', {
      user: null,
      isAuthenticated: false,
      isLoading: false,

      _onLogined(user) {
        this.user = user;
        this.isAuthenticated = true;
      },
      _onLogouted() {
        this.user = null;
        this.isAuthenticated = false;
      },

      async checkAuth() {
        this.isLoading = true;
        const response = await supabaseClient.auth.getUser();
        this.isLoading = false;

        const isSuccess = !response.error;

        if (isSuccess) {
          this._onLogined(response.data.user);
        }

        return isSuccess;
      },
      async login(email, password) {
        this.isLoading = true;
        const response = await supabaseClient.auth.signInWithPassword({
          email, password,
        });
        this.isLoading = false;

        const isSuccess = !response.error;

        if (isSuccess) {
          this._onLogined(response.data.user);
        }
        
        return response;
      },
      async logout() {
        this.isLoading = true;
        await supabaseClient.auth.signOut();
        this.isLoading = false;

        this._onLogouted();
      }
    });
  }

  if (window.Alpine) {
    window.Alpine.plugin(alpineSupabasePlugin);
  } else {
    document.addEventListener('alpine:init', () => {
      window.Alpine.plugin(alpineSupabasePlugin);
    });
  }
})();
