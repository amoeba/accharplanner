// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-13',
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/supabase",
    '@nuxt/eslint',
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "floating-vue/nuxt",
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_SITE_ENV ? "https://planner.treestats.net" : "http://localhost:3000"
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  supabase: {
    redirect: false,
  },
})
