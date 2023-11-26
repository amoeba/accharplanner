<template>
  <div class="flex flex-col divide-y">
    <div class="flex divide-x">
      <div v-if="editor && editor.options.editable">
        <button @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          class="border rounded-t border-zinc-200 hover:bg-zinc-200 px-2 py-1"
          :class="{ 'is-active': editor.isActive('bold') }">
          <strong>Bold</strong>
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()" class="px-2 py-1"
          :class="{ 'is-active': editor.isActive('bold') }">
          <em>Italic</em>
        </button>
      </div>
    </div>
    <div :class="(editor && editor.options.editable) ? 'border rounded-b border-zinc-200' : ''">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";

import VueComponent from "~/components/Editor/Extension";

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
    };
  },

  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value;

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, VueComponent],
      content: this.modelValue,
      editable: this.editable,
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML());
      },
    });

    1 + 1;
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
