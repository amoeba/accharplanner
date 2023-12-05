<script setup lang="ts">
import { usePlannerStore } from "~/stores/planner"

const props = defineProps(["index", "level", "stages", "isDragInProgress"])

const store = usePlannerStore()

const isSelected = computed(() => {
  return (
    store.ui.currentStage !== null && store.ui.currentStage === props.index
  )
})

const isNotLast = computed(() => {
  return props.index !== props.stages - 1
})

const load = async function () {
  store.changeStage(props.index)
}

const remove = async function () {
  store.deleteStage(props.index)
}
</script>

<template>
  <div class="flex">
    <div
      class="flex border rounded divide-x p-0"
      :class="isSelected ? 'bg-blue-600 dark:bg-blue-600 border-blue-800 text-white' : 'bg-stone-300 border-zinc-200 text-black'"
    >
      <button
        :data-index="index"
        :class="{ selected: isSelected }"
        class="rounded-l px-3 hover:bg-blue-600 hover:text-white cursor-grab"
        @click="load"
      >
        Level {{ level }}
      </button>
      <button class="rounded-r hover:text-red-600" @click="remove">
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
          class="lucide lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
    <div class="flex flex-col justify-center">
      <div v-if="isNotLast" class="h-1 w-10 bg-zinc-200">
&nbsp;
      </div>
    </div>
  </div>
</template>
