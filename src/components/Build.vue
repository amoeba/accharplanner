<template>
  <div>
    <div class="breadcrumb">
      <span>
        <a href="/builds">Back to Builds</a>
      </span>
    </div>
    <div class="build">
      <div v-if="error">Error: {{ error }}</div>
      <div class="build-header">
        <h3 v-if="loading">Loading build...</h3>
        <h3 v-if="build">{{ build.name }}</h3>
      </div>
      <div class="build-body">
        <p v-if="loading">Loading build...</p>
        <a v-if="build" :href="url">Load in Planner</a>
        <p v-if="build" v-html="build.description"></p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import MD from "markdown-it";

export default {
  name: "Build",
  props: {
    id: String
  },
  data() {
    return {
      loading: false,
      error: null,
      build: null,
      description: null
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  computed: {
    url() {
      return "/" + this.build.build_id;
    }
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;

      const db = firebase.firestore();

      db.collection("pinned")
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          this.loading = false;
          this.build = doc.data();
          // I use the $ symbol for newlines because Firestore's web interface
          // doesn't support real newlines when I paste and I don't want to
          // implement an admin interface
          this.build.description = MD("default", {
            breaks: true,
            linkify: true
          }).render(this.build.description.split("$").join("\n"));
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style></style>
