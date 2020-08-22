<template>
  <div id="builds">
    <h2>Builds</h2>
    <div v-if="loading">Grabbing the freshest, gimpiest builds. Hang on...</div>
    <div v-if="error">Error: {{ error }}</div>

    <ul v-if="builds">
      <BuildsEntry v-for="build in builds" :id="build.id" :key="build.id" />
    </ul>
  </div>
</template>

<script>
import firebase from "../firebase";
import Build from "./Build";
import BuildsEntry from "./BuildsEntry";

export default {
  name: "Builds",
  components: {
    BuildsEntry
  },
  data() {
    return {
      loading: false,
      builds: [],
      error: null
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;

      const db = firebase.firestore();

      db.collection("pinned")
        .orderBy("name")
        .get()
        .then(x => {
          this.loading = false;
          this.builds = x.docs;
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style></style>
