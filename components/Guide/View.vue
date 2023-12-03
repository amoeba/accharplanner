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
      <span>Created {{ new Date(guide.created_at).toLocaleDateString() }} Last Updated {{ new Date(guide.updated_at).toLocaleDateString() }}</span>
    </div>
    <div v-if="guide.attribution">
      <span>Attributed to {{ guide.attribution }}, submitted by {{ submittedBy }}</span>
    </div>
    <div v-else>
      <span>Submitted by {{ submittedBy }}</span>
    </div>
    <GuideContentEditor v-model="guide.content" :editable="false" class="py-2" />
  </div>
</template>
