<template>
  <node-view-wrapper class="vue-component">
    <span class="label">Component</span>

    <div class="content">
      <button @click.prevent="increase">
        This button has been clicked {{ node.attrs.count }} times.
      </button>
    </div>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

export default {
  components: {
    NodeViewWrapper,
  },

  props: nodeViewProps,

  methods: {
    increase() {
      this.updateAttributes({
        count: this.node.attrs.count + 1,
      });
    },
  },
};
</script>

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
