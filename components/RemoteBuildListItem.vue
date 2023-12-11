<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core"

const props = defineProps<{ build: BuildRow }>()
const createdAt = useTimeAgo(props.build.created_at)
</script>

<template>
  <tr>
    <td>
      <NuxtLink :to="`/${props.build.id}`">
        {{ props.build.content.character.name }}
      </NuxtLink>
    </td>
    <td>
      <span class="text-zinc-500">{{ createdAt }}</span>
    </td>
  </tr>
</template>
