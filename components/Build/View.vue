<script setup lang="ts">
const props = defineProps<{ build: Build }>()
</script>

<template>
  <div>
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
