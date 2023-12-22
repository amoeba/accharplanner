<script lang="ts">
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3"

import { Components, TabName } from "./lib"
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
      TabName,
    }
  },
  methods: {
    changeTab(tab: TabName) {
      this.updateAttributes({ tab })
    },
    changeView(e: Event) {
      if (!e.target) {
        return
      }

      this.updateAttributes({ view: e.target.value })
    },
    updateBuildId(e: Event) {
      if (!e.target) {
        return
      }

      this.updateAttributes({ id: e.target.value })
    },
  },
}
</script>

<template>
  <NodeViewWrapper class="inline-flex">
    <CollapsiblePane
      :is-expanded="true"
      :is-collapsible="false"
    >
      <template #title>
        <div v-if="!editor.isEditable">
          {{ node.attrs.view }}
        </div>
        <div v-if="editor.isEditable">
          <div
            v-if="node.attrs.tab === TabName.Start"
            class="flex gap-2"
          >
            Build View
          </div>
          <div
            v-if="node.attrs.tab === TabName.View"
            class="flex gap-2"
          >
            <ButtonView @click="changeTab(TabName.Start)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </ButtonView>
            <select
              class="px-1"
              @change="changeView"
            >
              <option
                v-for="view in Components"
                :key="view"
                :value="view"
                :selected="node.attrs.view === view"
              >
                {{ view }}
              </option>
            </select>
          </div>
        </div>
      </template>
      <template #content>
        <div
          v-if="node.attrs.tab === TabName.Start"
          class="flex flex-col gap-2"
        >
          <label>
            Enter a Shared Build ID
            <input
              type="text"
              :value="node.attrs.id"
              @input="updateBuildId"
            >
          </label>
          <div>
            <ButtonView @click="changeTab(TabName.View)">
              Pick a View
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </ButtonView>
          </div>
        </div>
        <div v-if="node.attrs.tab === TabName.View">
          <Suspense>
            <GuideBuildView :node="node" />
            <template #fallback>
              Loading build...
            </template>
          </Suspense>
        </div>
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
