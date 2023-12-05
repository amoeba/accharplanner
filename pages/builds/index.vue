<template>
  <div>
    <h2 class="text-lg font-bold">
      Builds
    </h2>
    <ul>
      <li>Most recently shared builds globally</li>
      <li>Most popular shared builds globally</li>
    </ul>

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
          Local Content
        </TabContent>
        <TabContent tab="remote">
          Remote Content
        </TabContent>
      </template>
    </TabView>
  </div>
</template>
