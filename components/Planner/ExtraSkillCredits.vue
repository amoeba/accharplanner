<template>
  <Pane
    :toggle-expanded="toggleExpanded"
    :is-expanded="isExpanded"
  >
    <template #title>
      Extra Skill Credits
    </template>
    <template #content>
      <ExtraSkillCredit
        id="railrea"
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
    </template>
  </Pane>
</template>

<script>
import ExtraSkillCredit from "./ExtraSkillCredit.vue";
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "ExtraSkillCredits",
  components: {
    ExtraSkillCredit,
  },
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  computed: {
    isExpanded() {
      return this.store.extraSkillCreditsPaneVisible;
    },
  },
  methods: {
    toggleExpanded() {
      this.store.toggleExtraSkillCreditsPane();
    },
  },
};
</script>
