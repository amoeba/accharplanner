<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core"
import type { Database } from "~/utils/database.types-generated"

const props = defineProps(["id"])
const client = useSupabaseClient()
const user = useSupabaseUser()

const guide = ref<Database["public"]["Tables"]["guides"]["Row"]>()
const errorMessage = ref("")

const { data, error } = await fetchGuide(client, props.id)

const submittedBy = ref("Anonymous")

let createdAt: globalThis.ComputedRef<string>
let updatedAt: globalThis.ComputedRef<string>

if (error) {
  errorMessage.value = error
}
else if (data && data[0]) {
  guide.value = data[0]

  if (guide.value && guide.value.profiles) {
    submittedBy.value = guide.value.profiles.name
  }

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
    <div class="flex items-center gap-2">
      <h2 class="text-lg font-bold">
        {{ guide.title }}
      </h2>
      <MyLink v-if="user && user.id === guide.created_by" :to="`/guides/${id}/edit`">
        Edit
      </MyLink>
      <MyLink class="text-red-500" v-if="user && user.id === guide.created_by" :to="`/guides/${id}/delete`">
        Delete
      </MyLink>
    </div>
    <div v-if="guide.attribution">
      <div>Submitted by {{ submittedBy }}</div>
      <div>Attributed to {{ guide.attribution }}</div>
    </div>
    <div v-else>
      <span>Submitted by {{ submittedBy }}</span>
    </div>
    <div>
      <div>Created {{ createdAt }}</div>
      <div>Last Updated {{ updatedAt }}</div>
    </div>
    <GuideContentEditor v-model="guide.content" :editable="false" class="py-2" />
  </div>
</template>
