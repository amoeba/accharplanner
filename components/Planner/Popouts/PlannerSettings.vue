<script setup lang="ts">
import { usePlannerStore } from "~/stores/planner";

const store = usePlannerStore();
</script>

<template>
  <h3>Custom Server Rules</h3>
  <label>
    <input type="checkbox" v-model="store.settings.infiniteMode" />
    Infinite Mode
  </label>
</template>