<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const client = useSupabaseClient()
const router = useRouter()
const route = useRoute()

useHead({
  title: 'Delete Guide - The Overly-Detailed Asheron\'s Call Character Planner'
})

const id = Number(route.params.id)
const errorMessage = ref("")

const doDelete = async function (id: number) {
  const { error } = await deleteGuide(client, id);

  if (error) {
    errorMessage.value = error.errorMessage
  } else {
    router.push("/guides")
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    Are you sure?
    <div class="flex gap-2">
      <ButtonView @click="doDelete(id)">
        Yes
      </ButtonView>
      <ButtonLink :to="`/guides/${id}`">
        No
      </ButtonLink>
    </div>

    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
