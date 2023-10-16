<template>
  <Pane>
    <template #title>Build Stages</template>
    <template #right>
      <Button @click="save">Save Stage</Button>
    </template>
    <template #content>
      <div v-bind:droppable="true" v-on:drop="drop" v-on:dragover="dragover">
        <div v-if="stages.length === 0">
          No stages have been set up for this build.
        </div>
        <Stage v-for="(stage, index) in stages" v-bind:key="index" v-bind:index="index" v-bind:level="stage.level"
          v-bind:data-index="index" v-bind:stages="stages.length" v-on:dragstart="dragStart" :draggable="true" />
      </div>
    </template>
  </Pane>
</template>

<script>
import Stage from "./Stage.vue";
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Stages",
  components: {
    Stage,
  },
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  data() {
    return {
      isDragging: false,
    };
  },
  computed: {
    stages() {
      return this.store.build.stages;
    },
    visible() {
      return this.store.buildStagesPaneVisible;
    },
  },
  methods: {
    save(event) {
      event.stopPropagation();
      this.store.saveStage();
    },
    toggle() {
      this.store.toggleBuildStagesPane();
    },
    dragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.dataset.index);
      this.isDragging = true;
    },
    drop(event) {
      this.isDragging = false;

      const droppedX = event.clientX;
      const index = Number(event.dataTransfer.getData("text/plain"));

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

      this.store.reorderStages(stages);
    },
    dragover(event) {
      event.preventDefault();
    },
  },
};
</script>
