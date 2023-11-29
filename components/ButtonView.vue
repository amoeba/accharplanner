<script setup lang="ts">
const props = defineProps(["tooltip"])
</script>

<template>
  <button
    v-tooltip="props.tooltip"
    class="flex items-center gap-2 rounded border bg-gray-100 border-gray-300 hover:bg-gray-200 px-2 py-1 cursor-pointer"
  >
    <slot />
  </button>
</template>
