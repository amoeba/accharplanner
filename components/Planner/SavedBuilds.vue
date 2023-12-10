<script>
import Build from './SavedBuild.vue'
import { usePlannerStore } from '~/stores/planner'

export default {
  name: 'SavedBuilds',
  components: {
    Build,
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  computed: {
    noBuilds() {
      return this.store.ui.savedBuilds.length === 0
    },
    builds() {
      return this.store.ui.savedBuilds
    },
  },
  methods: {
    deleteAll() {
      this.store.deleteAllBuilds()
    },
  },
}
</script>

<template>
  <div>
    <div>
      <div>
        <h3>Saved Builds</h3>
      </div>
      <div>
        <p>
          <ButtonView @click="deleteAll">
            Delete All
          </ButtonView>
        </p>
        <div v-if="noBuilds">
          <p>
            No saved builds. Use the Save button in the
            <router-link to="/">
              Planner
            </router-link>.
          </p>
        </div>
        <Build
          v-for="build in builds"
          :key="build.key"
          :build-key="build.key"
          :build-data="build.build"
        />
      </div>
    </div>
  </div>
</template>
