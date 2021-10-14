<template>
  <div class="stage">
    <button
      v-bind:class="{ selected: isSelected }"
      class="stage-level"
      v-on:click="load"
    >
      {{ level }}
    </button>
    <button class="stage-delete" v-on:click="remove">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </button>
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
  computed: {
    isSelected() {
      return (
        this.$store.state.ui.currentStage !== null &&
        this.$store.state.ui.currentStage === this.index
      );
    }
  },
  methods: {
    load() {
      this.$store.commit("changeStage", this.index);
    },
    remove() {
      this.$store.commit("deleteStage", this.index);
    }
  }
};
</script>
