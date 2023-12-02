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
    updateAttributes: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return {
      nodeViewProps,
    }
  },
  methods: {
    cycleSubView(e) {
      e.preventDefault()

      if (this.node.attrs.selectedView === "creation")
        this.updateAttributes({ selectedView: "attributes_and_vitals" })

      else
        this.updateAttributes({ selectedView: "creation" })
    },
  },
}
</script>

<template>
  <NodeViewWrapper class="vue-component">
    <span class="label">
      {{ node.attrs.selectedView }}
      <button @click="cycleSubView">CYCLE</button>
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
