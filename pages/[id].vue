<script setup lang="ts">
import { useRoute } from 'vue-router';

const client = useSupabaseClient()
const route = useRoute();

const loadError = ref("")

// TODO: Load build
const { data, error } = await loadBuild(client, route.params.id)
console.log(data, error)
if (error) {
  loadError.value = error.message
} else if (data) {
  if (data.length < 1) {
    loadError.value = `Couldn't find build with ID ${route.params.id}.`
  }
}
</script>

<template>
  <div>
    <div v-if="loadError.length > 0">
      {{ loadError }}
    </div>
    <div v-if="data && data.length > 0">
      TODO: Load build button
      TODO: Favorite button
      <BuildView :build="data[0]" />
    </div>
  </div>
</template>
