<script setup lang="ts">
const props = defineProps<{ tooltip: string | undefined }>()
</script>

<template>
  <button
    v-tooltip="props.tooltip"
    class="flex cursor-pointer items-center gap-2 rounded border border-gray-300 bg-gray-100 px-2 py-0 leading-6 hover:bg-gray-200 dark:border-stone-600 dark:bg-stone-800 dark:hover:bg-stone-700"
  >
    <slot />
  </button>
</template>
