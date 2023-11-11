<script setup lang="ts">
defineProps([
  "toggleExpanded", "isExpanded"
])
</script>

<template>
  <div class="border rounded border-zinc-200 divide-y">
    <div class="flex rounded-tl rounded-tr hover:bg-zinc-50 cursor-pointer" @click="toggleExpanded">
      <div class="flex grow font-bold gap-2 px-2 py-1">
        <slot name="title"></slot>
      </div>
      <div class="justify-self-end text-right px-2 py-1">
        <slot name="right"></slot>
      </div>
    </div>
    <div :class="isExpanded ? 'block' : 'hidden'" :aria-expanded="isExpanded">
      <div class="px-2 py-1">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
