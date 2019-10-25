<template>
  <div class="header header-stages">
    <div class="header-title">
      <h3>Build Stages</h3>
    </div>

    <div id="stages" class="header-items">
      <Stage v-for="(stage,index) in stages" v-bind:key="index" v-bind:index="index" v-bind:level="stage.level" />
      <div class="stage stage-new"><button v-on:click="save">+ Stage</button></div>
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
      return this.$store.state.stages;
    }
  },
  methods: {
    save() {
      this.$store.commit("saveStage");
    }
  }
};
</script>
