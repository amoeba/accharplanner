<script setup lang="ts">
import { inject, ref, watch } from "vue"
import { useRuntimeConfig } from "nuxt/app"
import { useClipboard } from "@vueuse/core"

import { usePlannerStore } from "~/stores/planner"

const store = usePlannerStore()
const config = useRuntimeConfig()
const client = useSupabaseClient()
const user = useSupabaseUser()

// Refs + injects
const shareBuildURL = ref("")
const errorMessage = ref("")
const { copy } = useClipboard({ shareBuildURL })

const isPopoutVisible = inject("isPopoutVisible")

watch([isPopoutVisible], async (newVal) => {
  if (newVal[0]) {
    await doShareBuild()
  }
})

// Form state
enum ShareState {
  UNSENT,
  SHARING,
  SUCCESS,
  ERROR,
}

const shareState = ref(ShareState.UNSENT)

// Methods
const setSharedBuild = function (id: string) {
  shareBuildURL.value = `${config.public.baseUrl}/${id}`
}

const doShareBuild = async function () {
  shareBuildURL.value = ""

  try {
    shareState.value = ShareState.SHARING

    const { data, error } = await shareBuild(client, user, store.build)

    if (error) {
      shareState.value = ShareState.ERROR
      errorMessage.value = error.message
    }
    else if (data && data.length === 1) {
      shareState.value = ShareState.SUCCESS
      setSharedBuild(data[0].id)
    }
  }
  catch (error) {
    shareState.value = ShareState.ERROR
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    Use this URL to share your build with others:
    <div class="flex">
      <input
        id="sharedBuildURL"
        v-model="shareBuildURL"
        type="text"
        placeholder="Sharing, hang on tight..."
      >
      <ButtonView
        class="rounded border px-2 py-1"
        tooltip="Copy to clipboard"
        @click="copy(shareBuildURL)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect
            width="14"
            height="14"
            x="8"
            y="8"
            rx="2"
            ry="2"
          />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </ButtonView>
    </div>
  </div>
  <div v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>
