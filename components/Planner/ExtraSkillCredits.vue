<template>
  <div id="extraskillcredits" class="header">
    <div>
      <div class="header-title" v-on:click="toggle">
        <h3>Extra Skill Credits</h3>
      </div>
      <div class="header-items alt-onecol" v-if="collapsed">
        <ExtraSkillCredit id="railrea" name="Aun Ralirea" />
        <ExtraSkillCredit id="oswald" name="Chasing Oswald" />
        <ExtraSkillCredit id="luminance1" name="Luminance 1" />
        <ExtraSkillCredit id="luminance2" name="Luminance 2" />
      </div>
    </div>
  </div>
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
    collapsed() {
      return this.store.extraSkillCreditsPaneVisible;
    },
  },
  methods: {
    toggle() {
      this.store.toggleExtraSkillCreditsPane();
    },
  },
};
</script>
