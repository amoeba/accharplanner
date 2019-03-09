<template>
  <div id="planner">
    <Notifications />
    <header>
      <a href="//planner.treestats.net">
        <h1>Overly-Detailed Asheron's Call Character Planner (ODACCP)</h1>
      </a>
    </header>
    <div class="headers">
      <div class="header">
        <h3>Character</h3>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td><input id="charname" type="text" v-model="name" /></td>
            </tr>
            <tr>
              <th>Race</th>
              <td>
                <select v-model="race">
                  <option>Aluvian</option>
                  <option>Gharu'ndim</option>
                  <option>Sho</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>
                <input
                  type="radio"
                  id="female"
                  value="Female"
                  v-model="gender"
                />
                <label for="female">Female</label>
                <input type="radio" id="male" value="Male" v-model="gender" />
                <label for="male">Male</label>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td><button v-on:click="reset">Reset Everything</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="header">
        <h3>XP &amp; Luminance</h3>
        <table>
          <tbody>
            <tr>
              <th>XP Earned</th>
              <td>{{ totalXPEarned }}</td>
            </tr>
            <tr>
              <th>XP Spent</th>
              <td>
                <span>{{ totalXPInvested }}</span
                ><br />
                <span v-bind:class="isOverspent ? 'red' : 'gray'">{{
                  requiredLevel
                }}</span>
              </td>
            </tr>
            <tr>
              <th>Lum. XP Spent</th>
              <td>{{ totalLuminanceXPSpent }}</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="header">
        <h3>Knobs &amp; Dials</h3>
        <table>
          <tbody>
            <tr>
              <th>Level</th>
              <td>
                <input type="range" min="1" max="275" v-model="level" />
                <span>{{ level }}</span>
              </td>
            </tr>
            <tr>
              <th>Times Enlightened</th>
              <td>
                <input
                  type="range"
                  min="0"
                  max="5"
                  v-model="timesEnlightened"
                />
                {{ timesEnlightened }}
              </td>
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
                <select v-on:change="changeAllBuffs">
                  <option value="0">None</option>
                  <option value="1">I</option>
                  <option value="2">II</option>
                  <option value="3">III</option>
                  <option value="4">IV</option>
                  <option value="5">V</option>
                  <option value="6">VI</option>
                  <option value="7">VII</option>
                  <option value="8">VII</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Cantrips</th>
              <td>
                <select v-on:change="changeAllCantrips">
                  <option value="0">None</option>
                  <option value="1">Minor</option>
                  <option value="2">Major</option>
                  <option value="3">Epic</option>
                  <option value="4">Legendary</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ExtraSkillCredits />
    </div>
    <div class="row panes">
      <div id="attributes_and_vitals" class="pane">
        <table>
          <Attributes />
          <Vitals />
        </table>
      </div>
      <div id="skills" class="pane">
        <Skills />
      </div>
    </div>
  </div>
</template>

<script>
import ExtraSkillCredits from "./components/ExtraSkillCredits.vue";
import Attributes from "./components/Attributes.vue";
import Vitals from "./components/Vitals.vue";
import Skills from "./components/Skills.vue";
import Notifications from "./components/Notifications.vue";

export default {
  name: "planner",
  components: {
    ExtraSkillCredits,
    Attributes,
    Vitals,
    Skills,
    Notifications
  },
  computed: {
    totalXPEarned() {
      return Number(this.$store.getters.totalXPEarned).toLocaleString();
    },
    totalXPInvested() {
      return Number(this.$store.getters.totalXPInvested).toLocaleString();
    },
    isOverspent() {
      return (
        Number(this.$store.getters.totalXPInvested) >
        Number(this.$store.getters.totalXPEarned)
      );
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
    name: {
      get() {
        return this.$store.state.character.name;
      },
      set(value) {
        this.$store.commit("updateName", value);
      }
    },
    level: {
      get() {
        return this.$store.state.character.level;
      },
      set(value) {
        this.$store.commit("updateLevel", value);
      }
    },
    race: {
      get() {
        return this.$store.state.character.race;
      },
      set(value) {
        this.$store.commit("updateRace", value);
      }
    },
    gender: {
      get() {
        return this.$store.state.character.gender;
      },
      set(value) {
        this.$store.commit("updateGender", value);
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
    reset() {
      this.$store.commit("reset");
    },
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
/* Overall layout */
#planner {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
}

header {
  padding: 0.5rem;
}

header h1 {
  margin: 0;
}

header a,
header a:visited {
  color: black;
  text-decoration: none;
}

/* Grid */
.headers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.panes {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 1300px) {
  #planner {
    max-width: 660px;
  }

  .headers {
    grid-template-columns: 1fr 1fr;
  }

  .panes {
    grid-template-columns: 1fr;
  }
}

/* General stuff */
table {
  width: 100%;
}

input,
select {
  font-size: 100%;
}

table {
  border-collapse: collapse;
  margin: 0;
}

td,
th {
  padding: 1px 3px;
  text-align: left;
}

th,
td {
  padding: 2px 3px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

/* Headers */
.headers {
  margin-bottom: 1.5rem;
}

.header {
  padding: 0.5rem;
}

.header h3 {
  border-bottom: 1px solid #ccc;
  margin: 0px;
  padding-bottom: 0.25rem;
}

.header th,
.header td {
  vertical-align: top;
}

#charname {
  border: none;
}

/* Panes */
.pane {
  padding: 0.5rem;
}

#attributes input[type="range"],
#vitals input[type="range"],
#skills input[type="range"] {
  width: 50px;
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

tr.pane-header th {
  background-color: #ccc;
}

tr.controls th {
  background-color: #eee;
}

/* Utility classes */
.number {
  min-width: 2rem;
  text-align: center;
}

.number input {
  width: 2rem;
}

.isBuffed {
  color: green;
  font-weight: bold;
}

.error {
  color: red;
}

.center {
  text-align: center;
}

.red {
  color: red;
}

.gray {
  color: gray;
}

.base {
  border-left: 1px solid #ccc;
  padding-left: 8px;
}

.buffed {
  border-right: 1px solid #ccc;
}

/* Notifications */
#notifications {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  width: 300px;
  z-index: 100;
}

.notification {
  position: relative;
  background-color: #ff0000;
  color: white;
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 95%;
  cursor: pointer;
}

.success {
  background-color: green;
}

.failure {
  background-color: red;
}
</style>
