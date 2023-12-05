<template>
  <div class="inline-block m-2 rounded border border-zinc-200 dark:bg-stone-800 bg-white">
    <div class="rounded bg-zinc-50 dark:bg-stone-900 font-bold px-2 py-1 ">
      <slot name="title" />
    </div>
    <div class="p-2">
      <slot name="table" />
    </div>
  </div>
</template>
