<script>
import ExtraSkillCredits from './ExtraSkillCredits.vue'
import { usePlannerStore } from '~/stores/planner'

export default {
  name: 'Headers',
  components: {
    ExtraSkillCredits,
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
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
      return this.store.characterPaneVisible
    },
    isLuminanceHeaderExpanded() {
      return this.store.xpAndLuminancePaneVisible
    },
    isKnobsAndDialsHeaderExpanded() {
      return this.store.knobsAndDialsPaneVisible
    },
    totalXPEarned() {
      return Number(this.store.totalXPEarned).toLocaleString()
    },
    totalXPInvested() {
      return Number(this.store.totalXPInvested).toLocaleString()
    },
    totalXPInvestedError() {
      return this.store.totalXPInvestedError
    },
    unassignedXP() {
      return Number(this.store.unassignedXP).toLocaleString()
    },
    unassignedXPError() {
      return this.store.unassignedXPError
    },
    isOverspent() {
      return (
        Number(this.store.totalXPInvested) > Number(this.store.totalXPEarned)
        || this.store.skillPointsSpent > this.store.skillPointsAvailable
      )
    },
    skillPointsSpent() {
      return this.store.skillPointsSpent
    },
    skillPointsAvailable() {
      return this.store.skillPointsAvailable
    },
    augmentationsSpent() {
      return this.store.augmentationsSpent
    },
    requiredLevel() {
      return this.store.requiredLevel
    },
    totalLuminanceXPSpent() {
      return this.store.totalLuminanceXPSpent.toLocaleString()
    },
    name: {
      get() {
        return this.store.build.character.name
      },
      set(value) {
        this.store.updateName(value)
      },
    },
    level: {
      get() {
        return this.store.build.character.level
      },
      set(value) {
        this.store.updateLevel(value)
      },
    },
    races() {
      return Object.keys(Race)
    },
    race: {
      get() {
        return this.store.build.character.race
      },
      set(value) {
        this.store.updateRace(value)
      },
    },
    gender: {
      get() {
        return this.store.build.character.gender
      },
      set(value) {
        this.store.updateGender(value)
      },
    },
    timesEnlightened: {
      get() {
        return this.store.build.character.timesEnlightened
      },
      set(value) {
        this.store.updateTimesEnlightened(value)
      },
    },
    exportedCharacter() {
      return this.store.exportedCharacter
    },
    settingsInfiniteMode() {
      return this.store.settings.infiniteMode
    },
  },
  methods: {
    toggleCharacterHeaderExpanded() {
      this.store.toggleCharacterPane()
    },
    toggleLuminanceHeaderExpanded() {
      this.store.toggleXPAndLuminancePane()
    },
    toggleKnobsAndDialsHeaderExpanded() {
      this.store.toggleKnobsAndDialsPane()
    },
    updateLevel(e) {
      let actual = Math.round(Number(e.target.value))

      if (Number.isNaN(actual) || actual < MIN_LEVEL)
        actual = MIN_LEVEL
      else if (!this.settingsInfiniteMode && actual > MAX_LEVEL)
        actual = MAX_LEVEL

      this.store.updateLevel(actual)
    },
    changeAllInvestments(e) {
      this.store.changeAllInvestment(e.target.value)
    },
    changeAllBuffs(e) {
      this.store.changeAllBuffs(e.target.value)
    },
    changeAllCantrips(e) {
      this.store.changeAllCantrips(e.target.value)
    },
    showSettingsModal(e) {
      this.store.showSettingsModal()
    },
    hideSettingsModal(e) {
      this.store.hideSettingsModal()
    },
  },
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
    <CollapsiblePane
      :toggle-expanded="toggleCharacterHeaderExpanded"
      :is-expanded="isCharacterHeaderExpanded"
    >
      <template #title>
        Character
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <label class="flex gap-2">
            Name
            <input id="charname" v-model="name" class="w100" type="text">
          </label>
          <label class="flex gap-2">
            Race
            <select v-model="race">
              <option v-for="race in races" :key="race">
                {{ race }}
              </option>
            </select>
          </label>
          <label class="flex items-center gap-2">
            Gender
            <div class="flex gap-2">
              <label class="flex gap-2">
                <input
                  id="female"
                  v-model="gender"
                  type="radio"
                  value="Female"
                >
                <span class="block">Female</span>
              </label>
              <label class="flex gap-2">
                <input id="male" v-model="gender" type="radio" value="Male">
                <span class="block">Male</span>
              </label>
            </div>
          </label>
          <label class="flex gap-2">
            Level
            <div>
              <div v-if="!settingsInfiniteMode" class="flex gap-2">
                <div class="flex grow">
                  <input v-model="level" type="range" min="1" :max="maxLevel">
                </div>
                <div class="w-10">
                  <input v-model="level" type="text" @change="updateLevel">
                </div>
              </div>
              <div v-if="settingsInfiniteMode" class="flex gap-2">
                <div class="flex grow">
                  <span class="text-green-600">∞</span>
                </div>
                <div class="">
                  <input
                    v-model="level"
                    class="w-full"
                    type="text"
                    @change="updateLevel"
                  >
                </div>
              </div>
            </div>
          </label>
        </div>
      </template>
    </CollapsiblePane>
    <CollapsiblePane
      :toggle-expanded="toggleLuminanceHeaderExpanded"
      :is-expanded="isLuminanceHeaderExpanded"
    >
      <template #title>
        XP &amp; Luminance
      </template>
      <template #right>
        <ToolTip
          v-tooltip="
            'These numbers are a bit of a work in progress. Total and Required Level tend to match pretty well but Unassigned and Spent seem to get way off sometimes.'
          "
        >
          !
        </ToolTip>
      </template>
      <template #content>
        <div class="grid grid-cols-[auto_4em] gap-2">
          <div>Unassigned</div>
          <div class="justify-self-end">
            <span
              v-if="unassignedXPError"
              v-tooltip="unassignedXPError"
              class="tip"
            >!</span>
            <span v-if="!unassignedXPError">{{ unassignedXP }}</span>
          </div>
          <div>Spent</div>
          <div class="justify-self-end">
            <span
              v-if="totalXPInvestedError"
              v-tooltip="totalXPInvestedError"
              class="tip"
            >!</span>
            <span v-if="!totalXPInvestedError">{{ totalXPInvested }}</span>
          </div>
          <div>Total</div>
          <div class="justify-self-end">
            {{ totalXPEarned }}
          </div>
          <div>Required Level</div>
          <div class="justify-self-end" :class="isOverspent ? 'red' : 'gray'">
            {{ requiredLevel }}
          </div>
          <div>Luminance Spent</div>
          <div class="justify-self-end">
            {{ totalLuminanceXPSpent }}
          </div>
        </div>
      </template>
    </CollapsiblePane>
    <CollapsiblePane
      :toggle-expanded="toggleKnobsAndDialsHeaderExpanded"
      :is-expanded="isKnobsAndDialsHeaderExpanded"
    >
      <template #title>
        Knobs &amp; Dials
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <label class="flex gap-2">
            Invested
            <input
              class="w100"
              type="range"
              min="0"
              :max="maxSkillInvestedSpecialized"
              value="0"
              @change="changeAllInvestments"
            >
          </label>
          <label class="flex gap-2">
            Buffs
            <select @change="changeAllBuffs">
              <option value="0" />
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
            <select @change="changeAllCantrips">
              <option value="0" />
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
                <input
                  v-model="timesEnlightened"
                  type="range"
                  min="0"
                  :max="maxTimesEnlightened"
                >
              </div>
              <div>
                <input v-model="timesEnlightened" class="w-6" type="text">
              </div>
            </div>
          </label>
        </div>
      </template>
    </CollapsiblePane>
    <ExtraSkillCredits class="header" />
  </div>
</template>
