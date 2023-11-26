<script setup lang="ts">
import { ref, inject, watch } from "vue";
import { useRuntimeConfig } from "nuxt/app";
import { useClipboard } from "@vueuse/core";

import { usePlannerStore } from "~/stores/planner";

const store = usePlannerStore();
const config = useRuntimeConfig();
const client = useSupabaseClient();
const user = useSupabaseUser();

// Refs + injects
const shareBuildURL = ref("");
const errorMessage = ref("");
const { text, copy, copied, isSupported } = useClipboard({ shareBuildURL });

const isPopoutVisible = inject("isPopoutVisible");

watch([isPopoutVisible], async (newVal, oldVal) => {
  if (newVal[0]) {
    await doShareBuild();
  }
});

// Form state
enum ShareState {
  UNSENT,
  SHARING,
  SUCCESS,
  ERROR,
}

const shareState = ref(ShareState.UNSENT);

// Methods
const setSharedBuild = function (id: string) {
  shareBuildURL.value = config.public.baseUrl + "/" + id;
};

const doShareBuild = async function () {
  console.log("doShareBuild")
  shareBuildURL.value = "";

  try {
    shareState.value = ShareState.SHARING;

    const { data, error } = await shareBuild(client, user, store.build);

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
};

const saveBuild = async function () {
  store.saveBuild();
};

const doExportCharacter = async function () {
  exportCharacter(store.build, store.build.character.name);
};
</script>

<template>
  <div class="flex flex-col gap-2">
    Use this URL to share your build with others:
    <div class="flex">
      <input id="sharedBuildURL" v-model="shareBuildURL" type="text" placeholder="Sharing, hang on tight..." />
      <ButtonView class="border rounded px-2 py-1" tooltip="Copy to clipboard" @click="copy(shareBuildURL)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-copy">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </ButtonView>
    </div>
    <div class="flex gap-2">
      <ButtonView @click="doExportCharacter">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-arrow-down-to-line">
          <path d="M12 17V3" />
          <path d="m6 11 6 6 6-6" />
          <path d="M19 21H5" />
        </svg>
        Download
      </ButtonView>
      <ButtonView @click="saveBuild">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-save">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
        Save to Browser
      </ButtonView>
    </div>
  </div>
  <div v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>
