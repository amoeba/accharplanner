<template>
  <Pane :toggleExpanded="toggleExpanded" :isExpanded="store.ui.paneVisibility.buildStages">
    <template #title>
      Build Stages
      <span class="px-2 text-zinc-400 font-normal"
        v-tooltip="'Stages are useful if your build has a progression based on level or experience and you want to see what the build loos like at each of those points.'">?</span>
    </template>
    <template #right>
    </template>
    <template #content>
      <div class="flex">
        <div v-if="store.build.stages.length === 0" class="flex gap-2">
          No stages have been set up for this build.
          <Button class="px-1 py-1 text-xs" @click="save">Save a stage</Button>
        </div>
        <div ref="dropZoneRef" v-if="store.build.stages.length > 0" class="flex gap-2"
          :class="isOverDropZone ? 'border border-red-200' : ''">
          <Stage class="stage" v-for="(stage, index) in store.build.stages" v-bind:key="index" v-bind:index="index"
            v-bind:level="stage.level" v-bind:data-index="index" v-bind:stages="store.build.stages.length"
            :draggable="true" v-on:dragstart="dragstart" v-on:dragover="dragover" :isDragInprogress="isDragging" />
          <Button class="px-1 py-1 text-xs" @click="save">+ Stage</Button>
          {{ isOverDropZone }}
        </div>
      </div>
    </template>
  </Pane>
</template>

<script setup lang="ts">
import Stage from "./Stage.vue";
import { usePlannerStore } from "~/stores/planner";
import { useDropZone } from '@vueuse/core'
import pkg from "lodash"
const { isEqual } = pkg;
import { useSortable } from '@vueuse/integrations/useSortable'

const store = usePlannerStore();

const save = async function (event: MouseEvent) {
  event.stopPropagation();

  store.saveStage();
}

const toggleExpanded = async function () {
  store.toggleBuildStagesPane();
}

// Drag and Drop
const isDragging = ref(false)

function onDrop(files: File[] | null) {
  // called when files are dropped on zone
  console.log("ondrop")
}

const dropZoneRef = ref<HTMLDivElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  // dataTypes: ['image/jpeg']
})

const dragstart = async function (e: DragEvent) {
  console.log("dragstart", e);

  if (!e.dataTransfer) {
    return;
  }

  if (!e.target || !e.target.dataset) {
    return;
  }

  e.dataTransfer.setData("text/plain", e.target.dataset.index);
  e.dataTransfer.dropEffect = "move";
}

const dragover = async function (e: DragEvent) {
  const clientX = e.clientX;
  const index = Number(e.dataTransfer?.getData("text/plain"));

  await update(index, clientX);
}

const update = async function (index: Number, clientX: Number) {
  console.log("update", index, clientX);

  let stages = [
    {
      index: index,
      x: clientX,
    },
  ];

  // TODO: Convert to a ref instead of document.querySelectorAll
  document.querySelectorAll("div.stage").forEach((el, i) => {
    if (i === index) {
      return;
    }

    stages.push({
      index: i,
      x: el.getBoundingClientRect().x,
    });
  });

  stages.sort((a, b) => {
    return a.x - b.x;
  });

  const indices = stages.map(s => s.index)

  // Don't re-order if no re-order happened. Do that by making sure
  // the indices are monotonically increasing
  if (valuesMatchIndicies(indices)) {
    return;
  }

  console.log("reofrdering...")

  store.reorderStages(indices);
}

const drop = async function (event: DragEvent) {
  console.log("drop")

  // isDragging.value = false;
  // const droppedX = event.clientX;

  // if (!event.dataTransfer) {
  //   return;
  // }

  // processDrop(droppedX, event.dataTransfer);
}
</script>
