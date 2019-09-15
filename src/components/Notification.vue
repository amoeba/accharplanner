<template>
  <div v-bind:class="type" v-on:click="handleClick" class="notification">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    id: Number,
    type: String,
    message: String
  },
  methods: {
    handleClick() {
      this.$store.commit("removeNotification", this._props.id);
    }
  }
};
</script>
