<template>
  <div>
    <h2 class="text-xl font-bold">
      Builds
    </h2>
    <p class="py-2">
      View builds other players have made, builds you've <a href="#local">saved locally</a>, and builds
      <a href="#shared">
        you've shared</a>.
    </p>

    <h2 class="mb-2 text-lg font-bold">
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

    <a name="local" />
    <a name="shared" />
    <h2 class="mb-2 text-lg font-bold">
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
