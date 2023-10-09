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
export default {
  name: "SettingsModal",
  computed: {
    infiniteMode: {
      get() {
        return this.$store.state.settings.infiniteMode;
      },
      set(value) {
        this.$store.commit("updateSettingsInfiniteMode", value);
      }
    }
  }
};
</script>
