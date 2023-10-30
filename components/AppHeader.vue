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
      <NuxtLink to="/planner" class="hover:underline">Planner</NuxtLink>
      <NuxtLink to="/builds" class="hover:underline">Builds</NuxtLink>
    </div>
    <div class="flex gap-2 justify-self-end items-center p-2">
      <button aria-label="Toggle theme between dark and light" class="theme-toggle" @click="toggleDarkMode"></button>
      <NuxtLink href="https://github.com/amoeba/accharplanner">
        <svg width="24.5" height="24" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            fill="#24292f" />
        </svg>
      </NuxtLink>
      <!-- Login / Account -->
      <NuxtLink v-if="!user" to="/login" class="hover:underline">
        <span v-tooltip="'Log In to Publish your builds for others to see and to favorite others\' builds.'">Log In</span>
      </NuxtLink>
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
