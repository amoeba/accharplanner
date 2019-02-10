<template>
  <div id="planner">
    <h1>Overly-Detailed Asheron's Call Character Planner (ODACCP)</h1>
    <div class="row">
      <table>
        <tbody>
          <tr>
            <th>Level</th>
            <td>
              <input type="range" min="1" max="275" v-model="level" />
              {{ level }}
            </td>
          </tr>
          <tr>
            <th>Times Enlightened</th>
            <td>
              <input type="range" min="1" max="5" v-model="timesEnlightened" />
              {{ timesEnlightened }}
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <h3>XP, Buffs, Cantrips</h3>
        <table>
          <tbody>
            <tr>
              <th>XP Earned</th>
              <td>{{ totalXPEarned }}</td>
            </tr>
            <tr>
              <th>XP Spent</th>
              <td>{{ totalXPInvested }}</td>
              <td>(Requires at least level {{ requiredLevel }})</td>
            </tr>
            <tr>
              <th>Lum. XP Spent</th>
              <td>{{ totalLuminanceXPSpent }}</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th>Invested</th>
              <td>
                <input
                  type="range"
                  min="0"
                  max="226"
                  value="0"
                  v-on:change="changeAllInvestments"
                />
              </td>
            </tr>
            <tr>
              <th>Buffs</th>
              <td>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value="0"
                  v-on:change="changeAllBuffs"
                />
              </td>
            </tr>
            <tr>
              <th>Cantrips</th>
              <td>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value="0"
                  v-on:change="changeAllCantrips"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ExtraSkillCredits />
    </div>

    <div class="row">
      <table>
        <Attributes />
        <Vitals />
      </table>

      <Skills />
    </div>
  </div>
</template>

<script>
import ExtraSkillCredits from "./components/ExtraSkillCredits.vue";
import Attributes from "./components/Attributes.vue";
import Vitals from "./components/Vitals.vue";
import Skills from "./components/Skills.vue";

export default {
  name: "planner",
  components: {
    ExtraSkillCredits,
    Attributes,
    Vitals,
    Skills
  },
  computed: {
    totalXPEarned() {
      return Number(this.$store.getters.totalXPEarned).toLocaleString();
    },
    totalXPInvested() {
      return Number(this.$store.getters.totalXPInvested).toLocaleString();
    },
    skillPointsSpent() {
      return this.$store.getters.skillPointsSpent;
    },
    skillPointsAvailable() {
      return this.$store.getters.skillPointsAvailable;
    },
    augmentationsSpent() {
      return this.$store.getters.augmentationsSpent;
    },
    requiredLevel() {
      return this.$store.getters.requiredLevel;
    },
    totalLuminanceXPSpent() {
      return this.$store.getters.totalLuminanceXPSpent.toLocaleString();
    },
    level: {
      get() {
        return this.$store.state.character.level;
      },
      set(value) {
        this.$store.commit("updateLevel", value);
      }
    },

    timesEnlightened: {
      get() {
        return this.$store.state.character.timesEnlightened;
      },
      set(value) {
        this.$store.commit("updateTimesEnlightened", value);
      }
    },
    exportedCharacter() {
      return this.$store.getters.exportedCharacter;
    }
  },
  methods: {
    changeAllInvestments(e) {
      this.$store.commit("changeAllInvestment", e.target.value);
    },
    changeAllBuffs(e) {
      this.$store.commit("changeAllBuffs", e.target.value);
    },
    changeAllCantrips(e) {
      this.$store.commit("changeAllCantrips", e.target.value);
    }
  }
};
</script>

<style>
#planner {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  min-width: 660px;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#attributes input[type="range"],
#vitals input[type="range"],
#skills input[type="range"] {
  width: 50px;
}

button {
  width: 50px;
}

table {
  border-collapse: collapse;
  margin: 0.5rem;
}

td,
th {
  padding: 1px 3px;
  text-align: left;
}

#attributes tr:first-child > th,
#vitals tr:first-child > th,
#skills tr:first-child > th {
  font-size: 125%;
}

#vitals > tr:first-child > th,
#skills > tr:first-child > th {
  padding-top: 1.5rem;
}

tr.headers th {
  background-color: #ccc;
}

tr.controls th {
  background-color: #eee;
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

.center {
  text-align: center;
}

#export {
  font-family: monospace;
}
</style>
