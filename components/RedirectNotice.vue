<script setup lang="ts">
const message = useCookie('message')
</script>

<template>
  <div
    v-if="message"
    class="max-w-96 rounded bg-yellow-300 px-2 py-1 text-black dark:text-black"
  >
    {{ message }}
  </div>
</template>
