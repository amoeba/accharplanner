<script setup lang="ts">
const client = useSupabaseClient()

const guides = ref<Guide[]>([])

const doFetchGuides = async function (): Promise<Guide[]> {
  const { data, error } = await fetchGuides(client)

  if (error)
    return []

  return data
}

guides.value = await doFetchGuides()
</script>

<template>
  <div v-if="guides && guides.length <= 0">
    No guides created yet. <NuxtLink href="/guides/new">
      Create one
    </NuxtLink>
  </div>
  <ul>
    <li v-for="guide in guides" :key="guide.id">
      <NuxtLink :href="`/guides/${guide.id}`">
        {{ guide.title }}
      </NuxtLink>
      by {{ guide.attribution || (guide.profiles ? guide.profiles.name : "Anonymous") }}
    </li>
  </ul>
</template>
