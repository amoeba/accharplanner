<script setup lang="ts">
const builds = [{
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
}, {
  name: 'Courtney Henry',
  title: 'Designer',
}, {
  name: 'Tom Cook',
  title: 'Director of Product',
}, {
  name: 'Whitney Francis',
  title: 'Copywriter',
}, {
  name: 'Leonard Krasner',
  title: 'Senior Designer',
}, {
  name: 'Floyd Miles',
  title: 'Principal Designer',
}]

</script>

<template>
  <UTable class="w-1/3" :rows="builds" />
</template>
