<template>
  <div class="inline-block m-2 rounded border border-zinc-200">
    <div class="rounded bg-zinc-50 font-bold px-2 py-1 ">
      <slot name="title"></slot>
    </div>
    <div class="p-2">
      <slot name="table"></slot>
    </div>
  </div>
</template>
