<template>
  <li>
    <span>{{ name }}: {{ creation }} + {{ invested }} = {{ base }}</span>
    Creation: <input type="range" min="10" max="100" v-model="creation" />
    Invested: <input type="range" min="0" max="190" v-model="invested" />
    Buffs: <input type="range" min="0" max="8" v-model="buffLevel" /> {{ buffLevel }}
  </li>
</template>

<script>
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
  }
};
</script>
