<template>
  <tr>
    <td>{{ label }}</td>
    <td>
      <select v-model="color">
        <option value="">None</option>
        <option value="blue">Blue (Protection)</option>
        <option value="yellow">Yellow (Destruction)</option>
        <option value="red">Red (Regeneration)</option>
      </select>
    </td>
    <td>
      <select v-model="level" :disabled="!color">
        <option :value="0">None</option>
        <option :value="1">Coalesced</option>
        <option :value="2">Luminance</option>
        <option :value="3">Fettered</option>
        <option :value="4">Empowered</option>
        <option :value="5">Unleashed</option>
      </select>
    </td>
  </tr>
</template>

<script>
export default {
  name: "AetheriaSlot",
  props: {
    slotId: String,
    label: String,
  },
  computed: {
    color: {
      get() {
        return this.$store.state.build.character.aetheria[this.slotId].color || "";
      },
      set(value) {
        this.$store.commit("updateAetheria", {
          slot: this.slotId,
          field: "color",
          value: value,
        });
      },
    },
    level: {
      get() {
        return this.$store.state.build.character.aetheria[this.slotId].level;
      },
      set(value) {
        this.$store.commit("updateAetheria", {
          slot: this.slotId,
          field: "level",
          value: Number(value),
        });
      },
    },
  },
};
</script>
