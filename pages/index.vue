<script setup lang="ts"></script>

<template>
  <div>
    <div class="text-xl font-bold py-3">Welcome to ODACCP!</div>

    <p>Blurb about the Planner</p>

    <div class="flex justify-center">
      <NuxtLink
        class="border rounded border-zinc-200 hover:bg-zinc-50 px-2 py-1"
        to="/planner"
      >
        Create a New Build
      </NuxtLink>
    </div>

    <Features class="py-3" />

    <PublishedBuilds />
    <LatestBuilds />
  </div>
</template>
