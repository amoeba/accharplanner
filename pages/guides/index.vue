<template>
  <div>
    <h2 class="text-xl font-bold">
      Guides
    </h2>
    <p class="py-2">
      Blurb about Guides...
    </p>
    <ButtonView>
      <NuxtLink href="/guides/new">
        Create a new Guide
      </NuxtLink>
    </ButtonView>
    <Suspense>
      <GuideList />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>
