<template>
  <li>
    <span>{{ name }}: {{ creation }} ({{ base }}) -> {{buffed}}</span>
    <ul>
      <li>Creation: <input type="range" min="10" max="100" v-model="creation" /></li>
      <li>Invested: <input type="range" min="0" max="190" v-model="invested" /></li>
      <li>Buffs: <input type="range" min="0" max="8" v-model="buffLevel" /> {{ buffLevel }}</li>
      <li>Cantrip: <input type="range" min="0" max="4" v-model="cantrip" /> {{ cantripName }}</li>
    </ul>
  </li>
</template>

<script>
import Constants from "../constants";

export default {
  name: "Attribute",
  props: {
    name: String
  },
  computed: {
    creation: {
      get() {
        return this.$store.state.character.attributes[this._props.name].creation;
      },
      set(value) {
        this.$store.commit('updateAttributeCreation', { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    invested: {
      get() {
        return this.$store.state.character.attributes[this._props.name].invested;
      },
      set(value) {
        this.$store.commit('updateAttributeInvested', { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    base () {
      return this.$store.getters[this._props.name + "Base"];
    },
    buffed () {
      return this.$store.getters[this._props.name + "Buffed"];
    },
    buffLevel: {
      get() {
        return this.$store.state.character.attributes[this._props.name].buff;
      },
      set(value) {
        this.$store.commit('updateAttributeBuff', { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    cantrip: {
      get() {
        return this.$store.state.character.attributes[this._props.name].cantrip;
      },
      set(value) {
        this.$store.commit('updateAttributeCantrip', { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    cantripName () {
      return Constants.CANTRIP_NAME[this.$store.state.character.attributes[this._props.name].cantrip];
    }
  }
};
</script>
