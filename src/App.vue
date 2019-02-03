<template>
  <div id="app">
    <input type="checkbox" v-model="isBuffed" /> Buffs?
    <Attributes />
    <Skills />
    <textarea rows="20" cols="80" v-model="exportedCharacter">
    </textarea>
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
    exportedCharacter() {
        return this.$store.getters.exportedCharacter;
    },
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
