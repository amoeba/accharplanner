<script setup lang="ts">
import { useRoute } from "vue-router"
import { usePlannerStore } from "~/stores/planner";

const client = useSupabaseClient()
const route = useRoute()
const router = useRouter()
const store = usePlannerStore();

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

const loadCurrentBuildInPlanner = async function() {
  console.log(route.params.id, build);
  await store.loadBuildFromJSONString(JSON.stringify(build))
  router.push("/planner")
}
</script>

<template>
  <div>
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <div
      v-if="data && data.length > 0"
      class="flex flex-col gap-2"
    >
      <div class="flex justify-end gap-2">
        <FavoriteButton
          v-if="route.params"
          :build-id="route.params.id"
        />
        <ButtonView @click="loadCurrentBuildInPlanner">
          Load Build
        </ButtonView>
      </div>
      <BuildView :build="build" />
    </div>
  </div>
</template>
