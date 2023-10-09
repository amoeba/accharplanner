<template>
  <div class="header header-stages">
    <div>
      <div class="header-title" v-on:click="toggle">
        <div>
          <h3>Build Stages</h3>
        </div>
        <div class="right">
          <button class="stage-new" v-on:click="save">Save Stage</button>
        </div>
      </div>
      <div v-if="visible" id="stages" class="header-items" v-bind:droppable="true" v-on:drop="drop"
        v-on:dragover="dragover">
        <div v-if="stages.length === 0">
          No stages have been set up for this build.
        </div>
        <Stage v-for="(stage, index) in stages" v-bind:key="index" v-bind:index="index" v-bind:level="stage.level"
          v-bind:data-index="index" v-bind:stages="stages.length" v-on:dragstart="dragStart" :draggable="true" />
      </div>
    </div>
  </div>
</template>

<script>
import Stage from "./Stage.vue";

export default {
  name: "Stages",
  components: {
    Stage,
  },
  data() {
    return {
      isDragging: false,
    };
  },
  computed: {
    stages() {
      return this.$store.state.build.stages;
    },
    visible() {
      return this.$store.getters.buildStagesPaneVisible;
    },
  },
  methods: {
    save(event) {
      event.stopPropagation();
      this.$store.commit("saveStage");
    },
    toggle() {
      this.$store.commit("toggleBuildStagesPane");
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

      this.$store.dispatch("reorderStages", stages);
    },
    dragover(event) {
      event.preventDefault();
    },
  },
};
</script>
