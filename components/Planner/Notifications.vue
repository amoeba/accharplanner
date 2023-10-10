<template>
  <div id="notifications">
    <Notification v-for="notification in notifications" :key="notification.id" :id="notification.id"
      :type="notification.type" :message="notification.message" />
  </div>
</template>

<script>
import Notification from "./Notification.vue";
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Notifications",
  components: {
    Notification,
  },
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  computed: {
    notifications() {
      return this.store.ui.notifications;
    },
  },
};
</script>
