<script setup lang="ts">
import { provide, ref } from 'vue'

const props = defineProps(['widthClass'])
const widthClass = ref(props.widthClass || 'w-48')
const visibilityClass = ref('hidden')
const isPopoutVisible = ref(false)

provide('isPopoutVisible', isPopoutVisible)

const togglePopout = async function () {
  isPopoutVisible.value = !isPopoutVisible.value
  visibilityClass.value = isPopoutVisible.value ? 'block' : 'hidden'
}
</script>

<template>
  <div class="relative">
    <ButtonView @click="togglePopout">
      <slot name="icon" />
      <slot name="title" />
    </ButtonView>
    <div
      :class="[widthClass, visibilityClass]"
      class="absolute top-8 right-0 flex flex-col gap-2 border rounded bg-white dark:bg-stone-800 border-gray-200 dark:border-stone-600 px-2 py-1 shadow-md"
      role="dialog"
    >
      <div>
        <slot name="content" :is-visible="isPopoutVisible" />
      </div>
    </div>
  </div>
</template>
