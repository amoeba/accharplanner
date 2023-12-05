<script setup lang="ts">
defineProps(["toggleExpanded", "isExpanded", "isCollapsible"])
</script>

<template>
  <div class="border rounded dark:bg-stone-900 border-zinc-200 dark:border-stone-600 divide-y w-full overflow-scroll">
    <div
      class="flex rounded-tl rounded-tr"
      :class="isCollapsible ? 'hover:bg-zinc-50 cursor-pointer' : ''"
      @click="toggleExpanded"
    >
      <div class="flex items-center grow font-bold gap-2 px-2 py-1">
        <slot name="title" />
      </div>
      <div class="justify-self-end text-right px-2 py-1">
        <slot name="right" />
      </div>
    </div>
    <div :class="isExpanded ? 'block' : 'hidden'" :aria-expanded="isExpanded" class="dark:border-stone-600">
      <div class="px-2 py-1">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
