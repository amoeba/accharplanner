<template>
  <li>
    <span>{{ name }}: {{ creation }} ({{ base }}) -> {{ buffed }}</span>
    <ul>
    <li>Invested: <input type="range" min="0" max="190" v-model="invested" /></li>
    <li>Buffs: <input type="range" min="0" max="8" v-model="buffLevel" /> {{ buffLevel }}</li>
    <li>Cantrip: <input type="range" min="0" max="4" v-model="cantrip" /> {{ cantripName }}</li>
    </ul>
  </li>
</template>

<script>
import Constants from "../constants";

export default {
  name: "Vital",
  props: {
    name: String
  },
  computed: {
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
