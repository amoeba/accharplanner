<script setup lang="ts">
const props = defineProps(['tooltip'])
</script>

<template>
  <button
    v-tooltip="props.tooltip"
    class="flex items-center gap-2 rounded border border-zinc-200 hover:bg-zinc-50 px-2 py-1 cursor-pointer"
  >
    <slot />
  </button>
</template>
