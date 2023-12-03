<script lang="ts">
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3"

import { ComponentName, Components } from "./lib"
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
      Components,
    }
  },
  methods: {
    onChange(e: Event) {
      const newView = e.target.value

      if (newView === ComponentName.Creation)
        this.updateAttributes({ selectedView: ComponentName.Creation })
      else if (newView === ComponentName.AttributesAndVitals)
        this.updateAttributes({ selectedView: ComponentName.AttributesAndVitals })
      else if (newView === ComponentName.Skills)
        this.updateAttributes({ selectedView: ComponentName.Skills })
    },
  },
}
</script>

<template>
  <NodeViewWrapper class="inline-flex">
    <CollapsiblePane :is-expanded="true" :is-collapsible="false">
      <template #title>
        {{ node.attrs.selectedView }}
      </template>
      <template #right>
        <select v-if="editor.isEditable" class="px-1" @change="onChange">
          <option v-for="v in Components" :key="v" :value="v">
            {{ v }}
          </option>
        </select>
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
