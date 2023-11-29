<script setup lang="ts">
import type { Guide } from "~/utils/models"

const props = defineProps(["id"])
const client = useSupabaseClient()
const user = useSupabaseUser()

const guide = ref<Guide>()

const { data, error } = await fetchGuide(client, props.id)

if (error) {
  // TODO: Proper error handlings
  console.log(error)
}
else {
  guide.value = data[0]
}
</script>

<template>
  <div v-if="guide">
    <div class="flex gap-2">
      <h2 class="text-lg font-bold">
        {{ guide.title }}
      </h2>
      <ButtonView v-if="user && user.id === guide.created_by">
        <NuxtLink :href="`/guides/${id}/edit`">
          Edit
        </NuxtLink>
      </ButtonView>
    </div>
    <div>
      <p>Created At {{ guide.created_at }}</p>
      <p>Updated At {{ guide.updated_at }}</p>
    </div>
    <div v-if="guide.attribution">
      <p>Attributed to {{ guide.attribution }}</p>
    </div>
    <p>Submitted By {{ guide.profiles.name }}</p>
    <GuideContentEditor v-model="guide.content" :editable="false" />
  </div>
</template>
