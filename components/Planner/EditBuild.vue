<script>
import { createClient } from "@supabase/supabase-js"
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "EditBuild",
  props: {
    id: String,
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  data() {
    return {
      loading: false,
      saving: false,
      error: null,
      build_id: null,
      name: null,
      description: null,
    }
  },
  computed: {
    load_url() {
      return `/${this.build.id}`
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.error = null
      this.loading = true

      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY,
      )

      const { data, error } = await supabase
        .from("official_builds")
        .select()
        .eq("id", this.$route.params.id)

      if (error) {
        this.error = error
        this.loading = false

        return
      }

      this.loading = false

      this.build_id = data[0].id
      this.name = data[0].name
      this.description = data[0].description
    },
    async updateBuild(e) {
      this.saving = true

      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY,
      )

      const { error } = await supabase
        .from("official_builds")
        .update({ name: this.name, description: this.description })
        .eq("id", this.build_id)

      if (error) {
        this.store.addNotification({
          type: "error",
          message: `Error updating build: ${JSON.stringify(error)}`,
        })
      }

      this.$router.push({ path: `/builds/${this.build_id}` })

      this.saving = false
    },
  },
}
</script>

<template>
  <div>
    <div>
      <div>
        Edit Build
      </div>
      <div>
        <div v-if="!name">
          Loading...
        </div>
        <div v-if="name">
          <form @submit.prevent="updateBuild">
            <p>
              <label>Name<br><input
                v-model="name"
                type="text"
              ></label>
            </p>
            <p>
              <label>Description<br><textarea
                v-model="description"
                type="text"
                style="width: 100%; height: 40em; padding: 0px; font-size: inherit; color: inherit; background-color: inherit;"
              /></label>
            </p>
            <input
              type="submit"
              :value="saving ? 'Saving...' : 'Save'"
              :disabled="saving"
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
