<template>
  <div v-bind:class="type" v-on:click="handleClick" class="notification">
    <div v-html="message"></div>
  </div>
</template>

<script>
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Notification",
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  props: {
    id: Number,
    type: String,
    message: String,
  },
  methods: {
    handleClick() {
      this.store.removeNotification(this.id);
    },
  },
};
</script>
