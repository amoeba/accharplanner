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
      No local builds. Use the <ButtonView class="inline-flex">
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
          <circle
            cx="18"
            cy="5"
            r="3"
          />
          <circle
            cx="6"
            cy="12"
            r="3"
          />
          <circle
            cx="18"
            cy="19"
            r="3"
          />
          <line
            x1="8.59"
            x2="15.42"
            y1="13.51"
            y2="17.49"
          />
          <line
            x1="15.41"
            x2="8.59"
            y1="6.51"
            y2="10.49"
          />
        </svg>
        Share
      </ButtonView> button in the
      <router-link to="/planner">
        Planner
      </router-link> and click <ButtonView class="inline-flex">
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
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
        Save to Browser
      </ButtonView>.
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
