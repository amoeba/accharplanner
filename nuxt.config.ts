// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", '@pinia-plugin-persistedstate/nuxt', '@nuxtjs/supabase', 'floating-vue/nuxt', '@nuxtjs/google-fonts'],
  runtimeConfig: {
    public: {
      baseUrl: 'https://planner.treestats.net'
    }
  },
  googleFonts: {
    families: {
      'League+Spartan': true,
      Roboto: true,
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  supabase: {
    redirect: false
  },
});
