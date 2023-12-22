<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core"

const props = defineProps<{ build: BuildRow }>()
const createdAt = useTimeAgo(props.build.created_at)
</script>

<template>
  <div class="flex flex-col">
    <NuxtLink :to="`/${props.build.id}`" class="underline text-blue-500 hover:no-underline cursor-pointer">
      {{ props.build.content.character.name }}
    </NuxtLink>
    <span class="text-sm text-zinc-500">Shared {{ createdAt }}</span>
  </div>
</template>
