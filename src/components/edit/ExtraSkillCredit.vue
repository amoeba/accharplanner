<template>
  <div>
    <input
      v-bind:id="name"
      v-bind:name="name"
      type="checkbox"
      v-model="checked"
    />
    <label v-bind:for="name">{{ name }}</label>
  </div>
</template>

<script>
export default {
  name: "ExtraSkillCredit",
  props: {
    id: String,
    name: String,
  },
  computed: {
    checked: {
      get() {
        return this.$store.state.build.character.extraSkillCredits[this.id];
      },

      set(value) {
        this.$store.commit("updateExtraSkillCredit", {
          name: this.id,
          value: value,
        });
      },
    },
  },
};
</script>
