<template>
  <Pane :toggleExpanded="toggleExpanded" :isExpanded="store.ui.paneVisibility.buildStages">
    <template #title>Build Stages</template>
    <template #right>
      <Button class="px-1 py-1 text-xs" @click="save">Save Stage</Button>
    </template>
    <template #content>
      <div class="flex" v-bind:droppable="true" v-on:drop="drop" v-on:dragover="dragover">
        <div v-if="store.build.stages.length === 0">
          No stages have been set up for this build.
        </div>
        <Stage v-for="(stage, index) in store.build.stages" v-bind:key="index" v-bind:index="index"
          v-bind:level="stage.level" v-bind:data-index="index" v-bind:stages="store.build.stages.length"
          v-on:dragstart="dragStart" :draggable="true" :isDragInprogress="isDragging" />
      </div>
    </template>
  </Pane>
</template>

<script setup lang="ts">
import Stage from "./Stage.vue";
import { usePlannerStore } from "~/stores/planner";

const store = usePlannerStore();
const isDragging = ref(false)


const save = async function (event: MouseEvent) {
  event.stopPropagation();

  store.saveStage();
}

const toggleExpanded = async function () {
  store.toggleBuildStagesPane();
}

const dragStart = async function (event: DragEvent) {
  console.log("dragStart")

  if (!event || !event.dataTransfer || !event.target) {
    return;
  }

  if (event.target.dataset) {
    event.dataTransfer.setData("text/plain", event.target.dataset.index);
  }

  isDragging.value = true;
}

const processDrop = function (droppedX: Number, data: DataTransfer) {
  const index = Number(data.getData("text/plain"));

  console.log("drag", { droppedX: droppedX, index: index })

  // TODO: Finish me
  return;

  let stages = [
    {
      index: index,
      x: droppedX,
    },
  ];

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

  store.reorderStages(stages);
}
const drop = async function (event: DragEvent) {
  console.log("drag")

  isDragging.value = false;
  const droppedX = event.clientX;

  if (!event.dataTransfer) {
    return;
  }

  processDrop(droppedX, event.dataTransfer);
}

const dragover = async function (event: DragEvent) {
  event.preventDefault();
}
</script>
