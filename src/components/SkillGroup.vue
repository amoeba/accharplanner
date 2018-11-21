<template>
  <div>
    <span>{{ training }}</span>
    <ul>
      <li v-for="skill in skills">
        <Skill :name=skill />
      </li>
    </ul>
  </div>
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
