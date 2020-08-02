<template>
  <div id="extraskillcredits" class="header">
    <div>
      <div class="header-title" v-on:click="toggle">
        <h3>Extra Skill Credits</h3>
      </div>
      <div class="header-items alt-onecol" v-if="collapsed">
        <ExtraSkillCredit id="railrea" name="Aun Railrea" />
        <ExtraSkillCredit id="oswald" name="Chasing Oswald" />
        <ExtraSkillCredit id="luminance1" name="Luminance 1" />
        <ExtraSkillCredit id="luminance2" name="Luminance 2" />
      </div>
    </div>
  </div>
</template>

<script>
import ExtraSkillCredit from "./ExtraSkillCredit.vue";

export default {
  name: "ExtraSkillCredits",
  components: {
    ExtraSkillCredit
  },
  computed: {
    collapsed() {
      return this.$store.getters.extraSkillCreditsPaneVisible;
    }
  },
  methods: {
    toggle() {
      this.$store.commit("toggleExtraSkillCreditsPane");
    }
  }
};
</script>
