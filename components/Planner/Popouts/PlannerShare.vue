<script setup lang="ts">
import { ref, inject, watch } from "vue"
import { useRuntimeConfig } from "nuxt/app";
import { useClipboard } from '@vueuse/core'
import { createId } from "mnemonic-id";
import { usePlannerStore } from "~/stores/planner";

const store = usePlannerStore();
const config = useRuntimeConfig();

// Refs + injects
const shareBuildURL = ref("")
const errorMessage = ref("")
const { text, copy, copied, isSupported } = useClipboard({ shareBuildURL })

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
  <div class="flex flex-col">
    Use this URL to share your build with others:
    <div class="flex">
      <input id="sharedBuildURL" type="text" v-model="shareBuildURL" placeholder="Sharing, hang on tight..." />
      <Button @click="copy(shareBuildURL)" class="border rounded px-2 py-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-copy">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </Button>
    </div>
  </div>
  <div v-if="errorMessage">{{ errorMessage }}</div>
</template>
