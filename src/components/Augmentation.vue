<template>
  <tr>
    <td>
      {{ displayName }}
      <span class="faded">{{ extraInfo }}</span>
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
    name: String,
  },
  computed: {
    displayName() {
      return AUGMENTATION_NAME[this.name];
    },
    extraInfo() {
      return AUGMENTATION_EXTRA_INFO[this.name];
    },
    invested: {
      get() {
        return this.$store.state.build.character.augmentations[this.name]
          .invested;
      },
    },
    max() {
      return AUGMENTATION_MAX_USES[this.name];
    },
  },
  methods: {
    updateInvested: function (e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 0;
      }

      if (value > AUGMENTATION_MAX_USES[this.name]) {
        value = AUGMENTATION_MAX_USES[this.name];
      } else if (value < 0) {
        value = 0;
      }

      this.$store.commit("updateAugmentationInvested", {
        name: this.name,
        value: value,
      });
    },
  },
};
</script>
