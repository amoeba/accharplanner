<script lang="ts">
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3"

import { ComponentName } from "./lib"
import ReadOnlyAttributesAndVitals from "~/components/Build/ReadOnlyAttributesAndVitals.vue"
import ReadOnlyCreation from "~/components/Build/ReadOnlyCreation.vue"

export default {
  components: {
    NodeViewWrapper,
    ReadOnlyAttributesAndVitals,
    ReadOnlyCreation,
  },
  props: nodeViewProps,
  setup() {
    return {
      ComponentName,
    }
  },
}
</script>

<template>
  <NodeViewWrapper class="vue-component">
    <span class="label">
      {{ node.attrs.view }}
    </span>

    <div class="content">
      <ReadOnlyAttributesAndVitals v-if="node.attrs.view === ComponentName.Creation" />
      <ReadOnlyCreation v-if="node.attrs.view === ComponentName.AttributesAndVitals" />
    </div>
  </NodeViewWrapper>
</template>

<style>
.vue-component {
  border: 1px solid red;
}

.label {
  border: 1px solid blue;
  background-color: orange;
}

.content {
  border: 1px solid green;
}
</style>
