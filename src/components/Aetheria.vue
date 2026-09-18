<template>
  <div id="aetheria" class="pane items">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div>
          <h3>Aetheria</h3>
        </div>
      </div>
      <div v-if="collapsed" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Slot</th>
              <th>Color</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            <AetheriaSlot slot-id="slot_1" label="Slot 1" />
            <AetheriaSlot slot-id="slot_2" label="Slot 2" />
            <AetheriaSlot slot-id="slot_3" label="Slot 3" />
          </tbody>
        </table>
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
  },
  methods: {
    toggle() {
      this.$store.commit("toggleAetheriaPane");
    },
  },
};
</script>
