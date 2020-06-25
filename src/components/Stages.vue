<template>
  <div class="header header-stages">
    <div>
      <div class="header-title" v-on:click="toggle">
        <h3>Build Stages</h3>
      </div>
      <div v-if="visible" id="stages" class="header-items">
        <Stage
          v-for="(stage, index) in stages"
          v-bind:key="index"
          v-bind:index="index"
          v-bind:level="stage.level"
        />
        <button class="stage stage-new" v-on:click="save">+ Stage</button>
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
  computed: {
    stages() {
      return this.$store.state.build.stages;
    },
    visible() {
      return this.$store.getters.buildStagesPaneVisible;
    }
  },
  methods: {
    save() {
      this.$store.commit("saveStage");
    },
    toggle() {
      this.$store.commit("toggleBuildStagesPane");
    }
  }
};
</script>
