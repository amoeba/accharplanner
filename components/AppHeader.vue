<script setup lang="ts">
const user = useSupabaseUser()

import { useMainStore } from '~/stores/main';

const store = useMainStore()

function toggleDarkMode(event: Event) {
  const preference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  store.toggleDarkMode(preference);
}
</script>

<template>
  <header class="grid grid-cols-2 items-center p-2">
    <div class="flex gap-4 items-baseline">
      <NuxtLink to="/" class="my-title font-bold"><span class="text-3xl font-bold text-green-400">▲</span> ODACCP
      </NuxtLink>
      <span class="my-subtitle absolute top-10 left-10 opacity-0 transition-all duration-300 text-xs">The
        Overly-Detailed
        Asheron's
        Call Character
        Planner</span>
      <NuxtLink to="/planner">Planner</NuxtLink>
      <NuxtLink to="/builds">Builds</NuxtLink>
    </div>
    <div class="flex gap-2 justify-self-end items-center p-2">
      <button aria-label="Toggle theme between dark and light" class="theme-toggle" @click="toggleDarkMode"></button>
      <NuxtLink href="https://github.com/amoeba/accharplanner">G</NuxtLink>
      <!-- Login / Account -->
      <NuxtLink v-if="!user" to="/login">Log In</NuxtLink>
      <NuxtLink v-if="user" to="/account">Account</NuxtLink>
    </div>
  </header>
</template>

<style>
.my-title:hover+.my-subtitle {
  opacity: 1;
  transform: translateY(6px);
}
</style>
