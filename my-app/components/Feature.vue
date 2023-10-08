<template>
  <div
    class="grid grid-cols-[20px_auto] border border-gray-600 rounded-md bg-slate-800 hover:bg-slate-600 cursor-pointer p-2">
    <div>
      <div>
        <slot name="icon">
        </slot>
      </div>
    </div>
    <div>
      <div class="text-xl font-bold">
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="text"></slot>
      </div>
    </div>
  </div>
</template>
