<template>
  <div class="grid grid-cols-4 gap-2">
    <Pane :toggleExpanded="toggleCharacterHeaderExpanded" :isExpanded="isCharacterHeaderExpanded">
      <template #title>Character</template>
      <template #content>
        <div class="flex flex-col gap-2">
          <label class="flex gap-2">
            Name
            <input class="w100" id="charname" type="text" v-model="name" />
          </label>
          <label class="flex gap-2">
            Race
            <select v-model="race">
              <option v-for="race in races" v-bind:key="race">
                {{ race }}
              </option>
            </select>
          </label>
          <label class="flex gap-2">
            Gender
            <div class="flex gap-2">
              <label class="flex gap-2">
                <input type="radio" id="female" value="Female" v-model="gender" />
                <span class="block">Female</span>
              </label>
              <label class="flex gap-2">
                <input type="radio" id="male" value="Male" v-model="gender" />
                <span class="block">Male</span>
              </label>
            </div>
          </label>
          <label class="flex gap-2">
            Level
            <div>
              <div v-if="!settingsInfiniteMode" class="flex gap-2">
                <div class="flex grow">
                  <input class="" type="range" min="1" :max="maxLevel" v-model="level" />
                </div>
                <div class="">
                  <input class="max-w-[3em]" type="text" v-bind:value="level" v-on:change="updateLevel" />
                </div>
              </div>
              <div v-if="settingsInfiniteMode" class="flex gap-2">
                <div class="flex grow">
                  <span class="text-green-600">∞</span>
                </div>
                <div class="">
                  <input class="max-w-[6em]" type="text" v-bind:value="level" v-on:change="updateLevel" />
                </div>
              </div>
            </div>
          </label>
        </div>
      </template>
    </Pane>
    <Pane :toggleExpanded="toggleLuminanceHeaderExpanded" :isExpanded="isLuminanceHeaderExpanded">
      <template #title>XP &amp; Luminance</template>
      <template #right>
        <Tip
          v-tooltip="'These numbers are a bit of a work in progress. Total and Required Level tend to match pretty well but Unassigned and Spent seem to get way off sometimes.'">
          !</Tip>
      </template>
      <template #content>
        <div class="grid grid-cols-[auto_4em] gap-2">
          <div>Unassigned</div>
          <div class="justify-self-end">
            <span v-if="unassignedXPError" class="tip" v-tooltip="unassignedXPError">!</span>
            <span v-if="!unassignedXPError">{{ unassignedXP }}</span>
          </div>
          <div>Spent</div>
          <div class="justify-self-end">
            <span v-if="totalXPInvestedError" class="tip" v-tooltip="totalXPInvestedError
              ">!</span>
            <span v-if="!totalXPInvestedError">{{ totalXPInvested }}</span>
          </div>
          <div>Total</div>
          <div class="justify-self-end">{{ totalXPEarned }}</div>
          <div>Required Level</div>
          <div class="justify-self-end" v-bind:class="isOverspent ? 'red' : 'gray'">
            {{ requiredLevel }}
          </div>
          <div>Luminance Spent</div>
          <div class="justify-self-end">{{ totalLuminanceXPSpent }}</div>
        </div>
      </template>
    </Pane>
    <Pane :toggleExpanded="toggleKnobsAndDialsHeaderExpanded" :isExpanded="isKnobsAndDialsHeaderExpanded">
      <template #title>Knobs &amp; Dials</template>
      <template #content>
        <div class="flex flex-col gap-2">
          <label class="flex gap-2">
            Invested
            <input class="w100" type="range" min="0" :max="maxSkillInvestedSpecialized" value="0"
              v-on:change="changeAllInvestments" />
          </label>
          <label class="flex gap-2">
            Buffs
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
          </label>
          <label class="flex gap-2">
            Cantrips
            <select v-on:change="changeAllCantrips">
              <option value="0"></option>
              <option value="1">Minor</option>
              <option value="2">Major</option>
              <option value="3">Epic</option>
              <option value="4">Legen.</option>
            </select>
          </label>
          <label class="flex gap-2">
            Enlightened
            <div class="flex gap-2">
              <div class="flex grow">
                <input type="range" min="0" :max="maxTimesEnlightened" v-model="timesEnlightened" />
              </div>
              <div>
                <input class="max-w-[2em]" type="text" v-model="timesEnlightened" />
              </div>
            </div>
          </label>
        </div>
      </template>
    </Pane>
    <ExtraSkillCredits class="header" />
  </div>
</template>

<script>
import ExtraSkillCredits from "./ExtraSkillCredits.vue";
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Headers",
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
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
    isCharacterHeaderExpanded() {
      return this.store.characterPaneVisible;
    },
    isLuminanceHeaderExpanded() {
      return this.store.xpAndLuminancePaneVisible;
    },
    isKnobsAndDialsHeaderExpanded() {
      return this.store.knobsAndDialsPaneVisible;
    },
    totalXPEarned() {
      return Number(this.store.totalXPEarned).toLocaleString();
    },
    totalXPInvested() {
      return Number(this.store.totalXPInvested).toLocaleString();
    },
    totalXPInvestedError() {
      return this.store.totalXPInvestedError;
    },
    unassignedXP() {
      return Number(this.store.unassignedXP).toLocaleString();
    },
    unassignedXPError() {
      return this.store.unassignedXPError;
    },
    isOverspent() {
      return (
        Number(this.store.totalXPInvested) >
        Number(this.store.totalXPEarned) ||
        this.store.skillPointsSpent >
        this.store.skillPointsAvailable
      );
    },
    skillPointsSpent() {
      return this.store.skillPointsSpent;
    },
    skillPointsAvailable() {
      return this.store.skillPointsAvailable;
    },
    augmentationsSpent() {
      return this.store.augmentationsSpent;
    },
    requiredLevel() {
      return this.store.requiredLevel;
    },
    totalLuminanceXPSpent() {
      return this.store.totalLuminanceXPSpent.toLocaleString();
    },
    name: {
      get() {
        return this.store.build.character.name;
      },
      set(value) {
        this.store.updateName(value);
      },
    },
    level: {
      get() {
        return this.store.build.character.level;
      },
      set(value) {
        this.store.updateLevel(value);
      },
    },
    races() {
      return Object.keys(Race);
    },
    race: {
      get() {
        return this.store.build.character.race;
      },
      set(value) {
        this.store.updateRace(value);
      },
    },
    gender: {
      get() {
        return this.store.build.character.gender;
      },
      set(value) {
        this.store.updateGender(value);
      },
    },
    timesEnlightened: {
      get() {
        return this.store.build.character.timesEnlightened;
      },
      set(value) {
        this.store.updateTimesEnlightened(value);
      },
    },
    exportedCharacter() {
      return this.store.exportedCharacter;
    },
    settingsInfiniteMode() {
      return this.store.settings.infiniteMode;
    }
  },
  methods: {
    toggleCharacterHeaderExpanded() {
      this.store.toggleCharacterPane();
    },
    toggleLuminanceHeaderExpanded() {
      this.store.toggleXPAndLuminancePane();
    },
    toggleKnobsAndDialsHeaderExpanded() {
      this.store.toggleKnobsAndDialsPane();
    },
    updateLevel(e) {
      let actual = Math.round(Number(e.target.value));

      if (isNaN(actual) || actual < MIN_LEVEL) {
        actual = MIN_LEVEL;
      } else if (!this.settingsInfiniteMode && actual > MAX_LEVEL) {
        actual = MAX_LEVEL;
      }

      this.store.updateLevel(actual);
    },
    changeAllInvestments(e) {
      this.store.changeAllInvestment(e.target.value);
    },
    changeAllBuffs(e) {
      this.store.changeAllBuffs(e.target.value);
    },
    changeAllCantrips(e) {
      this.store.changeAllCantrips(e.target.value);
    },
    showSettingsModal(e) {
      this.store.showSettingsModal();
    },
    hideSettingsModal(e) {
      this.store.hideSettingsModal();
    },
  },
};
</script>
