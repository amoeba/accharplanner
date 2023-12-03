<script setup lang="ts">
import type { Guide } from "~/utils/models"

const props = defineProps(["id"])
const client = useSupabaseClient()
const user = useSupabaseUser()

const guide = ref<Guide>()
const errorMessage = ref("")

const { data, error } = await fetchGuide(client, props.id)

const submittedBy = ref("Anonymous")

if (error) {
  errorMessage.value = error
}
else {
  guide.value = data[0]

  if (guide.value.profiles)
    submittedBy.value = guide.value.profiles.name
}
</script>

<template>
  <div v-if="errorMessage">
    {{ errorMessage }}
  </div>
  <div v-if="guide">
    <div class="flex gap-2">
      <h2 class="text-lg font-bold">
        {{ guide.title }}
      </h2>
      <ButtonLink v-if="user && user.id === guide.created_by" :href="`/guides/${id}/edit`">
        Edit
      </ButtonLink>
    </div>
    <div>
      <p>Created At {{ guide.created_at }}</p>
      <p>Updated At {{ guide.updated_at }}</p>
    </div>
    <div v-if="guide.attribution">
      <p>Attributed to {{ guide.attribution }}</p>
    </div>
    <p>Submitted By {{ submittedBy }}</p>
    <GuideContentEditor v-model="guide.content" :editable="false" />
  </div>
</template>
