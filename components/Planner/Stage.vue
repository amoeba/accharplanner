<template>
  <div class="flex">
    <div class="flex border border-zinc-200 rounded divide-x p-0"
      :class="isSelected ? 'bg-black text-white' : 'bg-transparent'">
      <button v-bind:class="{ selected: isSelected }" class="rounded-l px-3 hover:bg-black hover:text-white cursor-grab"
        v-on:click="load">
        Level {{ level }}
      </button>
      <button class="rounded-r bg-black text-white hover:bg-red-600" @click="remove">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
    <div class="flex flex-col justify-center">
      <div v-if="isNotLast" class="h-1 w-10 bg-zinc-200">&nbsp;</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlannerStore } from "~/stores/planner";
import { useDraggable } from '@vueuse/core'

const store = usePlannerStore();

const props = defineProps(['index', 'level', 'stages', 'isDragInProgress'])

const isSelected = computed(() => {
  return store.ui.currentStage !== null && store.ui.currentStage === props.index;
});

const isNotLast = computed(() => { return props.index !== props.stages - 1 });

const load = async function () {
  console.log("Load index " + props.index)
  store.changeStage(props.index);
}

const remove = async function () {
  console.log("remove", props.index); return;
  store.deleteStage(props.index);
}
</script>
