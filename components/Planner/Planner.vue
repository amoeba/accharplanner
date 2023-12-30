<script>
import Stages from "./Stages.vue"
import Headers from "./Headers.vue"
import AttributesAndVitals from "./AttributesAndVitals.vue"
import Skills from "./Skills.vue"
import Augmentations from "./Augmentations.vue"
import LuminanceAuras from "./LuminanceAuras.vue"
import Items from "./Items.vue"
import ArmorSets from "./ArmorSets.vue"

import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Planner",
  components: {
    Stages,
    Headers,
    AttributesAndVitals,
    Skills,
    Augmentations,
    LuminanceAuras,
    Items,
    ArmorSets,
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
        if (store.ui.currentStage === null) {
          return
        }

        // Skip if selected stage is invalid for some reason
        if (store.ui.currentStage > store.build.stages.length) {
          return
        }

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
  <div class="relative flex flex-col gap-2 text-sm">
    <div class="flex">
      <!-- Collapse/Expand -->
      <div class="flex">
        <div class="flex gap-2">
          <ButtonView
            tooltip="Expand All Panels"
            @click="expandAll"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m7 15 5 5 5-5" />
              <path d="m7 9 5-5 5 5" />
            </svg>
          </ButtonView>
          <ButtonView
            tooltip="Collapse All Panels"
            @click="collapseAll"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m7 20 5-5 5 5" />
              <path d="m7 4 5 5 5-5" />
            </svg>
          </ButtonView>
        </div>
      </div>
      <!-- Desktop Planner Controls -->
      <div class="flex grow justify-end gap-x-1">
        <ButtonView @click="resetPlanner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span class="hidden sm:block">Reset</span>
        </ButtonView>
        <ButtonWithPopout width-class="w-72">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
          </template>
          <template #title>
            <span class="hidden sm:block">Save</span>
          </template>
          <template #content>
            <PlannerPopoutsPlannerSave />
          </template>
        </ButtonWithPopout>
        <ButtonWithPopout width-class="w-72">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle
                cx="18"
                cy="5"
                r="3"
              />
              <circle
                cx="6"
                cy="12"
                r="3"
              />
              <circle
                cx="18"
                cy="19"
                r="3"
              />
              <line
                x1="8.59"
                x2="15.42"
                y1="13.51"
                y2="17.49"
              />
              <line
                x1="15.41"
                x2="8.59"
                y1="6.51"
                y2="10.49"
              />
            </svg>
          </template>
          <template #title>
            <span class="hidden sm:block">Share</span>
          </template>
          <template #content>
            <PlannerPopoutsPlannerShare />
          </template>
        </ButtonWithPopout>
        <ButtonWithPopout>
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-4 w-4"
            >
              <path
                fill-rule="evenodd"
                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
          <template #title>
            <span class="hidden sm:block">Settings</span>
          </template>
          <template #content>
            <PlannerPopoutsPlannerSettings />
          </template>
        </ButtonWithPopout>
      </div>
    </div>
    <Headers />
    <Stages />
    <AttributesAndVitals />
    <Skills />
    <Augmentations />
    <LuminanceAuras />
    <Items />
    <ArmorSets />
  </div>
</template>
