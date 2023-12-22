<script setup lang="ts">
defineProps(["toggleExpanded", "isExpanded", "isCollapsible"])
</script>

<template>
  <div class="w-full divide-y overflow-scroll rounded border border-zinc-200 dark:border-stone-600 dark:bg-stone-900">
    <div
      class="flex rounded-t"
      :class="isCollapsible ? 'hover:bg-zinc-50 cursor-pointer' : ''"
      @click="toggleExpanded"
    >
      <div class="flex grow items-center gap-2 px-2 py-1 font-bold">
        <slot name="title" />
      </div>
      <div class="justify-self-end px-2 py-1 text-right">
        <slot name="right" />
      </div>
    </div>
    <div
      :class="isExpanded ? 'block' : 'hidden'"
      :aria-expanded="isExpanded"
      class="dark:border-stone-600"
    >
      <div class="px-2 py-1">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
