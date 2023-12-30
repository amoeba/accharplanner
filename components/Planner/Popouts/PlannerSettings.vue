<script setup lang="ts">
import { usePlannerStore } from "~/stores/planner"

const store = usePlannerStore()
</script>

<template>
  <div class="flex flex-col gap-2 p-2">
    <h3>Custom Server Rules</h3>
    <label>
      <input
        v-model="store.settings.infiniteMode"
        type="checkbox"
      >
      Infinite Mode
    </label>
  </div>
</template>
