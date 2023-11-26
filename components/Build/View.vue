<script setup lang="ts">
const props = defineProps(["build"])
</script>

<template>
  <div>
    <BuildAttributesAndVitals :character="props.build.content.character" />
  </div>
</template>
