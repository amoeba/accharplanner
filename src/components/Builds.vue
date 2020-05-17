<template>
  <div id="builds">
    <h2>Saved Builds</h2>
    <div>
      <button v-on:click="deleteAll">Delete All</button>
    </div>
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
import Build from "./Build";

export default {
  name: "Builds",
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

<style>
#builds {
  padding: 0.5rem;
}

#builds h2 {
  margin: 0 0 0.5rem 0;
}
</style>
