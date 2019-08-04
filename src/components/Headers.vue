
<template>
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
                <option v-for="race in races" v-bind:key="race" >
                  {{ race }}
                </option>
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
              <input class="number" type="text" v-bind:value="level" v-on:change="updateLevel" />
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
              <input class="number" type="text" v-bind:value="timesEnlightened" v-on:change="updateTimesEnlightened" />
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
                <option value="8">VIII</option>
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
</template>

<script>
import ExtraSkillCredits from "./ExtraSkillCredits.vue";
import Constants from "../constants";

export default {
  name: "Headers",
  components: {
    ExtraSkillCredits,
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
    races() {
      return Constants.RACE
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
    updateLevel(e) {
      let actual = Math.round(Number(e.target.value));

      if (isNaN(actual) || actual < Constants.MIN_LEVEL) {
        actual = Constants.MIN_LEVEL;
      } else if (actual > Constants.MAX_LEVEL) {
        actual = Constants.MAX_LEVEL;
      }

      this.$store.commit("updateLevel", actual);
    },
    updateTimesEnlightened(e) {
      let actual = Math.round(Number(e.target.value));

      if (isNaN(actual) || actual < Constants.MIN_TIMES_ENLIGHTENDED) {
        actual = Constants.MIN_TIMES_ENLIGHTENDED;
      } else if (actual > Constants.MAX_TIMES_ENLIGHTENDED) {
        actual = Constants.MAX_TIMES_ENLIGHTENDED;
      }
      
      this.$store.commit("updateTimesEnlightened", actual);
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
<style></style>
