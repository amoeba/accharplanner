<template>
  <li>
    <input
      v-bind:id="name"
      v-bind:name="name"
      type="checkbox"
      v-model="checked"
    />
    <label v-bind:for="name">{{ name }}</label>
  </li>
</template>

<script>
export default {
  name: "ExtraSkillCredit",
  props: {
    id: String,
    name: String
  },
  computed: {
    checked: {
      get() {
        return this.$store.state.build.character.extraSkillCredits[this._props.id];
      },

      set(value) {
        this.$store.commit("updateExtraSkillCredit", {
          name: this._props.id,
          value: value
        });
      }
    }
  }
};
</script>
