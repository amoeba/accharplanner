<script setup lang="ts">
import { ref, inject, watch } from "vue"
import { useRuntimeConfig } from "nuxt/app";
import { createId } from "mnemonic-id";
import { usePlannerStore } from "~/stores/planner";

const store = usePlannerStore();
const config = useRuntimeConfig();

// Refs + injects
const shareBuildURL = ref("")
const errorMessage = ref("")

const isPopoutVisible = inject('isPopoutVisible')

watch([isPopoutVisible], async (newVal, oldVal) => {
  if (newVal) {
    await shareBuild();
  }
})

// Form state
enum ShareState {
  UNSENT,
  SHARING,
  SUCCESS,
  ERROR
}

const shareState = ref(ShareState.UNSENT);

// Methods
const setSharedBuild = function (id: string) {
  shareBuildURL.value = config.public.baseUrl + "/" + id;
}

const shareBuild = async function () {
  shareBuildURL.value = ""

  const client = useSupabaseClient();

  try {
    shareState.value = ShareState.SHARING;

    const { data, error } = await client
      .from("builds")
      .insert({ id: createId(10), content: store.build })
      .select();

    if (error) {
      shareState.value = ShareState.ERROR;
      errorMessage.value = error.message;
    } else if (data && data.length == 1) {
      shareState.value = ShareState.SUCCESS;
      setSharedBuild(data[0].id);
    }

  } catch (error) {
    shareState.value = ShareState.ERROR;
  }
}
</script>

<template>
  <div class="flex">
    <input id="sharedBuildURL" type="text" v-model="shareBuildURL" placeholder="Sharing, hang on tight..." />
    <Button class="border rounded px-2 py-1">📋</Button>
  </div>
  <div v-if="errorMessage">{{ errorMessage }}</div>
</template>
