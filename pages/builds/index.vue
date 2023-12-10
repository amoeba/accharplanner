
import SavedBuilds from '~/components/Planner/SavedBuilds.vue';
<template>
  <div>
    <h2 class="text-xl font-bold">
      Builds
    </h2>
    <p class="py-2">
      Blurb about builds...
    </p>

    <h2 class="text-lg font-bold mb-2">
      Public Builds
    </h2>
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

    <h2 class="text-lg font-bold mb-2">
      Your Builds
    </h2>
    <TabView initial-tab="local">
      <template #tabs>
        <Tab tab="local">
          Local
        </Tab>
        <Tab tab="remote">
          Remote
        </Tab>
      </template>
      <template #content>
        <TabContent tab="local">
          <LocalBuildList />
        </TabContent>
        <TabContent tab="remote">
          TODO
        </TabContent>
      </template>
    </TabView>
  </div>
</template>
