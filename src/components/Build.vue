<template>
  <div>
    <div class="breadcrumb">
      <span>
        <router-link to="/builds">Back to Builds</router-link>
      </span>
    </div>
    <div class="main-pane">
      <div v-if="error">Error: {{ error }}</div>
      <div class="main-pane-header">
        <h3 v-if="loading">Loading build...</h3>
        <h3 v-if="build">{{ build.name }}</h3>
      </div>
      <div class="main-pane-body">
        <p v-if="loading">Loading build...</p>
        <p><router-link v-if="build" :to="url">Load in Planner</router-link></p>
        <p v-if="build" v-html="build.description"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { firebaseApp } from "../firebase";
import MD from "markdown-it";

export default {
  name: "Build",
  props: {
    id: String,
  },
  data() {
    return {
      loading: false,
      error: null,
      build: null,
      description: null,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    url() {
      return "/" + this.build.build_id;
    },
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;

      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "pinned", this.$route.params.id);

      getDoc(docRef)
        .then((snap) => {
          this.loading = false;
          this.build = snap.data();
          // I use the $ symbol for newlines because Firestore's web interface
          // doesn't support real newlines when I paste and I don't want to
          // implement an admin interface
          this.build.description = MD("default", {
            breaks: true,
            linkify: true,
          }).render(this.build.description.split("$").join("\n"));
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>
