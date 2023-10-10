<template>
  <div class="settings-modal">
    <h3>Custom Server Rules</h3>
    <label>
      <input type="checkbox" v-model="infiniteMode" />
      Infinite Mode
    </label>
  </div>
</template>

<script>
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "SettingsModal",
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  computed: {
    infiniteMode: {
      get() {
        return this.store.settings.infiniteMode;
      },
      set(value) {
        this.store.updateSettingsInfiniteMode(value);
      }
    }
  }
};
</script>
