<script setup lang="ts">
import { computed } from "vue"
import { useMainStore } from "./stores/main";

const store = useMainStore()

const theme = computed(() => {
  if (store.$state.darkMode === null) {
    return "";
  }

  return store.$state.darkMode ? THEME.DARK : THEME.LIGHT;
});
</script>

<template>
  <div>
    <AppHeader />
    <main class="w-full lg:max-w-5xl mx-auto px-2 py-1">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
