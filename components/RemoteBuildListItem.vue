<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core"

const props = defineProps<{ build: BuildRow }>()
const createdAt = useTimeAgo(props.build.created_at)
</script>
<template>
  <div class="flex gap-2">
    <NuxtLink :to="`/${props.build.id}`">
      {{ props.build.content.character.name }}
    </NuxtLink>
    <div class="text-zinc-500">{{ createdAt }}</div>
  </div>
</template>
