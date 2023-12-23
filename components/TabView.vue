<script setup lang="ts">
import { defineProps, provide } from "vue"

const props = defineProps<{ initialTab: string }>()
const currentTab = ref(props.initialTab || "")
const switchTab = async function (tab: string) {
  currentTab.value = tab
}

provide("currentTab", currentTab)
provide("switchTab", switchTab)
</script>

<template>
  <div class="flex flex-col dark:border-stone-600">
    <div class="flex gap-2">
      <slot name="tabs" />
    </div>
    <div class="rounded-r rounded-bl border border-zinc-200 dark:border-stone-600">
      <slot name="content" />
    </div>
  </div>
</template>
