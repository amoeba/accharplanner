<script setup lang="ts">
const client = useSupabaseClient();

const errors = ref<string[]>([])

interface GuideMeta {
  id: number,
  title: string,
}

const guides = ref<GuideMeta[]>([])

enum FetchState {
  UNSENT,
  FETCHING,
  DONE,
  ERROR
}

const fetchState = ref(FetchState.UNSENT)

const fetchGuides = async function (): Promise<GuideMeta[]> {
  fetchState.value = FetchState.FETCHING;
  errors.value = []

  const { data, error } = await client.from("guides").select()

  if (error) {
    fetchState.value = FetchState.ERROR;
    errors.value.push(error)

    console.log(error)
    return;
  }

  fetchState.value = FetchState.DONE;

  return data;
}

guides.value = await fetchGuides()
</script>

<template>
  <div v-if="guides.length <= 0">
    No guides created yet. <NuxtLink href="/guides/new">Create one</NuxtLink>
  </div>
  <ul>
    <li v-for="guide in guides">
      <NuxtLink :href="`/guides/${guide.id}`">{{ guide.title }}</NuxtLink>
    </li>
  </ul>
</template>
