<template>
  <tr>
    <td>
      {{ name }}
    </td>
    <td>      
      <button v-if="canIncrease" v-on:click="increaseTraining">+</button>
    </td>
    <td>
      <button v-if="canDecrease" v-on:click="decreaseTraining">-</button>
    </td>
    <td>
      <div v-if="canInvest">
        <input type="range" min="0" v-bind:max="maxInvestment" v-model="invested" />
      </div>
    </td>
    <td class="number">{{ invested }}</td>
    <td class="number">{{ base }}</td>
    <td v-bind:class="isBuffed ? 'buffed' : ''">{{ buffed }}</td>
    <td><input type="range" min="0" max="8" v-model="buffLevel" /></td>
    <td>{{ buffLevel }}</td>
    <td><input type="range" min="0" max="4" v-model="cantrip" /></td>
    <td>{{ cantripName }}</td>
  </tr>
</template>

<script>
import Constants from "../constants";

export default {
  name: "Skill",
  props: {
    name: String
  },
  computed: {
    isBuffed () {
      return this.$store.state.character.skills[this._props.name].buff > 0 || this.$store.state.character.skills[this._props.name].cantrip > 0;
    },
    canIncrease () {
      // Can't if already specialized
      if (this.$store.state.character.skills[this._props.name].training == Constants.TRAINING.SPECIALIZED) {
        return false;
      }

      // Can't if out of credits
      let training = this.$store.state.character.skills[this._props.name].training;
      let newTraining = training = Constants.TRAINING.TRAINED ? Constants.TRAINING.SPECIALIZED : Constants.TRAINED.TRAINED

      if (this.$store.getters.skillPointsSpent + Constants.COST_SKILL_POINTS[this._props.name][newTraining] > this.$store.getters.skillPointsAvailable) {
        return false;
      }

      // Can't if would push you over 70 max spec'd credits
      if (this.$store.getters.skillPointsSpent + Constants.COST_SKILL_POINTS[this._props.name][newTraining] > 70) {
        return false;
      }

      return true;
    },
    canDecrease () {
      let training = this.$store.state.character.skills[this._props.name].training;

      // Can't if not trained or higher
      if (training == Constants.TRAINING.UNTRAINED || training == Constants.TRAINING.UNTRAINED) {
        return false;
      }

      // Can't if not untrainable
      if (training == Constants.TRAINING.TRAINED && !Constants.UNTRAINABLE[this._props.name]) {
        return false;
      }

      return true;
    },
    canInvest () {
      let training = this.$store.state.character.skills[this._props.name].training;
      return training == Constants.TRAINING.SPECIALIZED || training == Constants.TRAINING.TRAINED;
    },
    invested: {
      get () {
        return this.$store.state.character.skills[this._props.name].invested;
      },
      set (value) {
        this.$store.commit("updateSkillInvestment", { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    maxInvestment () {
      if (this.$store.state.character.skills[this._props.name].training === Constants.TRAINING.SPECIALIZED) {
        return 226;
      }  else if (this.$store.state.character.skills[this._props.name].training === Constants.TRAINING.TRAINED) {
        return 208;
      } else {
        return -1;
      }
    },
    base () {
      return this.$store.getters[this._props.name + "Base"]
    },
    buffed () {
      return this.$store.getters[this._props.name + "Buffed"]
    },
    buffLevel: {
      get () {
        return this.$store.state.character.skills[this._props.name].buff;
      },
      set (value) {
        this.$store.commit("updateSkillBuff", { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    cantrip: {
      get () {
        return this.$store.state.character.skills[this._props.name].cantrip;
      },
      set (value) {
        this.$store.commit("updateSkillCantrip", { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    cantripName () {
      return Constants.CANTRIP_NAME[this.$store.state.character.skills[this._props.name].cantrip];
    }
  },
  methods: {
    increaseTraining () {
      this.$store.commit("increaseTraining", this._props.name);
    },
    decreaseTraining () {
      this.$store.commit("decreaseTraining", this._props.name);
    }
  }
};
</script>

<style>
</style>
