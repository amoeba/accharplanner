<template>
  <div id="app">
    <ul>
      <li><input type="checkbox" v-model="isBuffed" /> Buffs? {{ isBuffed }}</li>
      <li><input type="range" min="5" max="275" v-model="level" /> Level {{ level }}</li>
      <li>{{ cost }}</li>
    </ul>
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
    cost () {
      return Number(this.$store.getters.totalXPCost).toLocaleString();
    },
    level: {
      get () {
        return this.$store.state.character.level;
      },
      set (value) {
        this.$store.commit('updateLevel', value);
      }
    },
    exportedCharacter() {
        return this.$store.getters.exportedCharacter;
    },
    isBuffed: {
      get () {
        return this.$store.state.isBuffed;
      },
      set (value) {
        this.$store.commit('updateBuffed', value);
      }
    }
  }
};
</script>

<style>
#app {

}
</style>
