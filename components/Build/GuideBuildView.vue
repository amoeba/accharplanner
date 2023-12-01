<script setup lang="ts">
import ReadOnlyAttributesAndVitals from "./ReadOnlyAttributesAndVitals.vue"
import ReadOnlyCreation from "./ReadOnlyCreation.vue"
import { loadBuild } from "~/utils/supabase"

const props = defineProps(["node"])
const client = useSupabaseClient()
const { data, error } = await loadBuild(client, props.node.attrs.id)

let build: Build

if (error) {
  // TODO
}
else {
  build = data[0].content
}
</script>

<template>
  <div>
    <ReadOnlyCreation
      v-if="node.attrs.selectedView === 'creation'" :build="build"
    />
    <ReadOnlyAttributesAndVitals
      v-if="node.attrs.selectedView === 'attributes_and_vitals'" :build="build"
    />
  </div>
</template>
