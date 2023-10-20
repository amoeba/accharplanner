// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", '@nuxtjs/supabase'],
  runtimeConfig: {
    public: {
      baseUrl: 'https://planner.treestats.net'
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
  supabase: {
    redirect: false
  },
});
