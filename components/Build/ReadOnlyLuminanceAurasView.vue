<script setup lang="ts">
import { defineStore } from "pinia"

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
    <div v-if="store.investedLuminanceAuras.length <= 0">
      This build doesn't have any luminance auras.
    </div>
    <table
      v-else
      class="w-full"
    >
      <tbody>
        <tr
          v-for="aura in store.investedLuminanceAuras"
          :key="aura.name"
        >
          <td>
            {{ aura.name }}
          </td>
          <td class="text-right">
            {{ aura.invested }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
