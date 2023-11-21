<script setup lang="ts">
const props = defineProps(['tooltip'])
</script>

<template>
  <button class="flex items-center gap-2 rounded border border-zinc-200 hover:bg-zinc-50 px-2 py-1 cursor-pointer"
    v-tooltip="props.tooltip">
    <slot></slot>
  </button>
</template>
