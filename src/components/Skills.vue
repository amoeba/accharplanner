<template>
  <div>
    <h3>Skills</h3>
    <ul>
      <li>Invested <input type="range" min="0" max="226" v-on:change="changeInvested" /></li>
      <li>Buffed <input type="range" min="0" max="8" value="0" v-on:change="changeBuffed" /></li>
      <li>Specialized Spent: {{ specializedSkillPointsSpent }} / 70</li>
    </ul>
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
  computed: {
    specializedSkillPointsSpent () {
      return this.$store.getters.specializedSkillPointsSpent;
    }
  },
  methods: {
    changeInvested (e) {
      this.$store.commit("changeAllSkillInvestment", e.target.value);
    },
    changeBuffed (e) {
      this.$store.commit("changeAllSkillBuffs", e.target.value);
    }
  }
};
</script>
