<template>
  <li class="builds-entry" v-bind:class="{ loading: loading }">
    <span v-if="loading">Loading build...</span>
    <div v-if="error">Error: {{ error }}</div>
    <router-link v-if="build" :to="url">{{ build.name }}</router-link>
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
      return "/builds/" + this.id;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;

      const db = firebase.firestore();

      db.collection("pinned")
        .doc(this.id)
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
