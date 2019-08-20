<template>
  <div id="skills" class="pane">
    <div class="pane-header">
      <div>
        <h3>Skills</h3>
        <span class="error">{{ skillPointsSpentErrorText }}</span>
      </div>
      <div class="right"><strong>Skill Points Spent:</strong> {{ skillPointsSpent }} / {{ skillPointsAvailable }}</div>     
      
    </div>
    <div class="table-wrapper">
      <table id="skills">
        <thead>
          <tr class="table-header">
            <th colspan="4">Name</th>
            <th>Base</th>
            <th><abbr title="Includes aug and lum bonuses, plus buffs.">Effective</abbr></th>
            <th colspan="2">Invested</th>
            <th>Buff</th>
            <th>Cantrip</th>
          </tr>
          <tr class="controls">
            <th colspan="4">&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="2">
              <input
                type="range"
                min="0"
                max="226"
                value="0"
                v-on:change="changeInvested"
              />
            </th>
            <th>
              <select v-on:change="changeBuffed">
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
            </th>
            <th>
              <select v-on:change="changeCantrips">
                <option value="0">None</option>
                <option value="1">Minor</option>
                <option value="2">Major</option>
                <option value="3">Epic</option>
                <option value="4">Legendary</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="specialized">
            <th colspan="7">
              Specialized ({{ specializedSkillPointsSpent }} / {{ maxSpecializedSkillPointsSpent }})
              {{ augmentationsRequiredText }}
            </th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="6">&nbsp;</th>
          </tr>
          <tr v-if="noSpecializedSkills">
            <td class="center" colspan="12">No specialized skills</td>
          </tr>
          <Skill v-for="(skill, index) in specializedSkills" :key="skill" :name="skill" training="specialized" :tabIndex="index + 1000" />
          <tr class="trained">
            <th colspan="4">Trained</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="6">&nbsp;</th>
          </tr>
          <tr v-if="noTrainedSkills">
            <td class="center" colspan="12">No trained skills</td>
          </tr>
          <Skill v-for="(skill, index) in trainedSkills" :key="skill" :name="skill" training="trained" :tabIndex="index + 1100" />
          <tr class="untrained">
            <th colspan="4">Untrained</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="6">&nbsp;</th>
          </tr>
          <Skill v-for="(skill, index) in untrainedSkills" :key="skill" :name="skill" training="untrained" :tabIndex="index + 1200" />
          <tr class="unusable">
            <th colspan="4">Unusable</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="6">&nbsp;</th>
          </tr>
          <Skill v-for="(skill, index) in unusableSkills" :key="skill" :name="skill" training="unusable" :tabIndex="index + 1300" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Skill from "./Skill.vue";
import Constants from "../constants";

export default {
  name: "Skills",
  components: { Skill },
  computed: {
    skillPointsSpent() {
      return this.$store.getters.skillPointsSpent;
    },
    skillPointsAvailable() {
      return this.$store.getters.skillPointsAvailable;
    },
    specializedSkillPointsSpent() {
      return this.$store.getters.specializedSkillPointsSpent;
    },
    maxSpecializedSkillPointsSpent() { 
      return Constants.MAX_SPECIALIZED_SKILL_CREDITS_SPENT;
    },
    skillPointsSpentErrorText() {
      let overspent =
        this.$store.getters.skillPointsSpent -
        this.$store.getters.skillPointsAvailable;

      if (overspent > 0) {
        return (
          "You've overspent by " +
          overspent +
          (overspent === 1 ? " point" : " points!")
        );
      }

      return "";
    },
    augmentationsRequired() {
      return this.$store.getters.augmentationsSpent;
    },
    augmentationsRequiredText() {
      if (this.$store.getters.augmentationsSpent == 0) {
        return "";
      } else if (this.$store.getters.augmentationsSpent == 1) {
        return "1 aug required";
      } else {
        return this.$store.getters.augmentationsSpent + " augs required";
      }
    },
    specializedSkills() {
      return Object.keys(this.$store.state.character.skills).filter(
        key =>
          this.$store.state.character.skills[key].training ===
          Constants.TRAINING.SPECIALIZED
      );
    },
    trainedSkills() {
      return Object.keys(this.$store.state.character.skills).filter(
        key =>
          this.$store.state.character.skills[key].training ===
          Constants.TRAINING.TRAINED
      );
    },
    untrainedSkills() {
      return Object.keys(this.$store.state.character.skills).filter(
        key =>
          this.$store.state.character.skills[key].training ===
          Constants.TRAINING.UNTRAINED
      );
    },
    unusableSkills() {
      return Object.keys(this.$store.state.character.skills).filter(
        key =>
          this.$store.state.character.skills[key].training ===
          Constants.TRAINING.UNUSABLE
      );
    },
    noSpecializedSkills() {
      return this.$store.getters.specializedSkills.length == 0;
    },
    noTrainedSkills() {
      return this.$store.getters.trainedSkills.length == 0;
    }
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllSkillInvestment", e.target.value);
    },
    changeBuffed(e) {
      this.$store.commit("changeAllSkillBuffs", e.target.value);
    },
    changeCantrips(e) {
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
