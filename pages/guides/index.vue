<template>
  <h2 class="text-lg font-bold">
    Guides
  </h2>
  <p class="py-2">
    Blurb about Guides...
  </p>
  <NuxtLink href="/guides/new">
    Create a new Guide
  </NuxtLink>
  <Suspense>
    <GuideList />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
