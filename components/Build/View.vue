<script setup lang="ts">
const props = defineProps(["build"])
</script>

<template>
  <div class="flex gap-2">
    <BuildReadOnlyAttributesAndVitals :build="props.build" />
    <BuildReadOnlySkillsView :build="props.build" />
  </div>
</template>
