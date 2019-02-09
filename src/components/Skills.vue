<template>
  <tbody id="skills">
    <tr>
      <th colspan="11">Skills ({{ skillPointsSpent }} / {{ skillPointsAvailable }}) <span class="error">{{ skillPointsSpentErrorText }}</span></th>
      </th>
    </tr>
    <tr class="headers">
      <th>Name</th>
      <th colspan="2">&nbsp;</th>
      <th colspan="2">Invested</th>
      <th>Base</th>
      <th>Buffed</th>
      <th colspan="2">Buff</th>
      <th colspan="2">Cantrip</th>
    </tr>
    <tr class="controls">
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th><input type="range" min="0" max="226" value="0" v-on:change="changeInvested" /></th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th><input type="range" min="0" max="8" value="0" v-on:change="changeBuffed" /></th>
      <th>&nbsp;</th>
      <th><input type="range" min="0" max="4" value="0" v-on:change="changeCantrips" /></th>
      <th>&nbsp;</th>
    </tr>
    <tr class="specialized">
      <th colspan="11">Specialized ({{ specializedSkillPointsSpent }} / 70) {{ augmentationsRequiredText }}</th>
    </tr>
    <tr v-if="noSpecializedSkills">
      <td class="center" colspan="11">No specialized skills</td>
    </tr>
    <Skill v-for="skill in specializedSkills" :key="skill" :name="skill" />
    <tr class="trained">
      <th colspan="11">Trained</th>
    </tr>
    <tr v-if="noTrainedSkills">
      <td class="center" colspan="11">No trained skills</td>
    </tr>
    <Skill v-for="skill in trainedSkills" :key="skill" :name="skill" />
    <tr class="untrained">
      <th colspan="11">Untrained</th>
    </tr>
    <Skill v-for="skill in untrainedSkills" :key="skill" :name="skill" />
    <tr class="unusable">
      <th colspan="11">Unusable</th>
    </tr>
    <Skill v-for="skill in unusableSkills" :key="skill" :name="skill" />
  </tbody>
</template>

<script>
import Skill from "./Skill.vue";
import Constants from "../constants";

export default {
  name: "Skills",
  components: { Skill },
  computed: {
    skillPointsSpent () {
      return this.$store.getters.skillPointsSpent;
    },
    skillPointsAvailable () {
      return this.$store.getters.skillPointsAvailable;
    },
    specializedSkillPointsSpent () {
      return this.$store.getters.specializedSkillPointsSpent;
    },
    skillPointsSpentErrorText () {
      let overspent = this.$store.getters.skillPointsSpent - this.$store.getters.skillPointsAvailable;

      if (overspent > 0) {
        return "You've overspent by " + overspent + (overspent === 1 ? " point" : " points!");
      }
    },
    augmentationsRequired () {
      return this.$store.getters.augmentationsSpent;
    },
    augmentationsRequiredText () {
      if (this.$store.getters.augmentationsSpent == 0) {
        return "";
      } else if (this.$store.getters.augmentationsSpent == 1) {
        return "1 aug required";
      } else {
        return this.$store.getters.augmentationsSpent + " augs required";
      }
      return ;
    },
    specializedSkills () {
      return Object.keys(this.$store.state.character.skills)
        .filter(key => this.$store.state.character.skills[key].training === Constants.TRAINING.SPECIALIZED);
    },
    trainedSkills () {
      return Object.keys(this.$store.state.character.skills)
        .filter(key => this.$store.state.character.skills[key].training === Constants.TRAINING.TRAINED);
    },
    untrainedSkills () {
      return Object.keys(this.$store.state.character.skills)
        .filter(key => this.$store.state.character.skills[key].training === Constants.TRAINING.UNTRAINED);
    },
    unusableSkills () {
      return Object.keys(this.$store.state.character.skills)
        .filter(key => this.$store.state.character.skills[key].training === Constants.TRAINING.UNUSABLE);
    },
    noSpecializedSkills () {
      return this.$store.getters.specializedSkills.length == 0;

    },
    noTrainedSkills () {
      return this.$store.getters.trainedSkills.length == 0;
    }
  },
  methods: {
    changeInvested (e) {
      this.$store.commit("changeAllSkillInvestment", e.target.value);
    },
    changeBuffed (e) {
      this.$store.commit("changeAllSkillBuffs", e.target.value);
    },
    changeCantrips (e) {
      this.$store.commit("changeAllSkillCantrips", e.target.value);
    }
  }
};
</script>
<style scoped>
.specialized > th {
  background-color: rgba(255, 0, 255, 0.2);
}

.trained > th {
  background-color: rgba(0, 255, 255, 0.2);
}

.untrained > th {
  background-color: rgba(220, 220, 0, 0.5);
}

.unusable > th {
  background-color: rgba(220, 220, 0, 0.5);
}
</style>
