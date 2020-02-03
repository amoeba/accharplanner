<template>
  <tr>
    <td>
      {{ displayName }} <span class="faded">{{extraInfo}}</span>
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
import { LUMINANCE_AURA_MAX_USES } from "../constants";
import { LUMINANCE_AURA_NAME, LUMINANCE_AURA_EXTRA_INFO } from "../mappings";

export default {
  name: "LuminanceAura",
  props: {
    name: String
  },
  computed: {
    displayName() {
      return LUMINANCE_AURA_NAME[this._props.name];
    },
    extraInfo() {
      return LUMINANCE_AURA_EXTRA_INFO[this._props.name];
    },
    invested: {
      get() {
        return this.$store.state.build.character.luminance_auras[this._props.name].invested;
      },
      set(value) {
        this.$store.commit("updateLuminanceAuraInvested", {
          name: this._props.name,
          value: value
        });
      }
    },
    max() {
      return LUMINANCE_AURA_MAX_USES[this._props.name];
    }
  },
  methods: {
    updateInvested: function(e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 0;
      }

      if (
        value > LUMINANCE_AURA_MAX_USES[this._props.name]
      ) {
        value = LUMINANCE_AURA_MAX_USES[this._props.name]
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
