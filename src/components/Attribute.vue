<template>
  <li>
    <span>{{ name }}: {{ value }}</span>
    <input type="range" v-model="value" />
  </li>
</template>

<script>
export default {
  name: "Attribute",
  props: {
    name: String
  },
  computed: {
    value: {
      get() {
        return this.$store.state.character.attributes[this._props.name]
      },
      set(value) {
        this.$store.commit('updateAttribute', { 
          "name": this._props.name, 
          "value": value 
        });
      }
    }
  }
};
</script>
