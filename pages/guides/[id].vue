<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <NuxtLink href="/guides">Back to Guides</NuxtLink>
  <Suspense>
    <GuideView :id="route.params.id" />
    <template #fallback>Loading...</template>
  </Suspense>
</template>
