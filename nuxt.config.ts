// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", '@nuxtjs/supabase'],
  piniaPersistedstate: {
    storage: "localStorage",
  },
  supabase: {
    redirect: false
  },
});
