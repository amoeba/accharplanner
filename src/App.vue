<template>
  <div id="app">
    <input type="checkbox" v-model="isBuffed" /> Buffs?
    <Attributes />
    <Skills />
  </div>
</template>

<script>
import Attributes from "./components/Attributes.vue";
import Skills from "./components/Skills.vue";

export default {
  name: "app",
  components: {
    Attributes,
    Skills
  },
  computed: {
    isBuffed: {
      get () {
        return this.$store.state.isBuffed
      },
      set (value) {
        this.$store.commit('updateBuffed', value)
      }
    }
  }
};
</script>

<style>
#app {

}
</style>
