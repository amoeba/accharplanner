// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/supabase",
    "floating-vue/nuxt",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    '@nuxtjs/eslint-module',
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
