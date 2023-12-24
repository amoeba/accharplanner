<script setup lang="ts">
import { defineStore } from "pinia"

import { SKILL_NAME } from "~/utils/mappings"

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
    <table class="w-full">
      <thead>
        <tr>
          <th
            class="px-1 text-left text-white"
            style="background: linear-gradient( to right, #392067, #392067, transparent);"
            colspan="3"
          >
            Specialized
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="store.specializedSkills.length <= 0">
          <td
            colspan="12"
          >
            No specialized skills
          </td>
        </tr>
        <tr
          v-for="skill in store.specializedSkills"
          :key="skill"
        >
          <td class="w-8">
            <img
              :src="`/icons/${skill}.png`"
              width="25"
              height="25"
              style="clip-path: circle(50%)"
            >
          </td>
          <td>{{ SKILL_NAME[skill] }}</td>
          <td class="text-right">
            {{ store[`${skill}Buffed`] }}
          </td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th
            class="px-1 text-left text-white"
            style="background: linear-gradient( to right, #0f3c3e, #0f3c3e, transparent);"
            colspan="3"
          >
            Trained
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="store.trainedSkills.length <= 0">
          <td
            colspan="12"
          >
            No trained skills
          </td>
        </tr>
        <tr
          v-for="skill in store.trainedSkills"
          :key="skill"
        >
          <td class="w-8">
            <img
              :src="`/icons/${skill}.png`"
              width="25"
              height="25"
              style="clip-path: circle(50%)"
            >
          </td>
          <td>{{ SKILL_NAME[skill] }}</td>
          <td class="text-right">
            {{ store[`${skill}Buffed`] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
