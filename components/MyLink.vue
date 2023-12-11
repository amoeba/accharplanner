<script setup lang="ts">
const props = defineProps<{ to: string }>()
</script>

<template>
  <NuxtLink class="flex items-center gap-1 underline hover:no-underline" :to="props.to">
    <slot></slot>
  </NuxtLink>
</template>
