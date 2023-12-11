import { Node, mergeAttributes } from "@tiptap/core"
import { VueNodeViewRenderer } from "@tiptap/vue-3"

import { ComponentName, TabName } from "./lib"
import ExtensionTestComponent from "./ExtensionTestComponent.vue"

export default Node.create({
  name: "vueComponent", // FIXME
  group: "block",
  atom: true, // FIXME: Research this

  addAttributes() {
    return {
      id: {
        default: "",
      },
      tab: {
        default: TabName.Start,
      },
      view: {
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
    return VueNodeViewRenderer(ExtensionTestComponent)
  },
})
