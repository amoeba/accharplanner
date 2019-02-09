<template>
  <tr>
    <td>{{ displayName }}</td>
    <td>&nbsp;</td>
    <td class="number">{{ creation }}</td>
    <td><input type="range" min="0" max="190" v-model="invested" /></td>
    <td class="number">{{ invested }}</td>
    <td class="number">{{ base }}</td>
    <td v-bind:class="isBuffed ? 'buffed' : ''">{{ buffed }}</td>
    <td><input type="range" min="0" max="8" v-model="buffLevel" /></td>
    <td>{{ buffName }}</td>
    <td><input type="range" min="0" max="4" v-model="cantrip" /></td>
    <td>{{ cantripName }}</td>
  </tr>
</template>

<script>
import Constants from "../constants";

export default {
  name: "Vital",
  props: {
    name: String,
    displayName: String
  },
  computed: {
    isBuffed () {
      return this.$store.state.character.vitals[this._props.name].buff > 0 || this.$store.state.character.vitals[this._props.name].cantrip > 0;
    },
    creation () {
      return this.$store.getters[this._props.name + "Creation"];
    },
    base () {
      return this.$store.getters[this._props.name + "Base"];
    },
    buffed () {
      return this.$store.getters[this._props.name + "Buffed"];
    },
    invested: {
      get() {
        return this.$store.state.character.vitals[this._props.name].invested;
      },
      set(value) {
        this.$store.commit('updateVitalInvested', { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    buffLevel: {
      get() {
        return this.$store.state.character.vitals[this._props.name].buff;
      },
      set(value) {
        this.$store.commit('updateVitalBuff', { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    buffName () {
      return Constants.BUFF_NAME[this.$store.state.character.vitals[this._props.name].buff];
    },
    cantrip: {
      get() {
        return this.$store.state.character.vitals[this._props.name].cantrip;
      },
      set(value) {
        this.$store.commit('updateVitalCantrip', { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    cantripName () {
      return Constants.CANTRIP_NAME[this.$store.state.character.vitals[this._props.name].cantrip];
    }
  }
};
</script>
