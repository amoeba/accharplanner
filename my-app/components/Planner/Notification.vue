<template>
  <div v-bind:class="type" v-on:click="handleClick" class="notification">
    <div v-html="message"></div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    id: Number,
    type: String,
    message: String,
  },
  methods: {
    handleClick() {
      this.$store.commit("removeNotification", this.id);
    },
  },
};
</script>
