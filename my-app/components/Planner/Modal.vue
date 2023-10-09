<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="handleWrapperClick">
        <div class="modal-container">
          <div class="modal-header">
            <h2><slot name="header" /></h2>
          </div>
          <div class="modal-body">
            <slot name="body" />
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// Based on https://vuejs.org/v2/examples/modal.html
export default {
  name: "Modal",
  methods: {
    handleWrapperClick(e) {
      if (e.target.className === "modal-wrapper") {
        this.$emit("close");
      }
    },
  },
};
</script>
