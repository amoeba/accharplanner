<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { usePlannerStore } from "~/stores/planner"

const client = useSupabaseClient()
const route = useRoute()
const store = usePlannerStore()
const errors = ref<string[]>([])

const build_id = route.path.substring(1, route.path.length).trim()
const { data, error } = await loadBuild(client, build_id)

if (error) {
  errors.value.push(error.message)
}
 else if (data.length < 1) {
  errors.value.push("An unexpected error occurred.")
}
 else {
  console.log(data)
  await store.loadBuildFromJSON(data[0].content)
  await navigateTo("/")
}
</script>

<template>
  <div class="flex h-32 place-content-center md:h-64">
    <div v-if="errors.length <= 0">
      class="flex flex-col place-content-center gap-6 bg-zinc-50 border rounded w-64 h-32 md:w-96 md:h-64 p-4
      text-center">
      <h2 class="text-lg font-bold">
        Loading build...
      </h2>
    </div>
    <div v-if="errors.length > 0">
      <ul>
        <li
          v-for="e in errors"
          :key="e"
        >
          {{ e }}
        </li>
      </ul>
    </div>
  </div>
</template>
