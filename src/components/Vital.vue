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
    </td>
    <td>&nbsp;</td>
    <td class="creation number">{{ creation }}</td>
    <td class="base number">{{ base }}</td>
    <td class="buffed number" v-bind:class="isBuffed ? 'isBuffed' : ''">
      {{ buffed }}
    </td>
    <td><input type="range" min="0" max="196" v-model="invested" /></td>
    <td class="invested number"><input type="text" v-bind:value="invested" v-on:change="updateInvested" v-bind:tabindex="tabIndex" /></td>
    <td>
      <select v-model="buffLevel">
        <option value="0">None</option>
        <option value="1">I</option>
        <option value="2">II</option>
        <option value="3">III</option>
        <option value="4">IV</option>
        <option value="5">V</option>
        <option value="6">VI</option>
        <option value="7">VII</option>
        <option value="8">VIII</option>
      </select>
    </td>
    <td>
      <select v-model="cantrip">
        <option value="0">None</option>
        <option value="1">Minor</option>
        <option value="2">Major</option>
        <option value="3">Epic</option>
        <option value="4">Legendary</option>
      </select>
    </td>
  </tr>
</template>

<script>
import Constants from "../constants";

export default {
  name: "Vital",
  props: {
    name: String,
    displayName: String,
    tabIndex: String
  },
  computed: {
    isBuffed() {
      return (
        this.$store.state.character.vitals[this._props.name].buff > 0 ||
        this.$store.state.character.vitals[this._props.name].cantrip > 0
      );
    },
    creation() {
      return this.$store.getters[this._props.name + "Creation"];
    },
    base() {
      return Math.round(this.$store.getters[this._props.name + "Base"]);
    },
    buffed() {
      return Math.round(this.$store.getters[this._props.name + "Buffed"]);
    },
    invested: {
      get() {
        return this.$store.state.character.vitals[this._props.name].invested;
      },
      set(value) {
        this.$store.commit("updateVitalInvested", {
          name: this._props.name,
          value: value
        });
      }
    },
    buffLevel: {
      get() {
        return this.$store.state.character.vitals[this._props.name].buff;
      },
      set(value) {
        this.$store.commit("updateVitalBuff", {
          name: this._props.name,
          value: value
        });
      }
    },
    buffName() {
      return Constants.BUFF_NAME[
        this.$store.state.character.vitals[this._props.name].buff
      ];
    },
    cantrip: {
      get() {
        return this.$store.state.character.vitals[this._props.name].cantrip;
      },
      set(value) {
        this.$store.commit("updateVitalCantrip", {
          name: this._props.name,
          value: value
        });
      }
    },
    cantripName() {
      return Constants.CANTRIP_NAME[
        this.$store.state.character.vitals[this._props.name].cantrip
      ];
    }
  },
  methods: {
    updateInvested (e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 0;
      }

      if (value > 196) {
        value = 196;
      } else if (value < 0) {
        value = 0;
      }

      this.$store.commit("updateVitalInvested", {
        name: this._props.name,
        value: value
      });

      e.target.value = value;
    }
  }
};
</script>
