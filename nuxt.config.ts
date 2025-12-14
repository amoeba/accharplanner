// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-12-13',
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/supabase",
    '@nuxt/eslint',
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
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
