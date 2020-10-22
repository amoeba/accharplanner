<template>
  <tr>
    <td>
      {{ displayName }}
      <span class="faded">{{ extraInfo }}</span>
    </td>
    <td>
      <input v-bind:id="id" v-bind:name="id" type="range" min="0" max="9" v-model="equipped" />
    </td>
    <td class="number">
      <input v-model="equipped" type="text" />
    </td>
  </tr>
</template>

<script>
import { ARMOR_SET_NAME, ARMOR_SET_NAME_EXTRA_INFO } from "../mappings";

export default {
  name: "ArmorSet",
  props: {
    id: String,
    name: String
  },
  computed: {
    displayName() {
      return ARMOR_SET_NAME[this._props.id];
    },
    extraInfo() {
      return ARMOR_SET_NAME_EXTRA_INFO[this._props.id];
    },
    equipped: {
      get() {
        return this.$store.state.build.character.armor_sets[this._props.id].equipped;
      },

      set(value) {
        this.$store.commit("updateArmorSet", {
          id: this._props.id,
          value: Number(value)
        });
      }
    }
  }
};
</script>
<style></style>
