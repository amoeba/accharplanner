<script setup lang="ts">
const props = defineProps<{ toggleExpanded: Function, isExpanded: boolean, isCollapsible: boolean }>()
</script>

<template>
  <div class="w-full divide-y overflow-scroll rounded border border-zinc-200 dark:border-stone-600 dark:bg-stone-900">
    <div
      class="flex rounded-t"
      :class="props.isCollapsible ? 'hover:bg-zinc-50 cursor-pointer' : ''"
      @click="props.toggleExpanded"
    >
      <div class="flex grow items-center gap-2 px-2 py-1 font-bold">
        <slot name="title" />
      </div>
      <div class="justify-self-end px-2 py-1 text-right">
        <slot name="right" />
      </div>
    </div>
    <div
      :class="props.isExpanded ? 'block' : 'hidden'"
      :aria-expanded="props.isExpanded"
      class="dark:border-stone-600"
    >
      <div class="px-2 py-1">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
