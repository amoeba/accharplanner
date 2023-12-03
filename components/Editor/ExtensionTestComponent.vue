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
    editor: {
      type: Object,
      required: true,
    },
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
    cycleSubView(e: Event) {
      e.preventDefault()

      if (this.node.attrs.selectedView === ComponentName.Creation)
        this.updateAttributes({ selectedView: ComponentName.AttributesAndVitals })
      else if (this.node.attrs.selectedView === ComponentName.AttributesAndVitals)
        this.updateAttributes({ selectedView: ComponentName.Skills })
      else if (this.node.attrs.selectedView === ComponentName.Skills)
        this.updateAttributes({ selectedView: ComponentName.Creation })
    },
  },
}
</script>

<template>
  <NodeViewWrapper class="inline-flex">
    <CollapsiblePane :is-expanded="true" :is-collapsible="false">
      <template #title>
        {{ node.attrs.selectedView }}
        <button v-if="editor.isEditable" @click="cycleSubView">
          CYCLE
        </button>
      </template>
      <template #content>
        <GuideBuildView :node="node" />
      </template>
    </CollapsiblePane>
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
