<template>
  <div class="headers">
    <div class="header">
      <div>
        <div class="header-title" v-on:click="toggleCharacterPane">
          <div>
            <h3>Character</h3>
          </div>
        </div>
        <div v-if="characterPaneVisible" class="header-items">
          <div>Name</div>
          <div>
            <input class="w100" id="charname" type="text" v-model="name" />
          </div>
          <div>Race</div>
          <div>
            <select v-model="race">
              <option v-for="race in races" v-bind:key="race">
                {{ race }}
              </option>
            </select>
          </div>
          <div>Gender</div>
          <div>
            <input type="radio" id="female" value="Female" v-model="gender" />
            <label for="female">Female</label>
            <input type="radio" id="male" value="Male" v-model="gender" />
            <label for="male">Male</label>
          </div>
          <div>
            Level
            <button class="button-icononly" @click="showSettingsModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M232,120h-8.34a95.07,95.07,0,0,0-8.82-32.9l7.23-4.17a8,8,0,0,0-8-13.86l-7.25,4.19a97,97,0,0,0-24.08-24.08l4.19-7.25a8,8,0,0,0-13.86-8l-4.17,7.23A95.07,95.07,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34a95.07,95.07,0,0,0-32.9,8.82l-4.17-7.23a8,8,0,0,0-13.86,8l4.19,7.25A97,97,0,0,0,49.18,73.26l-7.25-4.19a8,8,0,0,0-8,13.86l7.23,4.17A95.07,95.07,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34a95.07,95.07,0,0,0,8.82,32.9l-7.23,4.17a8,8,0,0,0,4,14.93,7.92,7.92,0,0,0,4-1.07l7.25-4.19a97,97,0,0,0,24.08,24.08l-4.19,7.25a8,8,0,0,0,13.86,8l4.17-7.23a95.07,95.07,0,0,0,32.9,8.82V232a8,8,0,0,0,16,0v-8.34a95.07,95.07,0,0,0,32.9-8.82l4.17,7.23a8,8,0,0,0,13.86-8l-4.19-7.25a97,97,0,0,0,24.08-24.08l7.25,4.19A8,8,0,0,0,225,184a8,8,0,0,0-2.92-10.93l-7.23-4.17a95.07,95.07,0,0,0,8.82-32.9H232a8,8,0,0,0,0-16ZM72,128A55.91,55.91,0,0,1,93.38,84l25.38,44L93.38,172A55.91,55.91,0,0,1,72,128Zm56,56a55.67,55.67,0,0,1-20.78-4l25.4-44h50.8A56.09,56.09,0,0,1,128,184Zm4.62-64-25.4-44a56,56,0,0,1,76.2,44Z"></path></svg>
              </button>
          </div>
          <div v-if="!settingsInfiniteMode" class="flex-row">
            <div class="w70">
              <input
                class="w100"
                type="range"
                min="1"
                :max="maxLevel"
                v-model="level"
              />
            </div>
            <div class="w30 right">
              <input
                class="number w100"
                type="text"
                v-bind:value="level"
                v-on:change="updateLevel"
              />
            </div>
          </div>
          <div v-if="settingsInfiniteMode" class="flex-row">
            <div class="w50">
              <span class="isBuffed">(∞-Mode)</span>
            </div>
            <div class="w40">
              <input
                class="bignumber w100"
                type="text"
                v-bind:value="level"
                v-on:change="updateLevel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header">
      <div>
        <div class="header-title" v-on:click="toggleXPAndLuminancePane">
          <div>
            <h3>XP &amp; Luminance</h3>
          </div>
          <div class="right">
            <span
              class="tip"
              v-tooltip="
                'These numbers are a bit of a work in progress. Total and Required Level tend to match pretty well but Unassigned and Spent seem to get way off sometimes.'
              "
              >!</span
            >
          </div>
        </div>
        <div v-if="xpAndLuminancePaneVisible" class="header-items">
          <div>Unassigned</div>
          <div class="right">
            <span
              v-if="unassignedXPError"
              class="tip"
              v-tooltip="unassignedXPError"
              >!</span
            >
            <span v-if="!unassignedXPError">{{ unassignedXP }}</span>
          </div>
          <div>Spent</div>
          <div class="right">
            <span
              v-if="totalXPInvestedError"
              class="tip"
              v-tooltip="
                totalXPInvestedError
              "
              >!</span
            >
            <span v-if="!totalXPInvestedError">{{ totalXPInvested }}</span>
          </div>
          <div>Total</div>
          <div class="right">{{ totalXPEarned }}</div>
          <div>Required Level</div>
          <div class="right" v-bind:class="isOverspent ? 'red' : 'gray'">
            {{ requiredLevel }}
          </div>
          <div>Luminance Spent</div>
          <div class="right">{{ totalLuminanceXPSpent }}</div>
        </div>
      </div>
    </div>
    <div class="header">
      <div>
        <div class="header-title" v-on:click="toggleKnobsAndDialsPane">
          <div>
            <h3>Knobs &amp; Dials</h3>
          </div>
        </div>
        <div v-if="knobsAndDialsPaneVisible" class="header-items">
          <div>Invested</div>
          <div>
            <input
              class="w100"
              type="range"
              min="0"
              :max="maxSkillInvestedSpecialized"
              value="0"
              v-on:change="changeAllInvestments"
            />
          </div>
          <div>Buffs</div>
          <div>
            <select v-on:change="changeAllBuffs">
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
          </div>
          <div>Cantrips</div>
          <div>
            <select v-on:change="changeAllCantrips">
              <option value="0"></option>
              <option value="1">Minor</option>
              <option value="2">Major</option>
              <option value="3">Epic</option>
              <option value="4">Legen.</option>
            </select>
          </div>
          <div>Enlightened</div>
          <div class="flex-row">
            <div class="w70">
              <input type="range" min="0" :max="maxTimesEnlightened" v-model="timesEnlightened" />
            </div>
            <div class="w30 right">
              <input
                class="number"
                type="text"
                v-model="timesEnlightened"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ExtraSkillCredits class="header" />
  </div>
</template>

<script>
import ExtraSkillCredits from "./ExtraSkillCredits.vue";
import {
  MIN_LEVEL,
  MAX_LEVEL,
  MAX_TIMES_ENLIGHTENDED,
  MAX_SKILL_INVESTED_SPECIALIZED,
} from "../constants";
import { Race } from "../types";

export default {
  name: "Headers",
  components: {
    ExtraSkillCredits,
  },
  data() {
    return {
      maxLevel: MAX_LEVEL,
      maxSkillInvestedSpecialized: MAX_SKILL_INVESTED_SPECIALIZED,
      maxTimesEnlightened: MAX_TIMES_ENLIGHTENDED,
    }
  },
  computed: {
    characterPaneVisible() {
      return this.$store.getters.characterPaneVisible;
    },
    xpAndLuminancePaneVisible() {
      return this.$store.getters.xpAndLuminancePaneVisible;
    },
    knobsAndDialsPaneVisible() {
      return this.$store.getters.knobsAndDialsPaneVisible;
    },
    extraSkillCreditsPaneVisible() {
      return this.$store.getters.extraSkillCreditsPaneVisible;
    },
    totalXPEarned() {
      return Number(this.$store.getters.totalXPEarned).toLocaleString();
    },
    totalXPInvested() {
      return Number(this.$store.getters.totalXPInvested).toLocaleString();
    },
    totalXPInvestedError() {
      return this.$store.getters.totalXPInvestedError;
    },
    unassignedXP() {
      return Number(this.$store.getters.unassignedXP).toLocaleString();
    },
    unassignedXPError() {
      return this.$store.getters.unassignedXPError;
    },
    isOverspent() {
      return (
        Number(this.$store.getters.totalXPInvested) >
          Number(this.$store.getters.totalXPEarned) ||
        this.$store.getters.skillPointsSpent >
          this.$store.getters.skillPointsAvailable
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
        return this.$store.state.build.character.name;
      },
      set(value) {
        this.$store.commit("updateName", value);
      },
    },
    level: {
      get() {
        return this.$store.state.build.character.level;
      },
      set(value) {
        this.$store.commit("updateLevel", value);
      },
    },
    races() {
      return Object.keys(Race);
    },
    race: {
      get() {
        return this.$store.state.build.character.race;
      },
      set(value) {
        this.$store.commit("updateRace", value);
      },
    },
    gender: {
      get() {
        return this.$store.state.build.character.gender;
      },
      set(value) {
        this.$store.commit("updateGender", value);
      },
    },
    timesEnlightened: {
      get() {
        return this.$store.state.build.character.timesEnlightened;
      },
      set(value) {
        this.$store.commit("updateTimesEnlightened", value);
      },
    },
    exportedCharacter() {
      return this.$store.getters.exportedCharacter;
    },
    settingsInfiniteMode() {
      return this.$store.state.settings.infiniteMode;
    }
  },
  methods: {
    toggleCharacterPane() {
      this.$store.commit("toggleCharacterPane");
    },
    toggleXPAndLuminancePane() {
      this.$store.commit("toggleXPAndLuminancePane");
    },
    toggleKnobsAndDialsPane() {
      this.$store.commit("toggleKnobsAndDialsPane");
    },
    toggleExtraSkillCreditsPane() {
      this.$store.commit("toggleExtraSkillCreditsPane");
    },
    updateLevel(e) {
      let actual = Math.round(Number(e.target.value));

      if (isNaN(actual) || actual < MIN_LEVEL) {
        actual = MIN_LEVEL;
      } else if (!this.settingsInfiniteMode && actual > MAX_LEVEL) {
        actual = MAX_LEVEL;
      }

      this.$store.commit("updateLevel", actual);
    },
    changeAllInvestments(e) {
      this.$store.dispatch("changeAllInvestment", e.target.value);
    },
    changeAllBuffs(e) {
      this.$store.dispatch("changeAllBuffs", e.target.value);
    },
    changeAllCantrips(e) {
      this.$store.dispatch("changeAllCantrips", e.target.value);
    },
    showSettingsModal(e) {
      this.$store.dispatch("showSettingsModal");
    },
    hideSettingsModal(e) {
      this.$store.dispatch("hideSettingsModal");
    },
  },
};
</script>
