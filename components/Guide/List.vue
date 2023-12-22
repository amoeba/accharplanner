<script setup lang="ts">
import type { Database } from "~/utils/database.types-generated"

const props = defineProps<{ guides: Database["public"]["Tables"]["guides"]["Row"][] }>()
</script>

<template>
  <div v-if="props.guides.length <= 0">
    No guides created yet. <NuxtLink href="/guides/new">
      Create one
    </NuxtLink>
  </div>
  <ul v-if="props.guides.length > 0">
    <li
      v-for="guide in props.guides"
      :key="guide.id"
    >
      <NuxtLink :href="`/guides/${guide.id}`">
        {{ guide.title }}
      </NuxtLink>
      by {{ guide.attribution || (guide.profiles ? guide.profiles.name : "Anonymous") }}
    </li>
  </ul>
</template>
