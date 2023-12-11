<script setup lang="ts">
import { useRoute } from "vue-router"

const client = useSupabaseClient()
const route = useRoute()

const errorMessage = ref("")

const { data, error } = await loadBuild(client, route.params.id)

let build: Build

if (error) {
  errorMessage.value = error.message
}
else if (data) {
  if (data.length < 1) {
    errorMessage.value = `Couldn't find build with ID ${route.params.id}.`
  }
  else {
    build = data[0].content
  }
}
</script>

<template>
  <div>
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <div v-if="data && data.length > 0" class="flex flex-col gap-2">
      <div class="flex gap-2">
        route.params.id is {{ route.params.id }}
        <!-- <FavoriteButton :id="route.params.id" /> -->
        <ButtonView>
          <NuxtLink href="/planner">
            Load Build
          </NuxtLink>
        </ButtonView>
      </div>
      <BuildView :build="build" />
    </div>
  </div>
</template>
