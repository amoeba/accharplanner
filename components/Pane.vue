<script setup lang="ts">
import { ref } from "vue";

const isExpanded = ref(true)
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <div class="border rounded-md border-zinc-200 divide-y">
    <div class="flex rounded-tl-md rounded-tr-md hover:bg-zinc-50 cursor-pointer" @click="toggleExpanded">
      <div class="flex grow font-bold gap-2 p-2">
        <slot name="title"></slot>
      </div>
      <div class="justify-self-end text-right p-2">
        <slot name="right"></slot>
      </div>
    </div>
    <div :class="isExpanded ? 'block' : 'hidden'" :aria-expanded="isExpanded">
      <div class="p-2">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>