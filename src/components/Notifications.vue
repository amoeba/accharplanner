<template>
  <div id="notifications">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :id="notification.id"
      :type="notification.type"
      :message="notification.message"
    />
  </div>
</template>

<script>
import Notification from "./Notification.vue";

export default {
  name: "Notifications",
  components: {
    Notification
  },
  computed: {
    notifications() {
      return this.$store.state.notifications;
    }
  }
};
</script>
