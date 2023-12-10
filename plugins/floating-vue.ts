import FloatingVue from 'floating-vue'
import { defineNuxtPlugin } from '#app'
import 'floating-vue/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  // @TODO cutomization
  nuxtApp.vueApp.use(FloatingVue)
})
