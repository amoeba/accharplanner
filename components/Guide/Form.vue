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
      <label for="attribution">
        Attribution
        <span class="text-zinc-500">Optional</span>
      </label>
      <input
        id="attribution"
        v-model="store.guide.attribution"
        class="w-64"
        type="text"
      >
    </div>
    <div class="flex flex-col">
      <label for="content">Content</label>
      <GuideContentEditor
        v-model="store.guide.content"
        class="border rounded border-black"
      />
    </div>
    <div class="flex">
      <input
        class="rounded border border-zinc-200 hover:bg-zinc-50 px-2 py-1 cursor-pointer w-auto"
        type="submit"
        value="Save"
      >
    </div>
  </form>
</template>
