<template>
  <div>
    <div class="build">
      <div class="build-header">
        <h3>Builds</h3>
      </div>
      <div class="build-body">
        <div v-if="loading">
          Grabbing the freshest, gimpiest builds. Hang on...
        </div>
        <div v-if="error">Error: {{ error }}</div>

        <ul v-if="builds">
          <BuildsEntry v-for="build in builds" :id="build.id" :key="build.id" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore/lite";
import firebaseApp from "../firebase";
import BuildsEntry from "./BuildsEntry.vue";

export default {
  name: "Builds",
  components: {
    BuildsEntry,
  },
  data() {
    return {
      loading: false,
      builds: [],
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;

      const db = getFirestore(firebaseApp);
      const pinnedRef = collection(db, "pinned");
      const q = query(pinnedRef, orderBy("name"));

      getDocs(q)
        .then((resp) => {
          this.loading = false;
          this.builds = resp.docs;
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>
