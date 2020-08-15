<template>
  <li class="builds-entry" v-bind:class="{loading: loading}">
    <span v-if="loading">Loading build...</span>
    <div v-if="error">Error: {{ error }}</div>
    <a v-if="build" :href="url">{{ build.name }}</a>
  </li>
</template>

<script>
import firebase from "../firebase";

export default {
  name: "Build",
  props: {
    id: String
  },
  data() {
    return {
      loading: false,
      error: null,
      build: null
    };
  },
  computed: {
    url() {
      return "/builds/" + this._props.id;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log("fetchData(build)");

      this.error = null;
      this.loading = true;

      const db = firebase.firestore();

      db.collection("pinned")
        .doc(this._props.id)
        .get()
        .then(doc => {
          this.loading = false;
          this.build = doc.data();
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style></style>
