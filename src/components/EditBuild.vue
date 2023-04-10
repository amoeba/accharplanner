<template>
  <div>
    <div class="main-pane">
      <div class="main-pane-header">
        Edit Build
      </div>
      <div class="main-pane-body">
        <div v-if="!name">
          Loading...
        </div>
        <div v-if="name">
          <form @submit.prevent="updateBuild">
            <p><label>Name<br><input type="text" v-model="name" /></label></p>
            <p><label>Description<br><textarea type="text" v-model="description"
                  style="width: 100%; height: 40em; padding: 0px; font-size: inherit; color: inherit; background-color: inherit;"></textarea></label>
            </p>
            <input type="submit" :value="saving ? 'Saving...' : 'Save'" :disabled="saving" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

export default {
  name: "EditBuild",
  props: {
    id: String,
  },
  data() {
    return {
      loading: false,
      saving: false,
      error: null,
      build_id: null,
      name: null,
      description: null,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    load_url() {
      return "/" + this.build.id;
    },
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

      this.build_id = data[0].id;
      this.name = data[0].name;
      this.description = data[0].description;
    },
    async updateBuild(e) {
      this.saving = true;

      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY
      );

      const { error } = await supabase
        .from('official_builds')
        .update({ name: this.name, description: this.description })
        .eq('id', this.build_id);

      if (error) {
        this.$store.commit("addNotification", {
          type: "error",
          message: "Error updating build: " + JSON.stringify(error),
        });
      }

      this.$router.push({ path: `/builds/${this.build_id}` })

      this.saving = false;
    }
  },
};
</script>
