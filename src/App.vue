<template>
  <div id="app">
    <ul>
      <li><input type="range" min="5" max="275" v-model="level" /> Level {{ level }}</li>
      <li>XP Cost: {{ cost }}</li>
      <li>Min. Level: {{ requiredLevel }}</li>
    </ul>
    <Attributes />
    <Vitals />
    <Skills />
    <textarea rows="20" cols="80" v-model="exportedCharacter">
    </textarea>
  </div>
</template>

<script>
import Attributes from "./components/Attributes.vue";
import Vitals from "./components/Vitals.vue";
import Skills from "./components/Skills.vue";

export default {
  name: "app",
  components: {
    Attributes,
    Vitals,
    Skills
  },
  computed: {
    cost () {
      return Number(this.$store.getters.totalXPCost).toLocaleString();
    },
    requiredLevel () {
      return this.$store.getters.requiredLevel;
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
    }
  }
};
</script>

<style>
#app {

}
</style>
