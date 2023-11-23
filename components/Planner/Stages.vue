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
      <div class="flex gap-2 w-full">
        <div v-if="store.build.stages.length === 0">
          No stages have been set up for this build.
        </div>
        <Stage class=" stage" v-for="(stage, index) in store.build.stages" v-bind:key="index" v-bind:index="index"
          v-bind:level="stage.level" v-bind:data-index="index" v-bind:stages="store.build.stages.length" :draggable="true"
          v-on:dragstart="dragstart" v-on:dragover="dragover" v-on:drop="drop" />
        <Button class="px-1 py-1 text-xs" @click="save">+ Stage</Button>
      </div>
    </template>
  </Pane>
</template>

<script setup lang="ts">
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
const dragstart = async function (e: DragEvent) {
  console.log("dragstart", e);

  if (!e.dataTransfer) {
    return;
  }

  if (!e.target || !e.target.dataset) {
    return;
  }

  console.log("clientX is ", e.target);
  e.dataTransfer.setData("text/plain", e.target.dataset.index);
  e.dataTransfer.dropEffect = "move";
}

const dragover = async function (e: DragEvent) {
  // Critical to keep this in
  e.preventDefault();
}

function drop(e: DragEvent) {
  // Adjust client X by half the drag target's width. This makes
  // drag and drop match the user's expectation more closely
  const adjustedClientX = e.clientX - e.originalTarget.clientWidth / 2;
  const index = Number(e.dataTransfer?.getData("text/plain"));

  update(index, adjustedClientX);
}


const update = async function (index: Number, clientX: Number) {
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

  store.reorderStages(indices);
}
</script>
