<script setup lang="ts">
import { ref } from "vue";

const isExpanded = ref(false)
const collapse = () => {
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <div class="border rounded-md divide-y">
    <div>
      <div class="grid grid-cols-2 cursor-pointer" @click="collapse">
        <div class="font-bold p-2">
          <slot name="title"></slot>
        </div>
        <div class="justify-self-end p-2">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
    <div :class="isExpanded ? 'block' : 'hidden'" :aria-expanded="isExpanded">
      <div class="p-2">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>