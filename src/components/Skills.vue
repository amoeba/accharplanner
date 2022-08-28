<template>
  <div id="skills" class="pane">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div>
                    <span
            class="tip tip-red"
            v-tooltip="
              'There are currently a couple of issues with skill calculations producing some inaccurate numbers. I\'ll try fix these as soon as possible but it might take a bit. Sorry for the trouble and thanks for using the planner!'
            "
            >!</span>&nbsp;
          <h3>Skills</h3>

          <span class="red">{{ skillPointsSpentErrorText }}</span>
        </div>
        <div class="right">
          <span v-tooltip="'Skill points spent.'"
            >{{ skillPointsSpent }} / {{ skillPointsAvailable }}</span
          >
        </div>
      </div>
      <div v-if="collapsed" class="table-wrapper">
        <table>
          <thead>
            <tr class="table-header">
              <th colspan="4">Name</th>
              <th>
                <span
                  v-tooltip="{
                    content:
                      '<strong>Trained:</strong> No Bonus<br><strong>Specialized:</strong> +10',
                    html: true,
                  }"
                  >Base</span
                >
              </th>
              <th>Buffed</th>
              <th colspan="2">Invested</th>
              <th>Buff</th>
              <th>Cantrip</th>
            </tr>
            <tr class="controls">
              <th colspan="4"><input v-model="filterQuery"/></th>
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
                  <option value="0"></option>
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
                  <option value="0"></option>
                  <option value="1">Minor</option>
                  <option value="2">Major</option>
                  <option value="3">Epic</option>
                  <option value="4">Legen.</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="specialized">
              <th colspan="7">
                Specialized ({{ specializedSkillPointsSpent }} /
                {{ maxSpecializedSkillPointsSpent }})
                {{ augmentationsRequiredText }}
              </th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th colspan="6">&nbsp;</th>
            </tr>
            <tr v-if="noSpecializedSkills">
              <td class="center" colspan="12">No specialized skills</td>
            </tr>
            <Skill
              v-for="(skill, index) in specializedSkills"
              :key="skill"
              :name="skill"
              training="specialized"
              :tabIndex="index + 1000"
            />
            <tr class="trained">
              <th colspan="4">Trained</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th colspan="6">&nbsp;</th>
            </tr>
            <tr v-if="noTrainedSkills">
              <td class="center" colspan="12">No trained skills</td>
            </tr>
            <Skill
              v-for="(skill, index) in trainedSkills"
              :key="skill"
              :name="skill"
              training="trained"
              :tabIndex="index + 1100"
            />
            <tr class="untrained">
              <th colspan="4">Untrained</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th colspan="6">&nbsp;</th>
            </tr>
            <Skill
              v-for="(skill, index) in untrainedSkills"
              :key="skill"
              :name="skill"
              training="untrained"
              :tabIndex="index + 1200"
            />
            <tr class="unusable">
              <th colspan="4">Unusable</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th colspan="6">&nbsp;</th>
            </tr>
            <Skill
              v-for="(skill, index) in unusableSkills"
              :key="skill"
              :name="skill"
              training="unusable"
              :tabIndex="index + 1300"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Skill from "./Skill.vue";
import { Training } from "../types";
import { MAX_SPECIALIZED_SKILL_CREDITS_SPENT } from "../constants";

export default {
  name: "Skills",
  components: { Skill },
  data() {
    return {
      filterQuery: "",
    }
  },
  computed: {
    collapsed() {
      return this.$store.getters.skillsPaneVisible;
    },
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
      return MAX_SPECIALIZED_SKILL_CREDITS_SPENT;
    },
    skillPointsSpentErrorText() {
      let overspent =
        this.$store.getters.skillPointsSpent -
        this.$store.getters.skillPointsAvailable;

      if (overspent > 0) {
        return (
          "You've overspent by " +
          overspent +
          " skill" +
          (overspent === 1 ? " point!" : "  points!")
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
      return Object.keys(this.$store.state.build.character.skills)
        .filter((key) =>
          this.$store.state.build.character.skills[key].training ===
          Training.SPECIALIZED)
        .filter(key => {
          return this.filterQuery
            .toLowerCase()
            .split(" ")
            .every(v => key.toLowerCase().includes(v));
        });
    },
    trainedSkills() {
      return Object.keys(this.$store.state.build.character.skills)
        .filter((key) =>
          this.$store.state.build.character.skills[key].training === 
          Training.TRAINED)
        .filter(key => {
          return this.filterQuery
            .toLowerCase()
            .split(" ")
            .every(v => key.toLowerCase().includes(v));
        });
    },
    untrainedSkills() {
      return Object.keys(this.$store.state.build.character.skills)
        .filter((key) =>
          this.$store.state.build.character.skills[key].training ===
          Training.UNTRAINED)
        .filter(key => {
          return this.filterQuery
            .toLowerCase()
            .split(" ")
            .every(v => key.toLowerCase().includes(v));
        });
    },
    unusableSkills() {
      return Object.keys(this.$store.state.build.character.skills)
        .filter((key) =>
          this.$store.state.build.character.skills[key].training ===
          Training.UNUSABLE)
        .filter(key => {
          return this.filterQuery
            .toLowerCase()
            .split(" ")
            .every(v => key.toLowerCase().includes(v));
        });
    },
    noSpecializedSkills() {
      return this.$store.getters.specializedSkills.length == 0;
    },
    noTrainedSkills() {
      return this.$store.getters.trainedSkills.length == 0;
    },
  },
  methods: {
    toggle() {
      this.$store.commit("toggleSkillsPane");
    },
    changeInvested(e) {
      this.$store.commit("changeAllSkillInvestment", e.target.value);
    },
    changeBuffed(e) {
      this.$store.commit("changeAllSkillBuffs", e.target.value);
    },
    changeCantrips(e) {
      this.$store.commit("changeAllSkillCantrips", e.target.value);
    },
  },
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
