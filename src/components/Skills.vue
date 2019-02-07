<template>
  <div>
    <h3>Skills</h3>
    <p>Specialized Spent: {{ specializedSkillPointsSpent }} / 70</p>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th colspan="2">Creation</th>
          <th colspan="2">Invested</th>
          <th>Base</th>
          <th>Buffed</th>
          <th colspan="2">Buff</th>
          <th colspan="2">Cantrip</th>
        </tr>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th><input type="range" min="0" max="190" v-on:change="changeInvested" /></th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th><input type="range" min="0" max="8" value="0" v-on:change="changeBuffed" /></th>
          <th>&nbsp;</th>
          <th><input type="range" min="0" max="4" value="0" v-on:change="changeCantrips" /></th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <SkillGroup training="specialized" />
      <SkillGroup training="trained" />
      <SkillGroup training="untrained" />
      <SkillGroup training="unusable" />
    </table>
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
    },
    changeCantrips (e) {
      this.$store.commit("changeAllSkillCantrips", e.target.value);
    }
  }
};
</script>
