<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePlannerStore } from '~/stores/planner';

const client = useSupabaseClient();
const route = useRoute();
const store = usePlannerStore();
const errors = ref([])

// State machine for loading
enum LoadState {
  NOT_YET_LOADING,
  LOADING,
  LOADED,
  ERROR
}

const loadState = ref(LoadState.NOT_YET_LOADING);

const loadBuild = async function (id: string) {
  console.log("loadBuild for id ", id);

  loadState.value = LoadState.LOADING;

  try {
    const { data, error } = await client
      .from("builds")
      .select()
      .eq("id", id);

    if (error) {
      loadState.value = LoadState.ERROR;
      errors.value.push(error.message);
      return { data: undefined, error: error }
    } else {
      if (data.length < 1) {
        loadState.value = LoadState.ERROR;
        errors.value.push("Build not found.");
        return { data: undefined, error: error }
      } else if (data.length > 1) {
        loadState.value = LoadState.ERROR;
        errors.value.push("Multiple builds found.")
        return { data: undefined, error: error }
      }
      loadState.value = LoadState.LOADED;
      return { data: data, error: undefined }
    }
  } catch (error) {
    loadState.value = LoadState.ERROR;
    errors.value.push(error);
    return { data: undefined, error: error }
  }

}

onMounted(async () => {
  console.log("onMounted");
  // TODO parse build from route
  let build_id = route.path.substring(1, route.path.length).trim();
  console.log(build_id)
  const { data, error } = await loadBuild(build_id);

  if (error) {
    console.log(error)
  } else if (data) {
    console.log(data);
    await store.loadBuildFromJSON(data[0]["content"]);
    await navigateTo("/planner");
  }

})
</script>

<template>
  <h2 class="text-lg font-bold">Loading build...</h2>
  <div v-if="loadState == LoadState.NOT_YET_LOADING">
    Not yet loading
  </div>
  <div v-if="loadState == LoadState.LOADING">
    Loading
  </div>
  <div v-if="loadState == LoadState.LOADED">
    Loaded
  </div>
  <div v-if="loadState == LoadState.ERROR">
    Errors: {{ errors.join(", ") }}
  </div>
</template>
