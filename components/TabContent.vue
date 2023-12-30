<script setup lang="ts">
const props = defineProps<{ tab: string }>()
const currentTab = inject("currentTab")
</script>

<template>
  <div :class="props.tab === currentTab ? 'block' : 'hidden'">
    <slot />
  </div>
</template>
