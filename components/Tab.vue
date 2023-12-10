<script setup lang="ts">
import { inject } from "vue"

const props = defineProps(["tab"])
const switchTab = inject("switchTab")
const currentTab = inject("currentTab")
</script>

<template>
  <div class="rounded-tl rounded-tr border-t border-r border-l dark:border-black hover:bg-zinc-200 dark:hover:bg-stone-600 px-2 cursor-pointer" :class="currentTab === props.tab ? 'bg-zinc-200 dark:bg-stone-600 dark:border-stone-800' : ''" aria-role="tab" :aria-selected="currentTab === props.tab ? 'true' : 'false'" @click="switchTab(props.tab)">
    <slot />
  </div>
</template>
