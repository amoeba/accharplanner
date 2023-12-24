<script setup lang="ts">
import { defineStore } from "pinia"

import { ARMOR_SET_NAME } from "~/utils/mappings"

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
  <div class="p-2">
    <div v-if="store.equippedArmorSets.length <= 0">
      This build doesn't use any armor sets.
    </div>
    <table
      v-else
      class="w-full"
    >
      <tbody>
        <tr
          v-for="armorSet in store.equippedArmorSets"
          :key="armorSet.name"
        >
          <td>
            {{ armorSet.name }}
          </td>
          <td class="text-right">
            {{ armorSet.equipped }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
