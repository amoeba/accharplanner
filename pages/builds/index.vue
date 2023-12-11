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
    <div class="flex flex-col sm:flex-row">
      <Suspense>
        <PublishedBuilds :max="10" />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
      <Suspense>
        <LatestBuilds :max="10" />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </div>

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
          <RemoteBuildList />
        </TabContent>
      </template>
    </TabView>
  </div>
</template>
