<script setup lang="ts">
import { computed } from "vue"
import { useMainStore } from "./stores/main";

const store = useMainStore()

import "~/assets/css/main.css";

const theme = computed(() => {
  if (store.$state.darkMode === null) {
    return "";
  }

  return store.$state.darkMode ? THEME.DARK : THEME.LIGHT;
});
</script>

<template>
  <div id="app" :class="theme">
    <AppHeader />
    <main class="max-w-4xl mx-auto p-2">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
