<script setup lang="ts">
import { defineStore } from "pinia"

import { AUGMENTATION_NAME } from "~/utils/mappings"

// Kindy hack implementation for now: Defines a brand new Pinia store just for
// this component, gives it what it needs to do skill calculations, and then
// populates the template with the values we need
import state from "~/stores/planner/state"
import getters from "~/stores/planner/getters"
import actions from "~/stores/planner/actions"

const props = defineProps<{ build: Build }>()

const usePlannerStore = defineStore("planner", {
  state: () => state,
  getters,
  actions,
})

const store = usePlannerStore()
store.loadCharacterIntoCurrentBuild(props.build.character)
</script>

<template>
  <div>
    <div v-if="store.investedAugmentations.length <= 0">
      This build doesn't have any experience augmentations.
    </div>
    <table
      v-else
      class="w-72"
    >
      <tbody>
        <tr
          v-for="aug in store.investedAugmentations"
          :key="aug.name"
        >
          <td>
            {{ aug.name }}
          </td>
          <td class="text-right">
            {{ aug.invested }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
