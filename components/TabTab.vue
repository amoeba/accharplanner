<script setup lang="ts">
import { inject } from "vue"

const props = defineProps<{tab:string}>()
const switchTab : Function | undefined = inject("switchTab")
const currentTab = inject("currentTab")
</script>

<template>
  <div
    class="cursor-pointer rounded-t border-x border-t px-2 hover:bg-zinc-200 dark:border-black dark:hover:bg-stone-600"
    :class="currentTab === props.tab ? 'bg-zinc-200 dark:bg-stone-600 dark:border-stone-800' : ''"
    aria-role="tab"
    :aria-selected="currentTab === props.tab ? 'true' : 'false'"
    @click="switchTab && switchTab(props.tab)"
  >
    <slot />
  </div>
</template>
