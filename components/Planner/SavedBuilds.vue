<template>
  <div>
    <div class="main-pane">
      <div class="main-pane-header">
        <h3>Saved Builds</h3>
      </div>
      <div class="main-pane-body">
        <p>
          <button v-on:click="deleteAll">Delete All</button>
        </p>
        <div v-if="noBuilds">
          <p>
            No saved builds. Use the Save button in the
            <router-link to="/">Planner</router-link>.
          </p>
        </div>
        <Build v-for="build in builds" v-bind:key="build.key" v-bind:build-key="build.key"
          v-bind:build-data="build.build" />
      </div>
    </div>
  </div>
</template>

<script>
import Build from "./SavedBuild.vue";
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "SavedBuilds",
  components: {
    Build,
  },
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  computed: {
    noBuilds() {
      return this.store.ui.savedBuilds.length == 0;
    },
    builds() {
      return this.store.ui.savedBuilds;
    },
  },
  methods: {
    deleteAll() {
      this.store.deleteAllBuilds();
    },
  },
};
</script>
