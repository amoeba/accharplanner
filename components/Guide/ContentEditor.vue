<script>
import { Editor, EditorContent } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"

import { ComponentName } from "../Editor/lib"
import VueComponentExtension from "~/components/Editor/Extension"

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      editor: null,
      component_name: ComponentName,
    }
  },

  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame)
        return

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, VueComponentExtension],
      content: this.modelValue,
      editable: this.editable,
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<template>
  <div class="flex flex-col">
    <div v-if="!editor">
      Inspecting this guide...
    </div>
    <!-- Toolbar -->
    <div v-if="editor && editor.options.editable" class="flex">
      <button
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        class="hover:bg-zinc-300 px-2 py-1" :class="{ 'bg-black text-white': editor.isActive('bold') }"
        @click.prevent="editor.chain().focus().toggleBold().run()"
      >
        <strong>Bold</strong>
      </button>
      <button
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        class="hover:bg-zinc-300 px-2 py-1" :class="{ 'bg-black text-white': editor.isActive('italic') }"
        @click.prevent="editor.chain().focus().toggleItalic().run()"
      >
        <em>Italic</em>
      </button>
      <button
        :class="{ 'bg-black text-white': editor.isActive('bulletList') }"
        class="hover:bg-zinc-300 px-2 py-1" @click.prevent="editor.chain().focus().toggleBulletList().run()"
      >
        List
      </button>
      <button
        :class="{ 'bg-black text-white': editor.isActive('vueComponent') }"
        class="flex gap-1 items-center hover:bg-zinc-300 px-2 py-1" @click.prevent="editor.chain().focus().insertContent({ type: 'vueComponent', attrs: { selectedView: component_name.Creation } }).run()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-person-standing"><circle cx="12" cy="5" r="1" /><path d="m9 20 3-6 3 6" /><path d="m6 8 6 2 6-2" /><path d="M12 10v4" /></svg>
        Build View
      </button>
    </div>
    <!-- Editor -->
    <div :class="(editor && editor.options.editable) ? 'border rounded-b border-zinc-200' : ''">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>
