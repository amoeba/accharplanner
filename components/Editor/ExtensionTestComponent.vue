<script>
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3"

import ReadOnlyAttributesAndVitals from "~/components/Build/ReadOnlyAttributesAndVitals.vue"

export default {
  components: {
    NodeViewWrapper,
    ReadOnlyAttributesAndVitals,
  },

  props: nodeViewProps,

  methods: {
    increase() {
      this.updateAttributes({
        count: this.node.attrs.count + 1,
      })
    },
  },
}
</script>

<template>
  <NodeViewWrapper class="vue-component">
    <span class="label">Component</span>

    <div class="content">
      <ReadOnlyAttributesAndVitals />
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
