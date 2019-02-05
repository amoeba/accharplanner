<template>
  <div>
    <h3>Skills</h3>
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
  components: { SkillGroup }
};
</script>
