<script>
import Skill from "./Skill.vue"
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Skills",
  components: { Skill },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  data() {
    return {
      filterQuery: "",
      maxSkillInvestedSpecialized: MAX_SKILL_INVESTED_SPECIALIZED,
    }
  },
  computed: {
    isExpanded() {
      return this.store.skillsPaneVisible
    },
    skillPointsSpent() {
      return this.store.skillPointsSpent
    },
    skillPointsAvailable() {
      return this.store.skillPointsAvailable
    },
    specializedSkillPointsSpent() {
      return this.store.specializedSkillPointsSpent
    },
    maxSpecializedSkillPointsSpent() {
      return MAX_SPECIALIZED_SKILL_CREDITS_SPENT
    },
    skillPointsSpentErrorText() {
      const overspent
        = this.store.skillPointsSpent - this.store.skillPointsAvailable

      if (overspent > 0) {
        return (
          `You've overspent by ${overspent
          } skill${overspent === 1 ? " point!" : "  points!"}`
        )
      }

      return ""
    },
    augmentationsRequired() {
      return this.store.augmentationsSpent
    },
    augmentationsRequiredText() {
      if (this.store.augmentationsSpent === 0) {
        return ""
      }
      else if (this.store.augmentationsSpent === 1) {
        return "1 aug required"
      }
      else {
        return `${this.store.augmentationsSpent} augs required`
      }
    },
    specializedSkills() {
      const collection = Object.keys(this.store.build.character.skills).filter(
        key =>
          this.store.build.character.skills[key].training
          === Training.SPECIALIZED,
      )
      return filterText(this.filterQuery, collection)
    },
    trainedSkills() {
      const collection = Object.keys(this.store.build.character.skills).filter(
        key =>
          this.store.build.character.skills[key].training === Training.TRAINED,
      )
      return filterText(this.filterQuery, collection)
    },
    untrainedSkills() {
      const collection = Object.keys(this.store.build.character.skills).filter(
        key =>
          this.store.build.character.skills[key].training === Training.UNTRAINED,
      )
      return filterText(this.filterQuery, collection)
    },
    unusableSkills() {
      const collection = Object.keys(this.store.build.character.skills).filter(
        key =>
          this.store.build.character.skills[key].training === Training.UNUSABLE,
      )
      return filterText(this.filterQuery, collection)
    },
    noSpecializedSkills() {
      return this.store.specializedSkills.length === 0
    },
    noTrainedSkills() {
      return this.store.trainedSkills.length === 0
    },
    filterPresent() {
      return this.filterQuery !== ""
    },
  },
  methods: {
    toggleExpanded() {
      this.store.toggleSkillsPane()
    },
    changeInvested(e) {
      this.store.changeAllSkillInvestment(e.target.value)
    },
    changeBuffed(e) {
      this.store.changeAllSkillBuffs(e.target.value)
    },
    changeCantrips(e) {
      this.store.changeAllSkillCantrips(e.target.value)
    },
    clearFilter() {
      this.filterQuery = ""
    },
  },
}
</script>

<template>
  <CollapsiblePane
    :toggle-expanded="toggleExpanded"
    :is-expanded="isExpanded"
    :is-collapsible="true"
  >
    <template #title>
      <ToolTip
        v-tooltip="'Skill levels may be higher than what you see ingame because some augmentations and auras (i.e., Master of the* and World) don\'t increase the levels shown on your character sheet while still having an effect during skill checks. The levels shown here are the effective level.'
        "
      >
        !
      </ToolTip>
      <h3>Skills</h3>
      <span class="text-rose-500">{{ skillPointsSpentErrorText }}</span>
    </template>
    <template #right>
      <span v-tooltip="'Skill points spent.'">{{ skillPointsSpent }} / {{ skillPointsAvailable }}</span>
    </template>
    <template #content>
      <table class="w-full">
        <thead>
          <tr>
            <th colspan="4">
              Name
            </th>
            <th>
              <span
                v-tooltip="{
                  content:
                    '<strong>Trained:</strong> No Bonus<br><strong>Specialized:</strong> +10',
                  html: true,
                }"
              >Base</span>
            </th>
            <th>Buffed</th>
            <th colspan="2">
              Invested
            </th>
            <th>Buff</th>
            <th>Cantrip</th>
          </tr>
          <tr>
            <th colspan="2">
              <div class="flex">
                <input
                  v-model="filterQuery"
                  class="font-normal"
                  type="text"
                  placeholder="Type to filter..."
                >
                <ButtonView
                  v-if="filterPresent"
                  class="rounded px-2 py-1 hover:bg-zinc-200"
                  @click="clearFilter"
                >
                  Reset
                </ButtonView>
              </div>
            </th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="2">
              <input
                type="range"
                min="0"
                :max="maxSkillInvestedSpecialized"
                value="0"
                @change="changeInvested"
              >
            </th>
            <th>
              <select @change="changeBuffed">
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
            </th>
            <th>
              <select @change="changeCantrips">
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
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              class="p-1 text-left text-white"
              style="
                background: linear-gradient(
                  to right,
                  #392067,
                  #392067,
                  transparent
                );
              "
              colspan="10"
            >
              <div
                v-tooltip="'You are limited to 70 total credits specialized. Specialized skills get a 10 point bonus.'
                "
              >
                Specialized ({{ specializedSkillPointsSpent }} /
                {{ maxSpecializedSkillPointsSpent }})
                {{ augmentationsRequiredText }}
              </div>
            </th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="6">
              &nbsp;
            </th>
          </tr>
          <tr v-if="noSpecializedSkills">
            <td
              colspan="12"
            >
              No specialized skills
            </td>
          </tr>
          <Skill
            v-for="(skill, index) in specializedSkills"
            :key="skill"
            :name="skill"
            training="specialized"
            :tab-index="index + 1000"
          />
          <tr>
            <th
              class="p-1 text-left text-white"
              style="
                background: linear-gradient(
                  to right,
                  #0f3c3e,
                  #0f3c3e,
                  transparent
                );
              "
              colspan="10"
            >
              Trained
            </th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="6">
              &nbsp;
            </th>
          </tr>
          <tr v-if="noTrainedSkills">
            <td
              colspan="12"
            >
              No trained skills
            </td>
          </tr>
          <Skill
            v-for="(skill, index) in trainedSkills"
            :key="skill"
            :name="skill"
            training="trained"
            :tab-index="index + 1100"
          />
          <tr>
            <th
              class="p-1 text-left text-white"
              style="
                background: linear-gradient(
                  to right,
                  #978b3d,
                  #b4a548,
                  transparent
                );
              "
              colspan="10"
            >
              Untrained
            </th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="6">
              &nbsp;
            </th>
          </tr>
          <Skill
            v-for="(skill, index) in untrainedSkills"
            :key="skill"
            :name="skill"
            training="untrained"
            :tab-index="index + 1200"
          />
          <tr>
            <th
              class="p-1 text-left text-white"
              style="
                background: linear-gradient(
                  to right,
                  #978b3d,
                  #b4a548,
                  transparent
                );
              "
              colspan="10"
            >
              Unusable
            </th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="6">
              &nbsp;
            </th>
          </tr>
          <Skill
            v-for="(skill, index) in unusableSkills"
            :key="skill"
            :name="skill"
            training="unusable"
            :tab-index="index + 1300"
          />
        </tbody>
      </table>
    </template>
  </CollapsiblePane>
</template>
