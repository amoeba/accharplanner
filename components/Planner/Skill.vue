<script>
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Skill",
  props: {
    name: String,
    training: String,
    tabIndex: Number, // Number instead of String because we're :binding
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  computed: {
    displayName() {
      return SKILL_NAME[this.name]
    },
    formula() {
      return SKILL_FORMULA[this.name]
    },
    isBuffed() {
      return (
        Math.round(this.store[`${this.name}Buffed`])
        > Math.round(this.store[`${this.name}Base`])
      )
    },
    increaseCostText() {
      const currentTraining
        = this.store.build.character.skills[this.name].training

      if (currentTraining === Training.SPECIALIZED) {
        return ""
      }

      if (currentTraining === Training.TRAINED) {
        if (SPEC_COSTS_AUG[this.name]) {
          return "A"
        }
 else {
          return SKILL_COST_AT_TRAINING[this.name].specialized
        }
      }

      return SKILL_COST_AT_TRAINING[this.name].trained
    },
    decreaseCostText() {
      const currentTraining
        = this.store.build.character.skills[this.name].training

      if (
        currentTraining === Training.UNUSABLE
        || currentTraining === Training.UNTRAINED
      ) {
        return ""
      }

      if (currentTraining === Training.SPECIALIZED) {
        if (SPEC_COSTS_AUG[this.name]) {
          return "A"
        }
 else {
          return SKILL_COST_AT_TRAINING[this.name].specialized
        }
      }

      if (currentTraining === Training.TRAINED) {
        if (!UNTRAINABLE[this.name]) {
          return
        }
 else {
          return SKILL_COST_AT_TRAINING[this.name].trained
        }
      }

      return ""
    },
    cantIncrease() {
      // Can't if already specialized
      if (
        this.store.build.character.skills[this.name].training
          === Training.SPECIALIZED
      ) {
        return true
      }

      // Can't if out of credits
      const newTraining
        = this.store.build.character.skills[this.name].training
        === Training.TRAINED
          ? Training.SPECIALIZED
          : Training.TRAINED

      // Calculate the cost to raise. Because of the way SKILL_COST_AT_TRAINING is
      // built, the cost to spec, for example, if the cost when spec'd minus the
      // cost when trained.
      let newCost = 0

      if (newTraining === Training.SPECIALIZED) {
        newCost
          = SKILL_COST_AT_TRAINING[this.name][Training.SPECIALIZED]
          - SKILL_COST_AT_TRAINING[this.name][Training.TRAINED]
      }
 else if (newTraining === Training.TRAINED) {
        newCost = SKILL_COST_AT_TRAINING[this.name][Training.TRAINED]
      }

      if (
        this.store.skillPointsSpent + newCost
          > this.store.skillPointsAvailable
      ) {
        return true
      }

      // Can't if would push you over 70 max spec'd credits
      if (
        newTraining === Training.SPECIALIZED
        && this.store.specializedSkillPointsSpent + newCost
        > MAX_SPECIALIZED_SKILL_CREDITS_SPENT
      ) {
        return true
      }

      return false
    },
    cantDecrease() {
      const training = this.store.build.character.skills[this.name].training

      // Can't if not trained or higher
      if (training === Training.UNTRAINED || training === Training.UNTRAINED) {
        return true
      }

      // Can't if not untrainable
      if (training === Training.TRAINED && !UNTRAINABLE[this.name]) {
        return true
      }

      // Can't if not trained
      if (training === Training.UNTRAINED || training === Training.UNUSABLE) {
        return true
      }

      return false
    },
    canInvest() {
      const training = this.store.build.character.skills[this.name].training
      return training === Training.SPECIALIZED || training === Training.TRAINED
    },
    invested: {
      get() {
        return this.store.build.character.skills[this.name].invested
      },
      set(value) {
        let out = Math.round(Number(value) || 0)

        if (this.store.settings.infiniteMode) {
          // Do nothing
        }
 else if (
          this.training === Training.SPECIALIZED
            && out > MAX_SKILL_INVESTED_SPECIALIZED
        ) {
          out = MAX_SKILL_INVESTED_SPECIALIZED
        }
 else if (
          this.training === Training.TRAINED
            && out > MAX_SKILL_INVESTED_TRAINED
        ) {
          out = MAX_SKILL_INVESTED_TRAINED
        }
 else if (out < 0) {
          out = 0
        }

        this.store.updateSkillInvested({
          name: this.name,
          value: out,
        })
      },
    },
    maxInvestment() {
      if (
        this.store.build.character.skills[this.name].training
          === Training.SPECIALIZED
      ) {
        return MAX_SKILL_INVESTED_SPECIALIZED
      }
 else if (
        this.store.build.character.skills[this.name].training
          === Training.TRAINED
      ) {
        return MAX_SKILL_INVESTED_TRAINED
      }
 else {
        return -1
      }
    },
    base() {
      return Math.round(this.store[`${this.name}Base`])
    },
    buffed() {
      return Math.round(this.store[`${this.name}Buffed`])
    },
    buffLevel: {
      get() {
        return this.store.build.character.skills[this.name].buff
      },
      set(value) {
        this.store.updateSkillBuff({
          name: this.name,
          value,
        })
      },
    },
    buffName() {
      return BUFF_NAME[this.store.build.character.skills[this.name].buff]
    },
    cantrip: {
      get() {
        return this.store.build.character.skills[this.name].cantrip
      },
      set(value) {
        this.store.updateSkillCantrip({
          name: this.name,
          value,
        })
      },
    },
    cantripName() {
      return CANTRIP_NAME[this.store.build.character.skills[this.name].cantrip]
    },
  },
  methods: {
    increaseTraining() {
      this.store.increaseTraining(this.name)
    },
    decreaseTraining() {
      this.store.decreaseTraining(this.name)
    },
  },
}
</script>

<template>
  <tr>
    <td>
      <img
        style="clip-path: circle(50%)"
        :src="`/icons/${name}.png`"
        :alt="displayName"
        width="20"
        height="20"
      >
    </td>
    <td>
      {{ displayName }}
      <span class="text-gray-500">{{ formula }}</span>
    </td>
    <td>
      <button
        :class="cantDecrease ? 'bg-gray-200 dark:bg-stone-800 dark:text-stone-600' : 'bg-green-600 hover:bg-green-700'
        "
        class="rounded w-12 text-white px-1"
        :disabled="cantDecrease"
        @click="decreaseTraining"
      >
        {{ decreaseCostText }}
        ↓
      </button>
    </td>
    <td>
      <button
        :class="cantIncrease ? 'bg-gray-200 dark:bg-stone-800 dark:text-stone-600' : 'bg-green-600 hover:bg-green-700'
        "
        class="rounded w-12 text-white px-1"
        @click="increaseTraining"
      >
        {{ increaseCostText }} ↑
      </button>
    </td>
    <td>
      {{ base }}
    </td>
    <td :class="isBuffed ? 'text-green-600' : ''">
      {{ buffed }}
    </td>
    <td>
      <div v-if="canInvest">
        <input
          v-model="invested"
          type="range"
          min="0"
          :max="maxInvestment"
        >
      </div>
    </td>
    <td>
      <input
        v-model="invested"
        class="w-10"
        type="text"
        :tabindex="tabIndex"
      >
    </td>
    <td>
      <select v-model="buffLevel">
        <option value="0" />
        <option value="1">
          I
        </option>
        <option value="2">
          II
        </option>
        <option value="3">
          III
        </option>
        <option value="4">
          IV
        </option>
        <option value="5">
          V
        </option>
        <option value="6">
          VI
        </option>
        <option value="7">
          VII
        </option>
        <option value="8">
          VIII
        </option>
      </select>
    </td>
    <td>
      <select v-model="cantrip">
        <option value="0" />
        <option value="1">
          Minor
        </option>
        <option value="2">
          Major
        </option>
        <option value="3">
          Epic
        </option>
        <option value="4">
          Legen.
        </option>
      </select>
    </td>
  </tr>
</template>
