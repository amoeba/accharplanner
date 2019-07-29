<template>
  <tr>
    <td>
      {{ displayName }}
    </td>
    <td>
      <input type="range" min="0" v-bind:max="max" v-bind:value="invested" v-on:change="updateInvested" />
    </td>
    <td class="number">
      <input type="text" v-bind:value="invested" v-on:change="updateInvested" />
    </td>
  </tr>
</template>

<script>
import Constants from "../constants";

export default {
  name: "LuminanceAura",
  props: {
    name: String
  },
  computed: {
    displayName() {
      return Constants.LUMINANCE_AURA_NAME[this._props.name];
    },
    invested: {
      get() {
        return this.$store.state.character.luminance_auras[this._props.name].invested;
      },
      set(value) {
        this.$store.commit("updateLuminanceAuraInvested", {
          name: this._props.name,
          value: value
        });
      }
    },
    max() {
      return Constants.LUMINANCE_AURA_MAX_USES[this._props.name];
    }
  },
  methods: {
    updateInvested: function(e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 0;
      }

      if (
        value > Constants.LUMINANCE_AURA_MAX_USES[this._props.name]
      ) {
        value = Constants.LUMINANCE_AURA_MAX_USES[this._props.name]
      } else if (value < 0) {
        value = 0
      }

      this.$store.commit("updateLuminanceAuraInvested", {
        name: this._props.name,
        value: value
      });
    }
  }
};
</script>
