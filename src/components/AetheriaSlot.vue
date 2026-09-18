<template>
  <tr>
    <td :class="{ red: levelError }">
      {{ colorName }}
      <span class="faded">{{ extraInfo }}</span>
    </td>
    <td>
      <select v-model="selectedSet">
        <option value="">None</option>
        <option v-for="set in sets" :key="set" :value="set">
          {{ setName(set) }}
        </option>
      </select>
    </td>
    <td>
      <select v-model="selectedSurge" :disabled="!selectedSet">
        <option value="">None</option>
        <option v-for="surge in surges" :key="surge" :value="surge">
          {{ surgeName(surge) }}
        </option>
      </select>
    </td>
    <td>
      <select v-model="level" :disabled="!selectedSet">
        <option v-for="option in levelOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </td>
  </tr>
</template>

<script>
import {
  AETHERIA_SETS,
  AETHERIA_SURGES,
  AETHERIA_MIN_LEVEL_BY_COLOR,
  MAX_AETHERIA_LEVEL,
} from "../constants";
import {
  AETHERIA_COLOR_NAME,
  AETHERIA_COLOR_EXTRA_INFO,
  AETHERIA_SET_NAME,
  AETHERIA_SURGE_NAME,
} from "../mappings";

export default {
  name: "AetheriaSlot",
  props: {
    color: String,
  },
  computed: {
    slot() {
      return this.$store.state.build.character.aetheria[this.color];
    },
    colorName() {
      return AETHERIA_COLOR_NAME[this.color];
    },
    extraInfo() {
      return AETHERIA_COLOR_EXTRA_INFO[this.color];
    },
    levelError() {
      return (
        !!this.slot.set &&
        this.$store.state.build.character.level <
          AETHERIA_MIN_LEVEL_BY_COLOR[this.color]
      );
    },
    sets() {
      return AETHERIA_SETS;
    },
    surges() {
      return AETHERIA_SURGES;
    },
    levelOptions() {
      const options = [];

      for (let i = 0; i <= MAX_AETHERIA_LEVEL; i++) {
        options.push(i);
      }

      return options;
    },
    selectedSet: {
      get() {
        return this.slot.set || "";
      },
      set(value) {
        this.$store.commit("updateAetheria", {
          slot: this.color,
          field: "set",
          value,
        });
      },
    },
    selectedSurge: {
      get() {
        return this.slot.surge || "";
      },
      set(value) {
        this.$store.commit("updateAetheria", {
          slot: this.color,
          field: "surge",
          value,
        });
      },
    },
    level: {
      get() {
        return this.slot.level;
      },
      set(value) {
        this.$store.commit("updateAetheria", {
          slot: this.color,
          field: "level",
          value: Number(value),
        });
      },
    },
  },
  methods: {
    setName(id) {
      return AETHERIA_SET_NAME[id];
    },
    surgeName(id) {
      return AETHERIA_SURGE_NAME[id];
    },
  },
};
</script>