<script>
import ExtraSkillCredit from "./ExtraSkillCredit.vue"
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "ExtraSkillCredits",
  components: {
    ExtraSkillCredit,
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  computed: {
    isExpanded() {
      return this.store.extraSkillCreditsPaneVisible
    },
  },
  methods: {
    toggleExpanded() {
      this.store.toggleExtraSkillCreditsPane()
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
      Extra Skill Credits
    </template>
    <template #content>
      <div
        id="railrea"
        class="px-2 py-1"
      >
        <ExtraSkillCredit
          id="aun_railrea"
          name="Aun Ralirea"
        />
        <ExtraSkillCredit
          id="oswald"
          name="Chasing Oswald"
        />
        <ExtraSkillCredit
          id="luminance1"
          name="Luminance 1"
        />
        <ExtraSkillCredit
          id="luminance2"
          name="Luminance 2"
        />
      </div>
    </template>
  </CollapsiblePane>
</template>
