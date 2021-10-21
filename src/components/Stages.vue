<template>
  <div class="header header-stages">
    <div>
      <div class="header-title" v-on:click="toggle">
        <div>
          <h3>Build Stages</h3>
          </div>
        <div class="right">
          <button class="stage-new" v-on:click="save">+ Stage</button>
        </div>
      </div>
      <div v-if="visible"
           id="stages"
           class="header-items"
           v-bind:droppable="true"
           v-on:drop="drop"
           v-on:dragover="dragover">
        <div v-if="stages.length === 0">
          No stages have been set up for this build.
        </div>
        <Stage
          v-for="(stage, index) in stages"
          v-bind:key="index"
          v-bind:index="index"
          v-bind:level="stage.level"
          v-bind:data-index="index"
          v-bind:stages="stages.length"
          v-on:drag="drag"
          v-on:dragstart.native="dragStart"
          :draggable="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Stage from "./Stage";

export default {
  name: "Stages",
  components: {
    Stage
  },
  data() {
    return {
      isDragging: false
    }
  },
  computed: {
    stages() {
      return this.$store.state.build.stages;
    },
    visible() {
      return this.$store.getters.buildStagesPaneVisible;
    }
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
      console.log("dragStart");
      event.dataTransfer.setData("text/plain", event.target.dataset.index);
      this.isDragging = true;
    },
    drop(event) {
      this.isDragging = false;

      const droppedX = event.clientX;
      const index = Number(event.dataTransfer.getData("text/plain"));

      let newOrder = [
        {
          index: index,
          x: droppedX
        }
      ];

      document.querySelectorAll("div.stage").forEach((el, i) => {
        if (i === index) {
          return;
        }

        newOrder.push({
          index: i,
          x: el.getBoundingClientRect().x
        })
      });

      const sorted = _.orderBy(newOrder, x => {
        return x.x;
      });

      this.$store.dispatch("reorderStages", sorted);
    },
    drag(event) {
      console.log("drag", event);
    },
    dragover(event) {
      event.preventDefault();
    }
  }
};
</script>
