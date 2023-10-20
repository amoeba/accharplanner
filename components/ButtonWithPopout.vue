<script setup lang="ts">
import { ref } from "vue"

const isPopoutVisible = ref(false);

const togglePopout = async function (e: Event) {
  isPopoutVisible.value = !isPopoutVisible.value;
}

</script>

<template>
  <div class="relative">
    <Button @click="togglePopout">
      <slot name="title"></slot>
    </Button>
    <div :class="isPopoutVisible ? 'block' : 'hidden'"
      class="absolute top-11 right-0 flex flex-col gap-2 w-48 border rounded bg-white p-2">
      <div class="font-bold">
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="content"></slot>
      </div>
      <div class="flex justify-end">
        <button @click="togglePopout" class="border rounded hover:bg-zinc-100 p-2">Close</button>
      </div>
    </div>
  </div>
</template>
