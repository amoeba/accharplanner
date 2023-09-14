<template>
  <tr>
    <td>
      <img
        :src="'/img/' + name + '.png'"
        :alt="displayName"
        width="20"
        height="20"
      />
    </td>
    <td>
      {{ displayName }}
      <span class="faded">{{ formula }}</span>
    </td>
    <td>&nbsp;</td>
    <td class="creation number">{{ creation }}</td>
    <td class="base number">{{ base }}</td>
    <td class="buffed number" v-bind:class="isBuffed ? 'isBuffed' : ''">
      {{ buffed }}
    </td>
    <td>
      <input type="range" min="0" :max="maxVitalInvested" v-model="invested" />
    </td>
    <td class="invested number">
      <input
        type="text"
        v-bind:value="invested"
        v-on:change="updateInvested"
        v-bind:tabindex="tabIndex"
      />
    </td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</template>

<script>
import { MAX_VITAL_INVESTED } from '../../constants';
import { VITAL_FORMULA } from "../../mappings";

export default {
  name: "Vital",
  props: {
    name: String,
    displayName: String,
    tabIndex: String,
  },
  computed: {
    formula() {
      return VITAL_FORMULA[this.name];
    },
    isBuffed() {
      return (
        Math.round(this.$store.getters[this.name + "Buffed"]) >
        Math.round(this.$store.getters[this.name + "Base"])
      );
    },
    creation() {
      return this.$store.getters[this.name + "Creation"];
    },
    base() {
      return Math.round(this.$store.getters[this.name + "Base"]);
    },
    buffed() {
      return Math.round(this.$store.getters[this.name + "Buffed"]);
    },
    invested: {
      get() {
        return this.$store.state.build.character.vitals[this.name].invested;
      },
      set(value) {
        this.$store.commit("updateVitalInvested", {
          name: this.name,
          value: value,
        });
      },
    },
  },
  data() {
    return {
      maxVitalInvested: MAX_VITAL_INVESTED
    }
  },
  methods: {
    updateInvested(e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 0;
      }

      if (this.$store.state.settings.infiniteMode){
        // Do nothing
      } else if (value > MAX_VITAL_INVESTED) {
        value = MAX_VITAL_INVESTED;
      } else if (value < 0) {
        value = 0;
      }

      this.$store.commit("updateVitalInvested", {
        name: this.name,
        value: value,
      });

      e.target.value = value;
    },
  },
};
</script>
