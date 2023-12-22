<script setup lang="ts">
import { useGuideStore } from "~/stores/guide"

const props = defineProps(["submit"])
const store = useGuideStore()
</script>

<template>
  <form
    class="flex flex-col gap-2"
    @submit.prevent="props.submit()"
  >
    <div class="flex flex-col">
      <label for="title">Title</label>
      <input
        id="title"
        v-model="store.guide.title"
        class="w-64"
        type="text"
      >
    </div>
    <div class="flex flex-col">
      <GuideContentEditor
        v-model="store.guide.content"
        class="rounded border border-black"
      />
    </div>
    <div class="flex flex-col">
      <label for="attribution">
        Attribution
        <span class="text-zinc-500">Optional</span>
      </label>
      <small>Use this field if someone else created the build and you want to give them credit.</small>
      <input
        id="attribution"
        v-model="store.guide.attribution"
        class="w-64"
        type="text"
      >
    </div>
    <div class="flex">
      <input
        class="w-auto cursor-pointer rounded border border-zinc-200 px-2 py-1 hover:bg-zinc-50"
        type="submit"
        value="Save"
      >
    </div>
  </form>
</template>
