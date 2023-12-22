<script setup lang="ts">
const user = useSupabaseUser()

const isVisible = ref(false)

const toggle = async function () {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="flex">
    <button @click="toggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </button>
    <div v-if="isVisible"
      class="absolute z-10 top-0 right-0 w-full flex flex-col items-end gap-1 p-2 bg-white dark:bg-black text-lg">
      <button class="w-auto" @click="toggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
      <NuxtLink @click="toggle" to="/planner">
        Planner
      </NuxtLink>
      <NuxtLink @click="toggle" to="/builds">
        Builds
      </NuxtLink>
      <NuxtLink @click="toggle" to="/guides">
        Guides
      </NuxtLink>
      <NuxtLink @click="toggle" v-if="!user" to="/login" class="hidden sm:block">
        <span v-tooltip="'Log In to Publish your builds for others to see and to favorite others\' builds.'">Log In</span>
      </NuxtLink>
      <NuxtLink @click="toggle" v-if="user" class="hidden sm:block" to="/account">
        Account
      </NuxtLink>
    </div>
  </div>
</template>
