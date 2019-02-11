<template>
  <div id="planner">
    <h1>Overly-Detailed Asheron's Call Character Planner (ODACCP)</h1>
    <div class="row">
      <div class="header">
        <h3>Character</h3>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td><input id="charname" type="text" v-model="name" /></td>
            </tr>
          <tr>
            <th>Level</th>
            <td>
              <input type="range" min="1" max="275" v-model="level" />
              <span>{{ level }}</span>
            </td>
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
                <input type="radio" id="female" value="Female" v-model="gender">
                <label for="female">Female</label>
                <input type="radio" id="male" value="Male" v-model="gender">
                <label for="male">Male</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="header">
        <h3>XP & Luminance</h3>
        <table>
          <tbody>
            <tr>
              <th>XP Earned</th>
              <td>{{ totalXPEarned }}</td>
            </tr>
            <tr>
              <th>XP Spent</th>
              <td>
                <span>{{ totalXPInvested }}</span><br />
                <span v-bind:class="isOverspent ? 'red' : 'gray'">Requires >= level {{ requiredLevel }}</span>
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
        <h3>Nobs &amp; Dials</h3>
        <table>
          <tbody>
            <tr>
            <th>Times Enlightened</th>
            <td>
              <input type="range" min="1" max="5" v-model="timesEnlightened" />
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
      <div id="attributes_and_vitals">
        <table>
          <Attributes />
          <Vitals />
        </table>
      </div>
      <div id="skills">
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
    isOverspent () {
      return Number(this.$store.getters.totalXPInvested) > Number(this.$store.getters.totalXPEarned);
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
  margin-bottom: 0.5rem;
}

@media (max-width: 900px) {
  .header {
    width: 50%;
  }

  #attributes_and_vitals,
  #skills {
    width: 100%;
  }
}

@media (min-width: 900px) {
  .header {
    width: 25%;
  }


  #attributes_and_vitals,
  #skills {
  }

  #attributes_and_vitals {
    margin-right: 0.25rem;
  }    
  
  #skills {
    margin-left: 0.25rem;
  }
}


#attributes input[type="range"],
#vitals input[type="range"],
#skills input[type="range"] {
  width: 50px;
}

input, select {
  font-size: 100%;
}
#charname {
  border: none;
}

button {
  width: 50px;
}

table {
  border-collapse: collapse;
  margin: 0;
  width: 100%;
}

td,
th {
  padding: 1px 3px;
  text-align: left;
}

#attributes th,
#attributes td,
#vitals th,
#vitals td,
#skills th,
#skills td {
  height: 20px;
  margin: 0px;
  padding: 2px 2px;
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

#extraskillcredits ul {
  list-style-type: none;
  margin: 0.5rem;
  padding: 0;
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

.red {
  color: red;
}

.gray {
  color: gray;
}
</style>
