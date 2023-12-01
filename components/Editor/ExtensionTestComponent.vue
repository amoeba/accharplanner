<script lang="ts">
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3"

import { ComponentName } from "./lib"
import GuideBuildView from "~/components/Build/GuideBuildView.vue"

export default {
  components: {
    NodeViewWrapper,
    GuideBuildView,
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      nodeViewProps,
    }
  },
}
</script>

<template>
  <NodeViewWrapper class="vue-component">
    <span class="label">
      {{ node.attrs.selectedView }}
    </span>

    <div class="content">
      <GuideBuildView :node="node" />
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
