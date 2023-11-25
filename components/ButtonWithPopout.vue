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
      <slot name="icon" />
      <slot name="title" />
    </Button>
    <div
      :class="[widthClass, visibilityClass]"
      class="absolute top-8 right-0 flex flex-col gap-2 border rounded bg-white border-gray-200 px-2 py-1 shadow-md"
      role="dialog"
    >
      <div>
        <slot
          name="content"
          :is-visible="isPopoutVisible"
        />
      </div>
    </div>
  </div>
</template>
