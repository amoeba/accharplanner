<script>
import Stages from "~/components/Planner/Stages.vue"
import Headers from "~/components/Planner/Headers.vue"
import AttributesAndVitals from "~/components/Planner/AttributesAndVitals.vue"
import Skills from "~/components/Planner/Skills.vue"
import Augmentations from "~/components/Planner/Augmentations.vue"
import LuminanceAuras from "~/components/Planner/LuminanceAuras.vue"
import Items from "~/components/Planner/Items.vue"
import ArmorSets from "~/components/Planner/ArmorSets.vue"

import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Planner",
  components: {
    Stages,
    Headers,
    AttributesAndVitals,
    Skills,
  },
  setup() {
    const store = usePlannerStore()

    // Copy current build into the current stage, if present
    // TODO: See if this could be moved into the store definition
    //       or somewhere not tied to any one component
    watch(
      () => store.build.character,
      () => {
        // Skip if no selected stage
        if (store.ui.currentStage === null)
          return

        // Skip if selected stage is invalid for some reason
        if (store.ui.currentStage > store.build.stages.length)
          return

        store.build.stages[store.ui.currentStage] = JSON.parse(
          JSON.stringify(store.build.character),
        )
      },
      { deep: true },
    )

    return { store }
  },
  methods: {
    resetPlanner() {
      this.store.reset()
    },
    expandAll() {
      this.store.expandAll()
    },
    collapseAll() {
      this.store.collapseAll()
    },
  },
}
</script>

<template>
  <div class="flex flex-col gap-2 relative text-sm">
    <Headers />
    <Stages />
    <AttributesAndVitals />
    <Skills />
  </div>
</template>
