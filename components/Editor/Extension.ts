import { Node, mergeAttributes } from "@tiptap/core"
import { VueNodeViewRenderer } from "@tiptap/vue-3"

import { ComponentName } from "./lib"
import Component from "./ExtensionTestComponent.vue"

export default Node.create({
  name: "vueComponent", // FIXME
  group: "block",
  atom: true, // FIXME: Research this

  addAttributes() {
    return {
      id: {
        default: "OtFbpJEFl4",
      },
      build: {
        default: {},
      },
      selectedView: {
        default: ComponentName.Creation,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "vue-component", // FIXME
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["vue-component", mergeAttributes(HTMLAttributes)] // FIXME
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})
