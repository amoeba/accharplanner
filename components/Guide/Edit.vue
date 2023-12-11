<script setup lang="ts">
import { useGuideStore } from "~/stores/guide"

const props = defineProps(["id"])
const client = useSupabaseClient()
const user = useSupabaseUser()

const store = useGuideStore()
const errors = ref<string[]>([])

const onSubmit = async function () {
  const validationErrors = store.validate()

  if (validationErrors.length > 0) {
    errors.value = validationErrors

    return
  }

  errors.value = []

  store.prepareGuideForSave()
  const { data, error } = await updateGuide(client, user, store.guide)

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

const { data, error } = await fetchGuide(client, props.id)

if (error) {
  errors.value.push(error)
}
else {
  if (data.length < 1) {
    errors.value.push("An unexpected error occurred.")
  }
  else {
    store.guide = data[0]
  }
}
</script>

<template>
  <h2 class="text-lg font-bold">
    Edit Guide
  </h2>
  <GuideForm :submit="onSubmit" />
  <ul v-if="errors.length > 0">
    <li v-for="error in errors" class="text-red-500">
      {{ error }}
    </li>
  </ul>
</template>
