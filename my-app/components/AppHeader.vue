<template>
  <header class="grid grid-cols-2 items-center p-2">
    <div class="flex gap-4 items-center">
      <NuxtLink id="title" to="/" class="font-bold"><span class="text-xl font-bold text-green-400">▲</span> ODACCP
      </NuxtLink>
      <NuxtLink to="/planner">Planner</NuxtLink>
      <NuxtLink to="/builds">Builds</NuxtLink>
      <span id="subtitle" class="absolute top-10 left-10 opacity-0 transition-all duration-300 text-gray-400 text-xs">The
        Overly-Detailed
        Asheron's
        Call Character
        Planner</span>
    </div>
    <div class="justify-self-end items-center p-2">
      T \
      <NuxtLink href="https://github.com/amoeba/accharplanner">G</NuxtLink> \
      Log In
    </div>
  </header>
</template>

<style>
#title:hover+#subtitle {
  opacity: 1;
  transform: translateY(6px);
  /* Adjust the value for the desired slide-in effect */
}
</style>
