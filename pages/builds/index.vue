<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col gap-2">
    <div>
      <h2 class="text-xl font-bold">
        Builds
      </h2>
      <p class="py-2">
        View builds other players have made, builds you've <a href="#local">saved locally</a>, and builds
        <a href="#shared">
          you've shared</a>.
      </p>
    </div>
    <div>
      <a name="local" />
      <a name="shared" />
      <h2 class="mb-2 text-lg font-bold">
        Your Builds
      </h2>
      <TabView initial-tab="local">
        <template #tabs>
          <TabTab tab="local">
            Local
          </TabTab>
          <TabTab tab="remote">
            Shared
          </TabTab>
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
    <div>
      <h2 class="mb-2 text-lg font-bold">
        Public Builds
      </h2>
      <div class="flex flex-col gap-2 sm:flex-row">
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
    </div>
  </div>
</template>
