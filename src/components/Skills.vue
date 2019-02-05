<template>
  <div>
    <h3>Skills</h3>
    <span>Invested <input type="range" min="0" max="226" v-on:change="changeInvested" /></span>

    <SkillGroup training="specialized" />
    <SkillGroup training="trained" />
    <SkillGroup training="untrained" />
    <SkillGroup training="unusable" />
  </div>
</template>

<script>
import SkillGroup from "./SkillGroup.vue";

export default {
  name: "Skills",
  components: { SkillGroup },
  methods: {
    changeInvested (e) {
      this.$store.commit("changeAllSkillInvestment", e.target.value);
    }
  }
};
</script>
