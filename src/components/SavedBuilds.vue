<template>
  <div>
    <div class="build">
      <div class="build-header">
        <h3>Saved Builds</h3>
      </div>
      <div class="build-body">
        <p>
          <button v-on:click="deleteAll">Delete All</button>
        </p>
        <div v-if="noBuilds">
          <p>
            No saved builds. Use the Save button in the
            <router-link to="/">Planner</router-link>.
          </p>
        </div>
        <Build
          v-for="build in builds"
          v-bind:key="build.key"
          v-bind:build-key="build.key"
          v-bind:build-data="build.build"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Build from "./SavedBuild.vue";

export default {
  name: "SavedBuilds",
  components: {
    Build,
  },
  computed: {
    noBuilds() {
      return this.$store.state.ui.savedBuilds.length == 0;
    },
    builds() {
      return this.$store.state.ui.savedBuilds;
    },
  },
  methods: {
    deleteAll() {
      this.$store.commit("deleteAllBuilds");
    },
  },
};
</script>
