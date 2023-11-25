<script setup lang="ts">
import type { Guide } from '~/utils/models';

const client = useSupabaseClient();
const user = useSupabaseUser()

const props = defineProps(["id"])

const guide = ref<Guide>()

const fetchGuide = async function () {
  return await client.from("guides").select().eq("id", props.id)
}

const { data, error } = await fetchGuide();

if (error) {
  // TODO: Proper error handlings
  console.log(error)
} else {
  guide.value = data[0]
}
</script>

<template>
  <div v-if="guide">
    <!-- Edit button -->
    <div v-if="user && user.id == guide.created_by">
      <NuxtLink :href="`/guides/${id}/edit`">Edit</NuxtLink>
    </div>

    <h2 class="text-lg font-bold">{{ guide.title }}</h2>
    <div>
      <p>Created At {{ guide.created_at }}</p>
      <p>Updated At {{ guide.updated_at }}</p>
    </div>
    <p>
      Created By {{ guide.created_by }}
    </p>
    <div v-html="guide.content"></div>
  </div>
</template>
