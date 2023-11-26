<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>
      <ButtonView>
        <NuxtLink href="/guides"> Back to Guides </NuxtLink>
      </ButtonView>
    </div>
    <Suspense>
      <GuideView :id="route.params.id" />
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>
