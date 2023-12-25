<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'title',
})
</script>

<template>
  <div class="flex flex-col">
    <div class="b flex items-center gap-2 bg-stone-200 p-4">
      <img src="/axe_shield.png">
      <span class="text-[32px] font-bold">ODACCP</span>
    </div>
    <div class="p-4 text-[80px] font-bold">
      Kolthar al Magus
    </div>
    <div class="p-4 text-[32px]">
      Level 126 Male Sho
    </div>
  </div>
</template>
