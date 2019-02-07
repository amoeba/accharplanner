<template>
  <tbody>
    <tr>
      <td>{{ training }}</td>
    </tr>
    <Skill v-for="skill in skills" :key="skill" :name="skill" />
  </tbody>
</template>

<script>
import Skill from "./Skill.vue";

export default {
  name: "SkillGroup",
  components: { Skill },
  props: {
    training: String,
  },
  computed: {
    skills () {
      return this.$store.getters[this._props.training + "Skills"]
    }
  }
};
</script>
