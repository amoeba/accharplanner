<script setup lang="ts">
const props = defineProps(["build_id"])
</script>

<template>
  <div>
    Hello from TestComponent. Build ID is {{ props.build_id }}
  </div>
</template>
