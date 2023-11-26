<script setup lang="ts">
import { useGuideStore } from '~/stores/guide';

const store = useGuideStore();
const props = defineProps(["submit"])
</script>

<template>
  <form class="flex flex-col gap-2" @submit.prevent="props.submit()">
    <div class="flex flex-col">
      <label for="title">Title</label>
      <input id="title" v-model="store.guide.title" class="w-64" type="text">
    </div>
    <div class="flex flex-col">
      <label for="attribution">
        Attribution
        <span class="text-zinc-500">Optional</span>
      </label>
      <input id="attribution" v-model="store.guide.attribution" type="text">
    </div>
    <div class="flex flex-col">
      <label for="content">Content</label>
      <GuideContentEditor class="border rounded border-black" v-model="store.guide.content" />
    </div>
    <input class="flex items-center gap-2 rounded border border-zinc-200 hover:bg-zinc-50 px-2 py-1 cursor-pointer w-auto"
      type="submit" value="Save">
  </form>
</template>
