<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-xl font-bold">
      Guides
    </h2>
    <p class="leading-6">
      Blurb about Guides...
    </p>
    <div>
      <ButtonLink href="/guides/new">
        Create a New Guide
      </ButtonLink>
    </div>
    <Suspense>
      <GuideList />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>
