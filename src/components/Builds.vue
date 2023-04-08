<template>
  <div>
    <div class="main-pane">
      <div class="main-pane-header">
        <h3>Builds</h3>
      </div>
      <div class="main-pane-body">
        <div v-if="loading">
          Grabbing the freshest, gimpiest builds. Hang on...
        </div>
        <div v-if="error">
          Failed to fetch latest, gimpiest builds. An error report has
          automatically been sent to the developer.
        </div>
        <div v-if="builds.length === 0">
          No builds to display.
        </div>
        <ul v-if="builds">
          <BuildsEntry v-for="build in builds" :id="build.id" :key="build.id" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

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
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.error = null;
      this.loading = true;

      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY
      );

      const { data, error } = await supabase
        .from("official_builds")
        .select();

      if (error) {
        this.error = true;
        this.loading = false;
      }

      this.loading = false;
      this.builds = data;
    },
  },
};
</script>
