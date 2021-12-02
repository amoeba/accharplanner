<template>
  <tr>
    <td>
      <abbr v-if="hoverInfo" :title="hoverInfo">
        {{ displayName }}
      </abbr>
      <span v-else>
        {{ displayName }}
      </span>
      <span style="margin-left: 0.5em" class="faded">{{ extraInfo }}</span>
    </td>
    <td>
      <input
        type="range"
        min="0"
        v-bind:max="max"
        v-bind:value="invested"
        v-on:change="updateInvested"
      />
    </td>
    <td class="number">
      <input type="text" v-bind:value="invested" v-on:change="updateInvested" />
    </td>
  </tr>
</template>

<script>
import { LUMINANCE_AURA_MAX_USES } from "../constants";
import {
  LUMINANCE_AURA_NAME,
  LUMINANCE_AURA_HOVER_INFO,
  LUMINANCE_AURA_EXTRA_INFO,
} from "../mappings";

export default {
  name: "LuminanceAura",
  props: {
    name: String,
  },
  computed: {
    displayName() {
      return LUMINANCE_AURA_NAME[this.name];
    },
    hoverInfo() {
      return LUMINANCE_AURA_HOVER_INFO[this.name];
    },
    extraInfo() {
      return LUMINANCE_AURA_EXTRA_INFO[this.name];
    },
    invested: {
      get() {
        return this.$store.state.build.character.luminance_auras[this.name]
          .invested;
      },
      set(value) {
        this.$store.commit("updateLuminanceAuraInvested", {
          name: this.name,
          value: value,
        });
      },
    },
    max() {
      return LUMINANCE_AURA_MAX_USES[this.name];
    },
  },
  methods: {
    updateInvested: function (e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 0;
      }

      if (value > LUMINANCE_AURA_MAX_USES[this.name]) {
        value = LUMINANCE_AURA_MAX_USES[this.name];
      } else if (value < 0) {
        value = 0;
      }

      this.$store.commit("updateLuminanceAuraInvested", {
        name: this.name,
        value: value,
      });
    },
  },
};
</script>
