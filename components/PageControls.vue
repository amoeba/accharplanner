<script setup lang="ts">
const props = defineProps(["modelValue", "numPages"])
const emit = defineEmits(["update:modelValue"])

const page = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})

const pages = [...Array(props.numPages)].map((x, i) => i + 1)
</script>

<template>
  <span
    v-if="page <= 1"
    class="text-zinc-400"
  >Prev</span>
  <NuxtLink
    v-if="page > 1"
    :href="`?page=${page - 1}`"
    @click="page--"
  >
    Prev
  </NuxtLink>
  <span
    v-for="p in pages"
    :key="p"
  >
    <span
      v-if="page === p"
      class="text-zinc-400"
    >{{ page }}</span>
    <NuxtLink
      v-if="page !== p"
      :href="`?page=${p}`"
      @click="page = p"
    >{{ p }}</NuxtLink>
  </span>
  <span
    v-if="page >= numPages"
    class="text-zinc-400"
  >Next</span>
  <NuxtLink
    v-if="page < numPages"
    :href="`?page=${page + 1}`"
    @click="page++"
  >
    Next
  </NuxtLink>
</template>
