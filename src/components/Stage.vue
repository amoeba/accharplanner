<template>
  <div class="stage">
    <button class="stage-level" v-on:click="load">{{level}}</button>
    <button class="stage-delete" v-on:click="remove">X</button>
    <div class="stage-line" />
  </div>
</template>

<script>
export default {
  name: "Stage",
  props: {
    index: Number,
    level: Number
  },
  methods: {
    load() {
      this.$store.commit("changeStage", this._props.index);
    },
    remove() {
      this.$store.commit("deleteStage", this._props.index);
    }
  }
};
</script>
