<script setup lang="ts">
import { usePlannerStore } from "~/stores/planner"

const store = usePlannerStore()
const builds = computed(() => { return store.ui.savedBuilds })

const clear = async function () {
  store.deleteAllBuilds()
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <p
      v-if="builds.length <= 0"
      class="p-2"
    >
      No local builds. Save one from the
      <NuxtLink to="/">
        <span>Planner</span>
      </NuxtLink>.
    </p>
    <div
      v-if="builds && builds.length > 0"
      class="bg-zinc-200 p-2 dark:bg-stone-800"
    >
      <ButtonView @click="clear">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line
            x1="10"
            x2="10"
            y1="11"
            y2="17"
          />
          <line
            x1="14"
            x2="14"
            y1="11"
            y2="17"
          />
        </svg>
        Delete All
      </ButtonView>
    </div>
    <div
      v-if="builds && builds.length > 0"
      class="flex flex-col gap-2 p-2"
    >
      <LocalBuildListItem
        v-for="build in builds"
        :key="build.key"
        :build="build"
      />
    </div>
  </div>
</template>
