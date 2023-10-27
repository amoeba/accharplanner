<template>
  <Pane :toggleExpanded="toggleExpanded" :isExpanded="isExpanded">
    <template #title>Extra Skill Credits</template>
    <template #content>
      <ExtraSkillCredit id="railrea" name="Aun Ralirea" />
      <ExtraSkillCredit id="oswald" name="Chasing Oswald" />
      <ExtraSkillCredit id="luminance1" name="Luminance 1" />
      <ExtraSkillCredit id="luminance2" name="Luminance 2" />
    </template>
  </Pane>
</template>

<script>
import ExtraSkillCredit from "./ExtraSkillCredit.vue";
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "ExtraSkillCredits",
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  components: {
    ExtraSkillCredit,
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
