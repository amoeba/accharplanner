<template>
  <div id="app">
    <ul>
      <li><input type="range" min="5" max="275" v-model="level" /> Level {{ level }}</li>
      <li>XP Cost: {{ cost }}</li>
      <li>Min. Level: {{ requiredLevel }}</li>
      <li>Invested <input type="range" min="0" max="226" value="0" v-on:change="changeAllInvestments" /></li>
      <li>Buffed <input type="range" min="0" max="8" v-on:change="changeAllBuffs" /></li>

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
  },
  methods: {
    changeAllInvestments (e) {
      this.$store.commit("changeAllInvestment", e.target.value);
    },
    changeAllBuffs (e) {
      this.$store.commit("changeAllBuffs", e.target.value);
    }
  }
};
</script>

<style>
#app {

}
</style>
