<template>
  <tr>
    <td>
      {{ displayName }} <span class="faded">{{ extraInfo }}</span>
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
import { AUGMENTATION_MAX_USES } from "../constants";
import { AUGMENTATION_NAME, AUGMENTATION_EXTRA_INFO } from "../mappings";

export default {
  name: "Augmentation",
  props: {
    name: String
  },
  computed: {
    displayName() {
      return AUGMENTATION_NAME[this._props.name];
    },
    extraInfo() {
      return AUGMENTATION_EXTRA_INFO[this._props.name];
    },
    invested: {
      get() {
        return this.$store.state.build.character.augmentations[this._props.name]
          .invested;
      },
      set(value) {
        this.$store.commit("updateAugmentationInvested", {
          name: this._props.name,
          value: value
        });
      }
    },
    max() {
      return AUGMENTATION_MAX_USES[this._props.name];
    }
  },
  methods: {
    updateInvested: function(e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 0;
      }

      if (value > AUGMENTATION_MAX_USES[this._props.name]) {
        value = AUGMENTATION_MAX_USES[this._props.name];
      } else if (value < 0) {
        value = 0;
      }

      this.$store.commit("updateAugmentationInvested", {
        name: this._props.name,
        value: value
      });
    }
  }
};
</script>
