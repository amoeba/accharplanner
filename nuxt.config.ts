// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", '@nuxtjs/supabase'],
  piniaPersistedstate: {
    storage: "localStorage",
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_KEY || '',
      supabaseRedirectUrl: process.env.SUPABASE_REDIRECT_URL || ''
    }
  }
});
