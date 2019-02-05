<template>
  <li>
    <span>{{ name }}: {{ creation }} + {{ invested }} = {{ base }} / {{ buffed }}</span>
    <ul>
    <li>Invested: <input type="range" min="0" max="190" v-model="invested" /></li>
    <li>Buffs: <input type="range" min="0" max="8" v-model="buffLevel" /> {{ buffLevel }}</li>
    </ul>
  </li>
</template>

<script>
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
  }
};
</script>
