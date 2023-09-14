<template>
  <div id="planner">
    <button v-on:click="toggleEditMode">
      !Toggle Edit Mode! {{  isEditMode }}
    </button>
    <div v-if="!isEditMode">
      <ViewModePlanner />
    </div>
    <div v-if="isEditMode">
      <EditModePlanner />
    </div>
  </div>
</template>

<script>

import ViewModePlanner from "./view/ViewModePlanner.vue"
import EditModePlanner from "./edit/EditModePlanner.vue"

export default {
  name: "planner",
  components: {
    ViewModePlanner,
    EditModePlanner
  },
  computed: {
    isEditMode() {
      return this.$store.getters.isEditMode;
    },
  },
  methods: {
    toggleEditMode() {
      this.$store.commit("toggleEditMode");
    },
  },
};
</script>
