<script setup lang="ts">
import { useMainStore } from "~/stores/main"

const user = useSupabaseUser()
const store = useMainStore()

const doToggleDarkMode = async function () {
  const prefersDark = !!window.matchMedia?.("(prefers-color-scheme: dark)").matches
  store.toggleDarkMode(prefersDark)
}
</script>

<template>
  <header class="grid grid-cols-[auto_auto] items-center px-2 py-1">
    <div class="flex gap-4 items-baseline">
      <div class="flex items-baseline gap-1">
        <img class="self-center" src=" /img/icons/axe_shield.gif" width="24" height="24">
        <NuxtLink to="/" class="flex gap-1 my-title font-bold">
          ODACCP
        </NuxtLink>
        <span
          class="z-10 my-subtitle absolute top-8 left-10 opacity-0 transition-all duration-300 text-black text-xs dark:bg-inherit">The
          Overly-Detailed
          Asheron's
          Call Character
          Planner</span>
      </div>

      <NuxtLink to="/planner" class="hover:underline">
        Planner
      </NuxtLink>
      <NuxtLink to="/builds" class="hover:underline">
        Builds
      </NuxtLink>
      <NuxtLink to="/guides" class="hover:underline">
        Guides
      </NuxtLink>
    </div>
    <div class="flex gap-2 justify-self-end items-center px-2 py-1">
      <button @click="doToggleDarkMode">
        <svg v-if="store.darkMode" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-sun">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        <svg v-if="!store.darkMode" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-moon">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
      <NuxtLink to="irc://irc.sorcery.net/#treestats">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-hash">
          <line x1="4" x2="20" y1="9" y2="9" />
          <line x1="4" x2="20" y1="15" y2="15" />
          <line x1="10" x2="8" y1="3" y2="21" />
          <line x1="16" x2="14" y1="3" y2="21" />
        </svg>
      </NuxtLink>
      <NuxtLink to="https://discord.gg/r3jt93vYEb">
        <svg width="24" height="24" viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
          <g>
            <path
              d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
              fill="#5865F2" fill-rule="nonzero">

            </path>
          </g>
        </svg>
      </NuxtLink>
      <NuxtLink href="https://github.com/amoeba/accharplanner">
        <svg width="24.5" height="24" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            fill="currentColor" />
        </svg>
      </NuxtLink>
      <!-- Login / Account -->
      <NuxtLink v-if="!user" to="/login" class="hover:underline">
        <span v-tooltip="'Log In to Publish your builds for others to see and to favorite others\' builds.'">Log In</span>
      </NuxtLink>
      <NuxtLink v-if="user" to="/account">
        Account
      </NuxtLink>
    </div>
  </header>
</template>

<style>
.my-title:hover+.my-subtitle {
  opacity: 1;
  transform: translateY(6px);
}
</style>
