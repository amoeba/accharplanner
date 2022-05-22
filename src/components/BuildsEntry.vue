<template>
  <li class="builds-entry" v-bind:class="{ loading: loading }">
    <span v-if="loading">Loading build...</span>
    <div v-if="error">Error: {{ error }}</div>
    <router-link v-if="build" :to="url">{{ build.name }}</router-link>
  </li>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { firebaseApp } from "../firebase";

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
    };
  },
  computed: {
    url() {
      return "/builds/" + this.id;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;

      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "pinned", this.id);

      getDoc(docRef)
        .then((snap) => {
          this.loading = false;
          this.build = snap.data();
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>
