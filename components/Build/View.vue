<script setup lang="ts">
const props = defineProps(["build"])
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-2">
    <CollapsiblePane :is-collapsible="false" :is-expanded="true">
      <template #title>
        Attributes &amp; Vitals
      </template>
      <template #content>
        <BuildReadOnlyAttributesAndVitals :build="props.build" />
      </template>
    </CollapsiblePane>
    <CollapsiblePane :is-collapsible="false" :is-expanded="true">
      <template #title>
        Skills
      </template>
      <template #content>
        <BuildReadOnlySkillsView :build="props.build" />
      </template>
    </CollapsiblePane>

  </div>
</template>
