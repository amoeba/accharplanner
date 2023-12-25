<script setup lang="ts">
const props = defineProps<{ build: Build }>()
</script>

<template>
  <div class="flex flex-col gap-2 md:items-start">
    <div>
      <h2 class="text-lg font-bold">
        {{ props.build.character.name }}
      </h2>
      Level {{ props.build.character.level }} {{ props.build.character.gender }} {{ props.build.character.race }}
    </div>
    <TabView initial-tab="attributes">
      <template #tabs>
        <TabTab tab="attributes">
          Attributes
        </TabTab>
        <TabTab tab="skills">
          Skills
        </TabTab>
        <TabTab tab="augmentations">
          <span class="hidden md:inline-block">Augmentations</span>
          <span class="md:hidden">Augs</span>
        </TabTab>
        <TabTab tab="auras">
          Auras
        </TabTab>
        <TabTab tab="sets">
          Sets
        </TabTab>
      </template>
      <template #content>
        <TabContent tab="attributes">
          <BuildReadOnlyAttributesAndVitals :build="props.build" />
        </TabContent>
        <TabContent tab="skills">
          <BuildReadOnlySkillsView :build="props.build" />
        </TabContent>
        <TabContent tab="augmentations">
          <BuildReadOnlyAugmentationsView :build="props.build" />
        </TabContent>
        <TabContent tab="auras">
          <BuildReadOnlyLuminanceAurasView :build="props.build" />
        </TabContent>
        <TabContent tab="sets">
          <BuildReadOnlyArmorSetsView :build="props.build" />
        </TabContent>
      </template>
    </TabView>
  </div>
</template>
