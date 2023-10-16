<template>
  <div class="inline-block m-2 rounded-md border border-zinc-200">
    <div class="rounded bg-zinc-50 font-bold p-2 ">
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
