<template>
  <div class="border border-zinc-200 rounded bg-zinc-50 px-2 py-1">
    <div class="self-center text-xl">
      <slot name="icon">
      </slot>
    </div>
    <div class="text-xl font-bold">
      <slot name="title"></slot>
    </div>
    <div>
      <slot name="text"></slot>
    </div>
  </div>
</template>
