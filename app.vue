<script setup lang="ts">
import { useMainStore } from "~/stores/main"

const store = useMainStore()

useSeoMeta({
  title: 'The Overly-Detailed Asheron\'s Call Character Planner',
  ogTitle: 'The Overly-Detailed Asheron\'s Call Character Planner',
  description: 'The most advanced character planner for Asheron\'s Call',
  ogDescription: 'The most advanced character planner for Asheron\'s Call',
  // ogImage: 'https://example.com/image.png', // TODO
  // twitterCard: 'summary_large_image',// TODO
})
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
