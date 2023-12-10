<template>
  <div class="inline-block m-2 rounded border bg-white dark:bg-stone-800 border-zinc-200 dark:border-stone-600">
    <div class="rounded bg-zinc-50 dark:bg-stone-900 font-bold px-2 py-1 ">
      <slot name="title" />
    </div>
    <div class="px-2 py-1">
      <slot name="table" />
    </div>
  </div>
</template>
