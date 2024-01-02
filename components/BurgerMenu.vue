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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line
          x1="4"
          x2="20"
          y1="12"
          y2="12"
        />
        <line
          x1="4"
          x2="20"
          y1="6"
          y2="6"
        />
        <line
          x1="4"
          x2="20"
          y1="18"
          y2="18"
        />
      </svg>
    </button>
    <div
      v-if="isVisible"
      class="absolute right-0 top-0 z-10 flex w-full flex-col items-end gap-1 bg-white p-2 text-lg dark:bg-black"
    >
      <button
        class="w-auto"
        @click="toggle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
      <NuxtLink
        to="/planner"
        @click="toggle"
      >
        Planner
      </NuxtLink>
      <NuxtLink
        to="/builds"
        @click="toggle"
      >
        Builds
      </NuxtLink>
      <NuxtLink
        to="/guides"
        @click="toggle"
      >
        Guides
      </NuxtLink>
      <NuxtLink
        v-if="!user"
        to="/login"
        @click="toggle"
      >
        <span v-tooltip="'Log In to Publish your builds for others to see and to favorite others\' builds.'">Log In</span>
      </NuxtLink>
      <NuxtLink
        v-if="user"
        to="/account"
        @click="toggle"
      >
        Account
      </NuxtLink>
    </div>
  </div>
</template>
