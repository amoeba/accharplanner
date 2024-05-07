<script setup lang="ts">
import type { Database } from "~/utils/database.types-generated"

const route = useRoute()
const client = useSupabaseClient()

const page = ref(getPage(route.query.page))
const pageSize = 20

const guides = ref<Database["public"]["Tables"]["guides"]["Row"][]>()
const guidesErrorMessage = ref("")
const count = ref(0)
const countErrorMessage = ref("")

const doCountGuides = async function (): Promise<number> {
  const { count, error } = await fetchGuidesCount(client)

  if (error) {
    countErrorMessage.value = error.message

    return -1
  }

  return count || 0
}

const doFetchGuides = async function (page: number): Promise<Database["public"]["Tables"]["guides"]["Row"][]> {
  const { data, error } = await fetchGuides(client, pageSize, page, pageSize)

  if (error) {
    guidesErrorMessage.value = error.message

    return []
  }

  return data
}

count.value = await doCountGuides()
guides.value = await doFetchGuides(page.value)

watch(
  () => page.value,
  async (next) => {
    guides.value = await doFetchGuides(next)
  },
)

const numPages = Math.ceil(count.value / pageSize)
</script>

<template>
  <PageContainer class="flex flex-col gap-2">
    <h2 class="text-xl font-bold">
      Guides
    </h2>
    <p class="rounded border border-yellow-300 bg-yellow-200 p-2 leading-6">
      <em>Guides are an experimental feature at the moment. Please reach out on <NuxtLink to="https://discord.gg/r3jt93vYEb">Discord</NuxtLink> if you have any problems or suggestions.</em>
    </p>
    <div>
      <div v-if="countErrorMessage">
        {{ countErrorMessage }}
      </div>
      <div v-if="guidesErrorMessage">
        {{ guidesErrorMessage }}
      </div>
      <div class="flex">
        <ButtonLink href="/guides/new">
          Create a New Guide
        </ButtonLink>
      </div>
    </div>
    <GuideList
      v-if="guides"
      :guides="guides"
    />
    <div class="flex gap-2">
      <PageControls
        v-model="page"
        :num-pages="numPages"
      />
    </div>
  </PageContainer>
</template>
