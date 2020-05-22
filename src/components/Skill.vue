<template>
  <tr>
    <td>
      <img
        :src="'/img/' + name + '.png'"
        :alt="displayName"
        width="20"
        height="20"
      />
    </td>
    <td>
      {{ displayName }} <span class="faded">{{ formula }}</span>
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
        <option value="8">VIII</option>
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
import {
  SKILL_DEPENDS_ON_ATTRIBUTES,
  SPEC_COSTS_AUG,
  UNTRAINABLE,
  SKILL_COST_AT_TRAINING,
  MAX_SPECIALIZED_SKILL_CREDITS_SPENT
} from "../constants";
import { SKILL_NAME, SKILL_FORMULA } from "../mappings";
import { Training } from "../types";

export default {
  name: "Skill",
  props: {
    name: String,
    training: String,
    tabIndex: Number // Number instead of String because we're :binding
  },
  computed: {
    displayName() {
      return SKILL_NAME[this._props.name];
    },
    formula() {
      return SKILL_FORMULA[this._props.name];
    },
    isBuffed() {
      return (
        this.$store.state.build.character.skills[this._props.name].buff > 0 ||
        this.$store.state.build.character.skills[this._props.name].cantrip > 0 ||
        SKILL_DEPENDS_ON_ATTRIBUTES[this._props.name].reduce((acc, attr) => {
          if (this.$store.state.build.character.attributes[attr].buff > 0 || this.$store.state.build.character.attributes[attr].cantrip > 0) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0)
      );
    },
    increaseCostText() {
      let currentTraining = this.$store.state.build.character.skills[this._props.name]
        .training;

      if (currentTraining === Training.SPECIALIZED) {
        return "";
      }

      if (currentTraining === Training.TRAINED) {
        if (SPEC_COSTS_AUG[this._props.name]) {
          return "AUG";
        } else {
          return SKILL_COST_AT_TRAINING[this._props.name].specialized;
        }
      }

      return SKILL_COST_AT_TRAINING[this._props.name].trained;
    },
    decreaseCostText() {
      let currentTraining = this.$store.state.build.character.skills[this._props.name]
        .training;

      if (
        currentTraining === Training.UNUSABLE ||
        currentTraining === Training.UNTRAINED
      ) {
        return "";
      }

      if (currentTraining === Training.SPECIALIZED) {
        if (SPEC_COSTS_AUG[this._props.name]) {
          return "AUG";
        } else {
          return SKILL_COST_AT_TRAINING[this._props.name].specialized;
        }
      }

      if (currentTraining === Training.TRAINED) {
        if (!UNTRAINABLE[this._props.name]) {
          return;
        } else {
          return SKILL_COST_AT_TRAINING[this._props.name].trained;
        }
      }

      return "";
    },
    cantIncrease() {
      // Can't if already specialized
      if (
        this.$store.state.build.character.skills[this._props.name].training ==
        Training.SPECIALIZED
      ) {
        return true;
      }

      // Can't if out of credits
      let newTraining =
        this.$store.state.build.character.skills[this._props.name].training == Training.TRAINED
          ? Training.SPECIALIZED
          : Training.TRAINED;

      // Calculate the cost to raise. Because of the way SKILL_COST_AT_TRAINING is
      // built, the cost to spec, for example, if the cost when spec'd minus the
      // cost when trained.
      let newCost = 0;

      if (newTraining === Training.SPECIALIZED) {
        newCost = SKILL_COST_AT_TRAINING[this._props.name][Training.SPECIALIZED] -
          SKILL_COST_AT_TRAINING[this._props.name][Training.TRAINED];
      } else if (newTraining === Training.TRAINED) {
        newCost = SKILL_COST_AT_TRAINING[this._props.name][Training.TRAINED];
      }

      if (
        this.$store.getters.skillPointsSpent +
          newCost >
        this.$store.getters.skillPointsAvailable
      ) {
        return true;
      }

      // Can't if would push you over 70 max spec'd credits
      if (
        newTraining === Training.SPECIALIZED && (this.$store.getters.specializedSkillPointsSpent + newCost > MAX_SPECIALIZED_SKILL_CREDITS_SPENT)
      ) {
        return true;
      }

      return false;
    },
    cantDecrease() {
      let training = this.$store.state.build.character.skills[this._props.name]
        .training;

      // Can't if not trained or higher
      if (
        training === Training.UNTRAINED ||
        training === Training.UNTRAINED
      ) {
        return true;
      }

      // Can't if not untrainable
      if (
        training === Training.TRAINED &&
        !UNTRAINABLE[this._props.name]
      ) {
        return true;
      }

      // Can't if not trained
      if (
        training === Training.UNTRAINED ||
        training === Training.UNUSABLE
      ) {
        return true;
      }

      return false;
    },
    canInvest() {
      let training = this.$store.state.build.character.skills[this._props.name]
        .training;
      return (
        training == Training.SPECIALIZED ||
        training == Training.TRAINED
      );
    },
    invested: {
      get() {
        return this.$store.state.build.character.skills[this._props.name].invested;
      },
      set(value) {
        this.$store.commit("updateSkillInvested", {
          name: this._props.name,
          value: Number(value) | 0
        });
      }
    },
    maxInvestment() {
      if (
        this.$store.state.build.character.skills[this._props.name].training ===
        Training.SPECIALIZED
      ) {
        return 226;
      } else if (
        this.$store.state.build.character.skills[this._props.name].training ===
        Training.TRAINED
      ) {
        return 208;
      } else {
        return -1;
      }
    },
    base() {
      return Math.round(this.$store.getters[this._props.name + "Base"]);
    },
    buffed() {
      return Math.round(this.$store.getters[this._props.name + "Buffed"]);
    },
    buffLevel: {
      get() {
        return this.$store.state.build.character.skills[this._props.name].buff;
      },
      set(value) {
        this.$store.commit("updateSkillBuff", {
          name: this._props.name,
          value: value
        });
      }
    },
    buffName() {
      return BUFF_NAME[
        this.$store.state.build.character.skills[this._props.name].buff
      ];
    },
    cantrip: {
      get() {
        return this.$store.state.build.character.skills[this._props.name].cantrip;
      },
      set(value) {
        this.$store.commit("updateSkillCantrip", {
          name: this._props.name,
          value: value
        });
      }
    },
    cantripName() {
      return CANTRIP_NAME[
        this.$store.state.build.character.skills[this._props.name].cantrip
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
        this._props.training === Training.SPECIALIZED &&
        value > 226
      ) {
        value = 226;
      } else if (
        this._props.training === Training.TRAINED &&
        value > 208
      ) {
        value = 208;
      } else if (value < 0) {
        value = 0
      }

      this.$store.commit("updateSkillInvested", {
        name: this._props.name,
        value: Number(value) | 0
      });

      e.target.value = value;
    }
  }
};
</script>

<style></style>
