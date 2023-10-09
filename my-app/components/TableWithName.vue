<template>
  <div class="inline-block m-2 border-2 rounded-md border-gray-600">
    <div class="p-1 bg-slate-600 font-bold">
      <slot name="title"></slot>
    </div>
    <div class="p-2">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<style>
td {
  padding: 0.25em 0.5em;
}
</style>
