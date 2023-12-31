<script setup lang="ts">
const props = defineProps<{ toggleExpanded: Function, isExpanded: boolean, isCollapsible: boolean, isInError: boolean }>()

// Dynamic classes for the template's container div
const containerDynamicClasses = computed(() => ({
  'bg-red-200 dark:bg-red-600 border-red-200 dark:border-red-200': props.isInError}
))

// Dynamic classes for the template's title bar slot
const titleBarDynamicClasses = computed(() => ({
  "cursor-pointer": props.isCollapsible,
  "hover:bg-zinc-50 hover:dark:bg-stone-500": props.isCollapsible && !props.isInError,
  "hover:bg-red-400 hover:dark:bg-red-600": props.isCollapsible && props.isInError,
  "bg-red-200 dark:bg-red-600": props.isInError
}))

// Dynamic classes for template's content slot
const contentDynamicClasses = computed(() => ({
  block: props.isExpanded,
  hidden: !props.isExpanded
}))
</script>

<template>
  <div
    class="w-full divide-y overflow-scroll rounded border border-zinc-200 dark:border-stone-600 dark:bg-stone-900"
    :class="containerDynamicClasses"
  >
    <div
      class="flex rounded-t bg-zinc-100 dark:bg-stone-600"
      :class="titleBarDynamicClasses"
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
      :class="contentDynamicClasses"
      :aria-expanded="props.isExpanded"
      class="border-zinc-200 dark:border-stone-600"
    >
      <slot name="content" />
    </div>
  </div>
</template>
