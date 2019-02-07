<template>
  <div>
    <h3>Extra Skill Credits</h3>

    <ul>
      <ExtraSkillCredit id="railrea" name="Aun Railrea" />
      <ExtraSkillCredit id="oswald" name="Chasing Oswald" />
      <ExtraSkillCredit id="luminance1" name="Luminance 1" />
      <ExtraSkillCredit id="luminance2" name="Luminance 2" />

    </ul>
  </div>
</template>

<script>
import ExtraSkillCredit from "./ExtraSkillCredit.vue";

export default {
  name: "ExtraSkillCredits",
  components: {
    ExtraSkillCredit
  }
};
</script>
<style scoped>
ul {
  list-style-type: none;
  margin: 0px 0px 1.5rem 1.5rem;
  padding: 0px;
}

li {
  display: inline-block;
  margin-right: 1.5rem;
}
</style>
