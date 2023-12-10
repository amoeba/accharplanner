<script setup lang="ts">
import { defineProps, provide } from 'vue'

const props = defineProps(['initialTab'])
const currentTab = ref(props.initialTab || '')
const switchTab = async function (tab: string) {
  currentTab.value = tab
}

provide('currentTab', currentTab)
provide('switchTab', switchTab)
</script>

<template>
  <div class="flex flex-col dark:bg-dark-800 dark:border-stone-600">
    <div class="flex gap-2">
      <slot
        name="tabs"
      />
    </div>
    <div class="border rounded-tr rounded-br rounded-bl border-zinc-200 dark:border-stone-600 p-2">
      <slot name="content" />
    </div>
  </div>
</template>
