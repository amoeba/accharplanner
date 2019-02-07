<template>
  <div id="app">
    <h1>Overly Detailed Asheron's Call Character Planner</h1>
    <ul>
      <li>Level <input type="range" min="5" max="275" v-model="level" /> {{ level }}</li>
      <li>XP spent: {{ totalXPInvested }} / {{ totalXPEarned }}</li>
      <li>Min. Level: {{ requiredLevel }}</li>
      <li>Invested <input type="range" min="0" max="226" value="0" v-on:change="changeAllInvestments" /></li>
      <li>Buffs <input type="range" min="0" max="8" v-on:change="changeAllBuffs" /></li>
      <li>Cantrips <input type="range" min="0" max="4" v-on:change="changeAllCantrips" /></li>
      <li>skill points {{ skillPointsSpent }} / {{ skillPointsAvailable }}</li>
      <li>Augs required {{ augmentationsSpent }}</li>
    </ul>
    <ExtraSkillCredits />
    <Attributes />
    <Vitals />
    <Skills />
  </div>
</template>

<script>
import ExtraSkillCredits from "./components/ExtraSkillCredits.vue";
import Attributes from "./components/Attributes.vue";
import Vitals from "./components/Vitals.vue";
import Skills from "./components/Skills.vue";

export default {
  name: "app",
  components: {
    ExtraSkillCredits,
    Attributes,
    Vitals,
    Skills
  },
  computed: {
    totalXPEarned () {
      return Number(this.$store.getters.totalXPEarned).toLocaleString();
    },
    totalXPInvested () {
      return Number(this.$store.getters.totalXPInvested).toLocaleString();
    },
    skillPointsSpent () {
      return this.$store.getters.skillPointsSpent;
    },
    skillPointsAvailable () {
      return this.$store.getters.skillPointsAvailable;
    },
    augmentationsSpent () {
      return this.$store.getters.augmentationsSpent;
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
    },
    changeAllCantrips (e) {
      this.$store.commit("changeAllCantrips", e.target.value);
    }
  }
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
}

table {
}

td,
th {
  padding: 1px 3px;
  text-align: left;
}

#attributes > tr:first-child > th,
#vitals > tr:first-child > th,
#skills > tr:first-child > th {
  font-size: 125%;
}

#vitals > tr:first-child > th,
#skills > tr:first-child > th {
  padding-top: 1.5rem;
}

tr.headers th {
  background-color: #CCC;
}

tr.controls th {
  background-color: #EEE;
}

.number {
  min-width: 50px;
}

.buffed {
  color: green;
  font-weight: bold;
}

#export {
  font-family: monospace;
}
</style>
