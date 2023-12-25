// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/supabase",
    "floating-vue/nuxt",
    "@vueuse/nuxt",
    '@nuxtjs/eslint-module',
    'nuxt-og-image'
  ],
  runtimeConfig: {
    public: {
      baseUrl: "https://planner.treestats.net",
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
