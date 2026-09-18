<template>
  <div id="aetheria" class="pane items">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div>
          <h3>Aetheria</h3>
        </div>
        <div class="right">
          <span v-if="errors" class="error">{{ errors }}</span>
        </div>
      </div>
      <div v-if="collapsed" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Color</th>
              <th>Set</th>
              <th>Surge</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            <AetheriaSlot color="blue" />
            <AetheriaSlot color="yellow" />
            <AetheriaSlot color="red" />
          </tbody>
        </table>
        <p class="note">
          Set bonuses stack by combined level (capped). Surges are temporary
          procs and don't change sheet values.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AetheriaSlot from "./AetheriaSlot.vue";

export default {
  name: "Aetheria",
  components: {
    AetheriaSlot,
  },
  computed: {
    collapsed() {
      return this.$store.getters.aetheriaPaneVisible;
    },
    errors() {
      return this.$store.getters.aetheriaErrors;
    },
  },
  methods: {
    toggle() {
      this.$store.commit("toggleAetheriaPane");
    },
  },
};
</script>

<style scoped>
.note {
  font-size: 0.85em;
  opacity: 0.7;
  margin-top: 0.5em;
}
</style>