<template>
  <li class="builds-entry" v-bind:class="{ loading: loading }">
    <span v-if="loading">Loading build...</span>
    <div v-if="error">Error: {{ error }}</div>
    <router-link v-if="build" :to="url">{{ build.name }}</router-link>
  </li>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

export default {
  name: "BuildsEntry",
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
    async fetchData() {
      this.error = null;
      this.loading = true;

      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY
      );

      const { data, error } = await supabase
        .from("official_builds")
        .select()
        .eq("id", this.id);

      if (error) {
        this.error = error;
        this.loading = false;
        return;
      }

      this.loading = false;
      this.build = data[0];
    },
  },
};
</script>
