<script setup lang="ts">
import { ref, provide } from "vue"

const props = defineProps(['widthClass'])
const widthClass = ref(props.widthClass || "w-48")
const visibilityClass = ref("hidden")
const isPopoutVisible = ref(false);

provide('isPopoutVisible', isPopoutVisible)

const togglePopout = async function (e: Event) {
  isPopoutVisible.value = !isPopoutVisible.value;
  visibilityClass.value = isPopoutVisible.value ? "block" : "hidden"
}
</script>

<template>
  <div class="relative">
    <Button @click="togglePopout">
      <slot name="icon"></slot>
      <slot name="title"></slot>
    </Button>
    <div :class="[widthClass, visibilityClass]"
      class="absolute top-8 right-0 flex flex-col gap-2 border rounded bg-gray-50 border-gray-200 px-2 py-1 shadow-md"
      role="dialog">
      <div class="font-bold flex gap-1 items-center">
        <slot name="icon"></slot>
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="content" :isVisible="isPopoutVisible"></slot>
      </div>
      <div class="flex justify-end">
        <!-- <button @click="togglePopout" class="border rounded hover:bg-zinc-100 px-2 py-1">Close</button> -->
        <Button @click="togglePopout" class="hover:bg-white">Close</Button>
      </div>
    </div>
  </div>
</template>
