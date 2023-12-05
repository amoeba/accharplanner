<script setup lang="ts">
import { defineProps, inject } from "vue"

const props = defineProps(["tab"])
const currentTab = inject("currentTab")
</script>

<template>
  <div :class="props.tab === currentTab ? 'block' : 'hidden'">
    <slot />
  </div>
</template>
