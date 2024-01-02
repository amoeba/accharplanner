<script setup lang="ts">
</script>

<template>
  <PageContainer>
    <PageSection>
      <span class="py-3 text-xl font-bold">
        Welcome to ODACCP!
      </span>
    </PageSection>
    <PageSection>
      <div class="flex justify-center">
        <ButtonLink href="/planner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
            <line
              x1="13"
              x2="19"
              y1="19"
              y2="13"
            />
            <line
              x1="16"
              x2="20"
              y1="16"
              y2="20"
            />
            <line
              x1="19"
              x2="21"
              y1="21"
              y2="19"
            />
            <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
            <line
              x1="5"
              x2="9"
              y1="14"
              y2="18"
            />
            <line
              x1="7"
              x2="4"
              y1="17"
              y2="20"
            />
            <line
              x1="3"
              x2="5"
              y1="19"
              y2="21"
            />
          </svg>
          Enter the Planner
        </ButtonLink>
      </div>
    </PageSection>
    <PageSection class="bg-stone-50 p-2 dark:bg-stone-800">
      <div class="flex flex-col justify-center gap-2 p-2 sm:flex-row">
        <Suspense>
          <FeaturedBuilds :max="5" />
          <template #fallback>
            Loading...
          </template>
        </Suspense>
        <Suspense>
          <LatestBuilds :max="5" />
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </div>
    </PageSection>
    <PageSection>
      <h2 class="text-lg font-bold">
        Feature Guides
      </h2>
      <div class="flex flex-wrap content-center gap-2">
        <div class="flex h-32 w-64 min-w-64 rounded border border-zinc-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-600">
          TODO
        </div>
        <div class="flex h-32 w-64 min-w-64 rounded border border-zinc-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-600">
          TODO
        </div>
        <div class="flex h-32 w-64 min-w-64 rounded border border-zinc-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-600">
          TODO
        </div>
      </div>
    </PageSection>
    <PageSection class="bg-stone-50 p-2 dark:bg-stone-800">
      <FeatureView>
        <template #left>
          <h2 class="text-lg font-bold">
            See the buffed values of your attributes and skills...
          </h2>
        </template>
        <template #right>
          <img
            width="400"
            height="400"
          >
        </template>
      </FeatureView>
    </PageSection>
    <PageSection class="bg-stone-50 p-2 dark:bg-stone-800">
      <FeatureView>
        <template #right>
          <h2 class="text-lg font-bold">
            Snapshot your builds into multiple stages...
          </h2>
        </template>
        <template #left>
          <img
            width="400"
            height="400"
          >
        </template>
      </FeatureView>
    </PageSection>
    <PageSection class="bg-stone-50 p-2 dark:bg-stone-800">
      <FeatureView>
        <template #left>
          <h2 class="text-lg font-bold">
            Share your builds with others...
          </h2>
        </template>
        <template #right>
          <img
            width="400"
            height="400"
          >
        </template>
      </FeatureView>
    </PageSection>
    <PageSection class="bg-stone-50 p-2 dark:bg-stone-800">
      <FeatureView>
        <template #right>
          <h2 class="text-lg font-bold">
            Create detailed guides for your builds...
          </h2>
        </template>
        <template #left>
          <img
            width="400"
            height="400"
          >
        </template>
      </FeatureView>
    </PageSection>
  </PageContainer>
</template>
