<template>
  <div class="settings-modal">
    <h3>Custom Server Rules</h3>
    <label>
      <input type="checkbox" v-model="noLevelCap" />
      No Level Cap
    </label>
  </div>
</template>

<script>
export default {
  name: "SettingsModal",
  computed: {
    noLevelCap: {
      get() {
        return this.$store.state.settings.noLevelCap;
      },
      set(value) {
        this.$store.commit("updateSettingsNoLevelCap", value);
      }
    }
  }
};
</script>
