<script setup lang="ts">
import { useMainStore } from "~/stores/main"

const store = useMainStore()
</script>

<template>
  <!-- We need to wrap our app in an extra div to implement dark mode because
       there's no way to apply the class further up in the DOM, like on the
      body or html tag. -->
  <div :class="store.darkMode ? 'dark' : ''">
    <div class="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <AppHeader />
      <main class="mx-auto w-full px-2 py-1 lg:max-w-5xl">
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
