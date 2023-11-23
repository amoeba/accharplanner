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
        <div ref="dropZoneRef" v-if="store.build.stages.length > 0" class="flex gap-2">
          <Stage class="stage" v-for="(stage, index) in store.build.stages" v-bind:key="index" v-bind:index="index"
            v-bind:level="stage.level" v-bind:data-index="index" v-bind:stages="store.build.stages.length"
            :draggable="true" v-on:dragstart="dragstart" v-on:dragover="dragover" :isDragInprogress="isDragging"
            v-on:drop="drop" />
        </div>
      </div>
    </template>
  </Pane>
</template>

<script setup lang="ts">
import pkg from "lodash"
const { isEqual } = pkg;

import Stage from "./Stage.vue";
import { usePlannerStore } from "~/stores/planner";

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
  e.preventDefault();

  const clientX = e.clientX;
  const index = Number(e.dataTransfer?.getData("text/plain"));

  // await update(index, clientX);
}

function drop(e: DragEvent) {
  const clientX = e.clientX;
  const index = Number(e.dataTransfer?.getData("text/plain"));
  console.log("drop", e, clientX, index);

  update(index, clientX);
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

  console.log("reordering...")

  store.reorderStages(indices);
}
</script>
