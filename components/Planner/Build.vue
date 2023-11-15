<template>
  <div>
    <div>
      <span>
        <router-link to="/builds">Back to Builds</router-link>
      </span>
    </div>
    <div>
      <div v-if="error">Error: {{ error }}</div>
      <div>
        <h3 v-if="loading">Loading build...</h3>
        <h3 v-if="build">{{ build.name }}</h3>
      </div>
      <div v-if="loading">
        <p v-if="loading">Loading build...</p>
      </div>
      <div v-if="!loading">
        <p><button><router-link v-if="build" :to="url">Load in Planner</router-link></button></p>
        <p v-if="build" v-html="build.description"></p>

        <!-- Editing Controls -->
        <p v-if="isAdmin"><router-link :to="edit_url">Edit Build</router-link></p>
        <p v-if="isAdmin"><button @click="deleteBuild">Delete Build</button></p>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";
import MD from "markdown-it";
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Build",
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
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
      return "/" + this.$route.params.id;
    },
    edit_url() {
      return "/builds/" + this.$route.params.id + "/edit";
    },
    isAdmin() {
      return this.store.isAdmin;
    }
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
        .eq("id", this.$route.params.id);

      if (error) {
        this.error = error;
        this.loading = false;
        return;
      }

      this.loading = false;
      this.build = data[0];

      this.build.description = MD("default", {
        breaks: true,
        linkify: true,
      }).render(this.build.description);
    },
    async deleteBuild(e) {
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY
      );

      const { error } = await supabase
        .from('official_builds')
        .delete()
        .eq("id", this.$route.params.id);

      if (error) {
        this.store.addNotification({
          type: "error",
          message: "Error deleting build: " + JSON.stringify(error),
        });
      } else {
        this.store.addNotification({
          type: "success",
          message: "Build deleted.",
        });

        this.$router.push("/builds");
      }
    }
  },
};
</script>
