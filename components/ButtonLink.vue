<script setup lang="ts">
const props = defineProps(["href"])
</script>

<template>
  <NuxtLink
    :href="props.href"
    class="flex inline-flex items-center gap-2 rounded border border-gray-300 bg-gray-100 px-2 py-1 text-inherit hover:bg-gray-200 dark:border-stone-600 dark:bg-stone-800 dark:hover:bg-stone-700"
  >
    <slot />
  </NuxtLink>
</template>
