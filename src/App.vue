<template>
  <div id="app">
    <h1>Overly Detailed Asheron's Call Character Planner</h1>
    Level <input type="range" min="1" max="275" v-model="level" /> {{level}}
    <h3>XP, Buffs, Cantrips</h3>
    <table>
      <tbody>
        <tr>
          <th>XP Spent</th>
          <td>{{ totalXPInvested }}</td>
          <td>(Requires level {{ requiredLevel }})</td>
        </tr>
        <tr>
          <th>Luminance XP Spent</th>
          <td>{{ totalLuminanceXPSpent }}</td>
          <td>&nbsp;</td>
        </tr>
      <tr>
        <th>Invested</th>
        <td><input type="range" min="0" max="226" value="0" v-on:change="changeAllInvestments" /></td>
      </tr>
      <tr>
        <th>Buffs</th>
        <td><input type="range" min="0" max="8" v-on:change="changeAllBuffs" /></td>
      </tr>
      <tr>
        <th>Cantrips</th>
        <td><input type="range" min="0" max="4" v-on:change="changeAllCantrips" /></td>
      </tr>
      </tbody>
    </table>
    <ul class="xpbuffscantrips">

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
    totalLuminanceXPSpent () {
      return this.$store.getters.totalLuminanceXPSpent.toLocaleString();
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

input[type='range'] {
  width: 50px;
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

ul.xpbuffscantrips {
  list-style-type: none;
  margin: 0px 0px 1.5rem 1.5rem;
  padding: 0px;
}

ul.xpbuffscantrips li {
  display: inline-block;
  margin-right: 1.5rem;
}

.number {
  min-width: 50px;
}

.buffed {
  color: green;
  font-weight: bold;
}

.error {
  color: red;
}

#export {
  font-family: monospace;
}
</style>
