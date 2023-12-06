<script setup lang="ts">
import { ComponentName } from "../Editor/lib"
import ReadOnlyAttributesAndVitals from "./ReadOnlyAttributesAndVitals.vue"
import ReadOnlyCreation from "./ReadOnlyCreation.vue"
import ReadOnlySkillsView from "./ReadOnlySkillsView.vue"

const props = defineProps(["node"])
const client = useSupabaseClient()
const { data, error } = await loadBuild(client, props.node.attrs.id)
const errorMessage = ref("")

let build: Build

if (error) { errorMessage.value = error.message }
else {
  if (data.length < 1)
    errorMessage.value = `Couldn't find build with ID ${props.node.attrs.id}.`

  else
    build = data[0].content
}
</script>

<template>
  <div>
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <ReadOnlyCreation
      v-if="build && props.node.attrs.view === ComponentName.Creation" :build="build"
    />
    <ReadOnlyAttributesAndVitals
      v-if="build && props.node.attrs.view === ComponentName.AttributesAndVitals" :build="build"
    />
    <ReadOnlySkillsView
      v-if="build && props.node.attrs.view === ComponentName.Skills" :build="build"
    />
  </div>
</template>
