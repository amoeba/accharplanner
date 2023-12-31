<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core"

const props = defineProps<{ build: BuildRow }>()
const createdAt = useTimeAgo(props.build.created_at)
</script>

<template>
  <div class="flex flex-col p-2">
    <NuxtLink :to="`/${props.build.id}`">
      {{ props.build.content.character.name }}
    </NuxtLink>
    <span class="text-sm text-zinc-500">Shared {{ createdAt }}</span>
  </div>
</template>
