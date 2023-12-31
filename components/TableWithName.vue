<template>
  <div class="inline-block rounded border border-zinc-200 bg-white dark:border-stone-600 dark:bg-stone-800">
    <div class="rounded-t border-b bg-zinc-50 px-2 py-1 font-bold dark:bg-stone-900 ">
      <slot name="title" />
    </div>
    <div class="px-2 py-1">
      <slot name="table" />
    </div>
  </div>
</template>
