<template>
  <div v-bind:class="type" v-on:click="handleClick" class="notification">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    id: String,
    type: String,
    message: String,
  },
  methods: {
    handleClick () {
      console.log('...', this._props.id)
      this.$store.commit("removeNotification", this._props.id);
    }
  }
};
</script>
