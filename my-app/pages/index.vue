<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="text-xl font-bold py-3">
    Welcome to ODACCP!
  </div>
  <Features class="py-3"></Features>

  <div class="flex justify-center w-full gap-4 py-3">
    <LatestBuilds />
    <LatestBuilds />
    <LatestBuilds />
  </div>
</template>
