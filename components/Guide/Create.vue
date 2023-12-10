<script setup lang="ts">
import { useGuideStore } from "~/stores/guide"

const client = useSupabaseClient()
const user = useSupabaseUser()

const store = useGuideStore()
const errors = ref<string[]>([])

store.reset()

const onSubmit = async function () {
  const validationErrors = store.validate()

  if (validationErrors.length > 0) {
    errors.value = validationErrors

    return
  }

  errors.value = []

  const { data, error } = await createGuide(client, user, store.guide)

  if (error) {
    errors.value.push(error)

    return
  }

  if (!data || data.length <= 0) {
    errors.value.push("An unexpected error was encountered.")

    return
  }

  navigateTo(`/guides/${data[0].id}`)
}
</script>

<template>
  <h2 class="text-lg font-bold">
    Create Guide
  </h2>
  <GuideForm :submit="onSubmit" />
  <ul v-if="errors.length > 0">
    <li v-for="error in errors" class="text-red-500">
      {{ error }}
    </li>
  </ul>
</template>
