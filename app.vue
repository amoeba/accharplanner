<script setup lang="ts">
import { useMainStore } from "~/stores/main"

const store = useMainStore()

// For SSR compatibility: ensure dark mode is only applied on client after hydration
// This prevents hydration mismatches where the server renders with default state
// but the client has persisted state from localStorage
const isDarkMode = ref(false)

onMounted(() => {
  // After hydration is complete, sync with the store's persisted dark mode value
  isDarkMode.value = !!store.darkMode

  // Watch for future changes to dark mode
  watch(() => store.darkMode, (newValue) => {
    isDarkMode.value = !!newValue
  })
})
</script>

<template>
  <!-- We need to wrap our app in an extra div to implement dark mode because
       there's no way to apply the class further up in the DOM, like on the
      body or html tag. -->
  <div :class="isDarkMode ? 'dark' : ''">
    <div class="flex min-h-screen flex-col gap-4 bg-white text-black dark:bg-black dark:text-white">
      <AppHeader />
      <main
        class="flex w-full flex-col p-2"
      >
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
