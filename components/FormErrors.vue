<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  errors: { type: Array as PropType<Array<string>>, required: true },
})

const hi: string[] = ["hi"];
</script>

<template>
  <p v-if="errors.length > 0" class="text-red-400">
    <span class="font-bold">We encountered the following error(s) while submitting this form:</span>
  <ul>
    <li v-for="error in errors">
      <span v-if="error.name">
        <span class="font-bold">{{ error.name }} ({{ error.status }}): </span> {{ error.message }}
      </span>
      <span v-else>
        {{ error.message }}
      </span>
    </li>
  </ul>
  </p>
</template>