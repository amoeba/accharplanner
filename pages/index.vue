<script setup lang="ts"></script>

<template>
  <div>
    <div class="text-xl font-bold py-3">
      <span>Welcome to ODACCP!</span>
    </div>

    <p>Blurb about the Planner</p>

    <div class="flex justify-center">
      <NuxtLink class="border rounded border-zinc-200 hover:bg-zinc-50 px-2 py-1" to="/planner">
        Create a New Build
      </NuxtLink>
    </div>

    <Suspense>
      <PublishedBuilds />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
    <Suspense>
      <LatestBuilds />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>
