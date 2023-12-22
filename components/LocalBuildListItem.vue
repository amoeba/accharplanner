<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core"
import { usePlannerStore } from "~/stores/planner";

const store = usePlannerStore()
const router = useRouter()

const props = defineProps(["build"])
const build = JSON.parse(props.build.build)
const saved = useTimeAgo(props.build.key)

const loadBuild = async function () {
  store.import(build)
  router.push("/planner")
}

const downloadBuild = async function () {
  exportCharacter(build, build.character.name)
}

const deleteBuild = async function () {
  store.deleteBuild(props.build.key)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <div class="grow">
      <button @click="loadBuild">{{
        build.character.name
      }}</button>
      <div class="text-sm text-zinc-500">Saved {{ saved }}</div>
    </div>
    <div class="flex flex-wrap justify-end gap-2">
      <div class="flex flex-wrap items-start gap-2">
        <ButtonView @click="downloadBuild" class="inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-arrow-down-to-line">
            <path d="M12 17V3" />
            <path d="m6 11 6 6 6-6" />
            <path d="M19 21H5" />
          </svg>
          Download
        </ButtonView>
        <ButtonView @click="deleteBuild" class="inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-trash-2">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
          Delete
        </ButtonView>
      </div>
    </div>
  </div>
</template>
