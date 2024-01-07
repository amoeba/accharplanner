<script setup lang="ts">
import { useMainStore } from "~/stores/main"

const store = useMainStore()
</script>

<template>
  <!-- We need to wrap our app in an extra div to implement dark mode because
       there's no way to apply the class further up in the DOM, like on the
      body or html tag. -->
  <div :class="store.darkMode ? 'dark' : ''">
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
