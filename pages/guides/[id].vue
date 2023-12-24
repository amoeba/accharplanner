<script setup lang="ts">
import { useRoute } from "vue-router"

const route = useRoute()
const client = useSupabaseClient()

useHead({
  title: 'Guide - The Overly-Detailed Asheron\'s Call Character Planner'
})

let guideId: string
let guideTitle: string
const errorMessage = ref("")

// route.params.id is string | string[] so we do this dance I guess?
if (typeof route.params.id === 'object') {
  guideId = route.params.id[0]
} else {
  guideId = (route.params.id as string)
}

// Fetch guide title
const { data, error } = await fetchGuide(client, guideId)

if (error) {
  errorMessage.value = error;
} else if (data) {
  guideTitle = data[0].title

  useHead({
    title: `${guideTitle} - The Overly-Detailed Asheron's Call Character Planner`
  })
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex">
      <MyLink to="/guides">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back to Guides
      </MyLink>
    </div>
    <Suspense>
      <GuideView :id="guideId" />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>
