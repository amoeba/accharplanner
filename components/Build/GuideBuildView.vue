<script setup lang="ts">
import { ComponentName } from "../Editor/lib"
import ReadOnlyAttributesAndVitals from "./ReadOnlyAttributesAndVitals.vue"
import ReadOnlyCreation from "./ReadOnlyCreation.vue"
import ReadOnlySkillsView from "./ReadOnlySkillsView.vue"
import MinimalPlanner from "~/components/Guide/MinimalPlanner.vue"

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
      v-if="node.attrs.selectedView === ComponentName.Creation" :build="build"
    />
    <ReadOnlyAttributesAndVitals
      v-if="node.attrs.selectedView === ComponentName.AttributesAndVitals" :build="build"
    />
    <ReadOnlySkillsView
      v-if="node.attrs.selectedView === ComponentName.Skills" :build="build"
    />
    <MinimalPlanner
      v-if="node.attrs.selectedView === ComponentName.Planner" :build="build"
    />
  </div>
</template>
