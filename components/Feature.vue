<template>
  <div
    class="grid grid-cols-[26px_auto] border border-gray-600 rounded-md bg-slate-800 hover:bg-slate-600 cursor-pointer p-2">
    <div class="self-center text-xl">
      <slot name="icon">
      </slot>
    </div>
    <div class="text-xl font-bold">
      <slot name="title"></slot>
    </div>
    <div>&nbsp;</div>
    <div>
      <slot name="text"></slot>
    </div>
  </div>
</template>
