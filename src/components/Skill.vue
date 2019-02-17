<template>
  <tr>
    <td>
      <img :src="'/images/' + name + '.png'" :alt="displayName" width="20" height="20" />
    </td>
    <td>
      {{ displayName }}
    </td>
    <td>
      <button v-on:click="decreaseTraining" v-bind:disabled="cantDecrease">
        ↓
      </button>
    </td>
    <td>
      <button v-on:click="increaseTraining" v-bind:disabled="cantIncrease">
        ↑
      </button>
    </td>
    <td class="base number">{{ base }}</td>
    <td class="buffed number" v-bind:class="isBuffed ? 'isBuffed' : ''">{{ buffed }}</td>
    <td>
      <div v-if="canInvest">
        <input
          type="range"
          min="0"
          v-bind:max="maxInvestment"
          v-model="invested"
        />
      </div>
    </td>
    <td class="number">{{ invested }}</td>
    <td><input type="range" min="0" max="8" v-model="buffLevel" /></td>
    <td class="number">{{ buffName }}</td>
    <td><input type="range" min="0" max="4" v-model="cantrip" /></td>
    <td class="number">{{ cantripName }}</td>
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
    displayName() {
      return Constants.SKILL_NAME[this._props.name];
    },
    isBuffed() {
      return (
        this.$store.state.character.skills[this._props.name].buff > 0 ||
        this.$store.state.character.skills[this._props.name].cantrip > 0
      );
    },
    increaseCostText() {
      let currentTraining = this.$store.state.character.skills[this._props.name]
        .training;

      if (currentTraining === Constants.TRAINING.SPECIALIZED) {
        return "";
      }

      if (currentTraining === Constants.TRAINING.TRAINED) {
        if (Constants.SPEC_COSTS_AUG[this._props.name]) {
          return "AUG";
        } else {
          return Constants.COST_SKILL_POINTS[this._props.name].specialized;
        }
      }

      return Constants.COST_SKILL_POINTS[this._props.name].trained;
    },
    decreaseCostText() {
      let currentTraining = this.$store.state.character.skills[this._props.name]
        .training;

      if (
        currentTraining === Constants.TRAINING.UNUSABLE ||
        currentTraining === Constants.TRAINING.UNTRAINED
      ) {
        return "";
      }

      if (currentTraining === Constants.TRAINING.SPECIALIZED) {
        if (Constants.SPEC_COSTS_AUG[this._props.name]) {
          return "AUG";
        } else {
          return Constants.COST_SKILL_POINTS[this._props.name].specialized;
        }
      }

      if (currentTraining === Constants.TRAINING.TRAINED) {
        if (!Constants.UNTRAINABLE[this._props.name]) {
          return;
        } else {
          return Constants.COST_SKILL_POINTS[this._props.name].trained;
        }
      }

      return "";
    },
    cantIncrease() {
      // Can't if already specialized
      if (
        this.$store.state.character.skills[this._props.name].training ==
        Constants.TRAINING.SPECIALIZED
      ) {
        return true;
      }

      // Can't if out of credits
      let training = this.$store.state.character.skills[this._props.name]
        .training;

      let newTraining =
        training == Constants.TRAINING.TRAINED
          ? Constants.TRAINING.SPECIALIZED
          : Constants.TRAINING.TRAINED;

      if (
        this.$store.getters.skillPointsSpent +
          Constants.COST_SKILL_POINTS[this._props.name][newTraining] >
        this.$store.getters.skillPointsAvailable
      ) {
        return true;
      }

      // Can't if would push you over 70 max spec'd credits
      if (
        this.$store.getters.skillPointsSpent +
          Constants.COST_SKILL_POINTS[this._props.name][newTraining] >
        70
      ) {
        return true;
      }

      return false;
    },
    cantDecrease() {
      let training = this.$store.state.character.skills[this._props.name]
        .training;

      // Can't if not trained or higher
      if (
        training === Constants.TRAINING.UNTRAINED ||
        training === Constants.TRAINING.UNTRAINED
      ) {
        return true;
      }

      // Can't if not untrainable
      if (
        training === Constants.TRAINING.TRAINED &&
        !Constants.UNTRAINABLE[this._props.name]
      ) {
        return true;
      }

      // Can't if not trained
      if (
        training === Constants.TRAINING.UNTRAINED ||
        training === Constants.TRAINING.UNUSABLE
      ) {
        return true;
      }

      return false;
    },
    canInvest() {
      let training = this.$store.state.character.skills[this._props.name]
        .training;
      return (
        training == Constants.TRAINING.SPECIALIZED ||
        training == Constants.TRAINING.TRAINED
      );
    },
    invested: {
      get() {
        return this.$store.state.character.skills[this._props.name].invested;
      },
      set(value) {
        this.$store.commit("updateSkillInvestment", {
          name: this._props.name,
          value: value
        });
      }
    },
    maxInvestment() {
      if (
        this.$store.state.character.skills[this._props.name].training ===
        Constants.TRAINING.SPECIALIZED
      ) {
        return 226;
      } else if (
        this.$store.state.character.skills[this._props.name].training ===
        Constants.TRAINING.TRAINED
      ) {
        return 208;
      } else {
        return -1;
      }
    },
    base() {
      return this.$store.getters[this._props.name + "Base"];
    },
    buffed() {
      return this.$store.getters[this._props.name + "Buffed"];
    },
    buffLevel: {
      get() {
        return this.$store.state.character.skills[this._props.name].buff;
      },
      set(value) {
        this.$store.commit("updateSkillBuff", {
          name: this._props.name,
          value: value
        });
      }
    },
    buffName() {
      return Constants.BUFF_NAME[
        this.$store.state.character.skills[this._props.name].buff
      ];
    },
    cantrip: {
      get() {
        return this.$store.state.character.skills[this._props.name].cantrip;
      },
      set(value) {
        this.$store.commit("updateSkillCantrip", {
          name: this._props.name,
          value: value
        });
      }
    },
    cantripName() {
      return Constants.CANTRIP_NAME[
        this.$store.state.character.skills[this._props.name].cantrip
      ];
    }
  },
  methods: {
    increaseTraining() {
      this.$store.commit("increaseTraining", this._props.name);
    },
    decreaseTraining() {
      this.$store.commit("decreaseTraining", this._props.name);
    }
  }
};
</script>

<style></style>
