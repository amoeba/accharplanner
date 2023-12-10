<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import type { Database } from '~/utils/database.types'

const props = defineProps(['id'])
const client = useSupabaseClient()
const user = useSupabaseUser()

const guide = ref<Database['public']['Tables']['guides']['Row']>()
const errorMessage = ref('')

const { data, error } = await fetchGuide(client, props.id)

const submittedBy = ref('Anonymous')

let createdAt: globalThis.ComputedRef<string>
let updatedAt: globalThis.ComputedRef<string>

if (error) {
  errorMessage.value = error
}
else if (data && data[0]) {
  guide.value = data[0]

  if (guide.value && guide.value.profiles)
    submittedBy.value = guide.value.profiles.name

  if (guide.value) {
    createdAt = useTimeAgo(new Date(guide.value.created_at))
    updatedAt = useTimeAgo(new Date(guide.value.updated_at))
  }
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
      <span>Created {{ createdAt }} Last Updated {{ updatedAt }}</span>
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
