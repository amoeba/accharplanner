<script setup lang="ts">
const props = defineProps(["href"])
</script>

<template>
  <NuxtLink
    :href="props.href"
    class="flex items-center gap-2 rounded border bg-gray-100 border-gray-300 hover:bg-gray-200 px-2 py-1"
  >
    <slot />
  </NuxtLink>
</template>
