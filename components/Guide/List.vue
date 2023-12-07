<script setup lang="ts">
import type { Database } from '~/utils/database.types';

const client = useSupabaseClient()


const guides = ref<Database['public']['Tables']['guides']['Row'][]>()
const guidesErrorMessage = ref("")
const count = ref(0)
const countErrorMessage = ref("")

const doCountGuides = async function (): Promise<number> {
  const { count, error } = await fetchGuidesCount(client)

  if (error) {
    countErrorMessage.value = error.message

    return -1;
  }

  return count || 0;
}

const doFetchGuides = async function (page: number): Promise<Database['public']['Tables']['guides']['Row'][]> {
  const { data, error } = await fetchGuides(client, pageSize, page, pageSize)

  if (error) {
    guidesErrorMessage.value = error.message

    return []
  }

  return data
}

count.value = await doCountGuides()
guides.value = await doFetchGuides(page.value)

</script>

<template>
  <div v-if="guides && guides.length <= 0">
    No guides created yet. <NuxtLink href="/guides/new">
      Create one
    </NuxtLink>
  </div>
  <div v-if="countErrorMessage">
    {{ countErrorMessage }}
  </div>
  <div v-if="guidesErrorMessage">
    {{ guidesErrorMessage }}
  </div>
  <div v-if="count">
    Total: {{ count }}
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
