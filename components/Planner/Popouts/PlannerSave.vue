<script setup lang="ts">
import { usePlannerStore } from '~/stores/planner';

const store = usePlannerStore()

// refs
const downloadButtonText = ref("Download")
const saveButtonText = ref("Save")
const overwriteButtonText = ref("Overwrite")

const downloadBuild = async function() {
  const prev = downloadButtonText.value;
  downloadButtonText.value = "Downloading..."

  exportCharacter(store.build, store.build.character.name)

  setTimeout(() => {
    downloadButtonText.value = prev;
  }, 300)
}

const saveBuild = async function() {
  store.saveBuild()

  const prev = saveButtonText.value;
  saveButtonText.value = "Saved"

  setTimeout(() => {
    saveButtonText.value = prev;
  }, 1000)
}

const overwriteBuild = async function() {
  console.log("NYI: overwriteBuild")
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col">
      <div class="flex items-center gap-1 bg-zinc-200 px-2 py-1 dark:bg-stone-600">
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
        ><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" /></svg>
        <h3 class="font-bold">
          Download
        </h3>
      </div>
      <p class="p-2">
        Download a copy of this build as JSON:
      </p>
      <div class="flex justify-center">
        <ButtonView @click="downloadBuild">
          {{ downloadButtonText }}
        </ButtonView>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex items-center gap-1 bg-zinc-200 px-2 py-1 dark:bg-stone-600">
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
        ><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
        <h3 class="font-bold">
          Save to Browser
        </h3>
      </div>
      <p class="p-2">
        Save this build to your browser's local storage. Builds saved this way can be imported back into the planner by the same browser from the Builds page.
      </p>
      <div class="flex justify-center">
        <ButtonView @click="saveBuild">
          {{ saveButtonText }}
        </ButtonView>
      </div>
    </div>
    <div class="flex items-center gap-1 bg-zinc-200 px-2 py-1 dark:bg-stone-600">
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
      ><path d="M14 4c0-1.1.9-2 2-2" /><path d="M20 2c1.1 0 2 .9 2 2" /><path d="M22 8c0 1.1-.9 2-2 2" /><path d="M16 10c-1.1 0-2-.9-2-2" /><path d="m3 7 3 3 3-3" /><path d="M6 10V5c0-1.7 1.3-3 3-3h1" /><rect
        width="8"
        height="8"
        x="2"
        y="14"
        rx="2"
      /></svg>
      <h3 class="font-bold">
        Overwrite
      </h3>
    </div>
    <p class="px-2">
      Overwrite an existing build with the current one:
    </p>
    <div class="flex flex-col gap-2 p-2">
      <select>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <div class="flex justify-end">
        <ButtonView @click="overwriteBuild">
          {{ overwriteButtonText }}
        </ButtonView>
      </div>
    </div>
  </div>
</template>
