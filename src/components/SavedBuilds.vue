<template>
  <div id="builds">
    <h2>Saved Builds</h2>
    <p>
      <button v-on:click="deleteAll">Delete All</button>
    </p>
    <div>
      <p>{{ noBuildsMessage }}</p>
    </div>
    <Build
      v-for="build in builds"
      v-bind:key="build.key"
      v-bind:build-key="build.key"
      v-bind:build-data="build.build"
    />
  </div>
</template>

<script>
import Build from "./SavedBuild";

export default {
  name: "SavedBuilds",
  components: {
    Build
  },
  computed: {
    noBuildsMessage() {
      if (this.$store.state.ui.savedBuilds.length == 0) {
        return "No saved builds. Use the Save button in the Planner.";
      }
    },
    builds() {
      return this.$store.state.ui.savedBuilds;
    }
  },
  methods: {
    deleteAll() {
      this.$store.commit("deleteAllBuilds");
    }
  }
};
</script>
