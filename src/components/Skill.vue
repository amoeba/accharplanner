<template>
  <tr>
    <td>
      <img
        :src="'/images/' + name + '.png'"
        :alt="displayName"
        width="20"
        height="20"
      />
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
    <td class="buffed number" v-bind:class="isBuffed ? 'isBuffed' : ''">
      {{ buffed }}
    </td>
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
    <td class="invested number"><input type="text" v-bind:value="invested" v-on:change="updateInvested" v-bind:tabindex="tabIndex" /></td>
    <td>
      <select v-model="buffLevel">
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
    <td>
      <select v-model="cantrip">
        <option value="0">None</option>
        <option value="1">Minor</option>
        <option value="2">Major</option>
        <option value="3">Epic</option>
        <option value="4">Legendary</option>
      </select>
    </td>
  </tr>
</template>

<script>
import Constants from "../constants";

export default {
  name: "Skill",
  props: {
    name: String,
    training: String,
    tabIndex: Number // Number instad of String because we're :binding
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
        this.$store.commit("updateSkillInvested", {
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
    },
    updateInvested (e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 0;
      }

      if (
        this._props.training === Constants.TRAINING.SPECIALIZED &&
        value > 226
      ) {
        value = 226;
      } else if (
        this._props.training === Constants.TRAINING.TRAINED &&
        value > 208
      ) {
        value = 208;
      } else if (value < 0) {
        value = 0
      }

      this.$store.commit("updateSkillInvested", {
        name: this._props.name,
        value: value
      });

      e.target.value = value;
    }
  }
};
</script>

<style></style>
