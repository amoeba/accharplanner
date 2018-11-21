<template>
  <div>
    <span>{{ name }}: {{ unbuffed }} / <span v-bind:class="{ buffed: isBuffed }">{{ buffed }}</span></span>
    <button v-on:click="increaseTraining">+</button>
    <button v-on:click="decreaseTraining">-</button>
  </div>
</template>

<script>
export default {
  name: "Skill",
  props: {
    name: String
  },
  computed: {
    unbuffed () {
      return this.$store.getters[this._props.name + "_unbuffed"]
    },
    buffed () {
      return this.$store.getters[this._props.name + "_buffed"]
    },
    isBuffed () {
      return this.$store.getters.isBuffed
    }
  },
  methods: {
    increaseTraining () {
      this.$store.commit("increaseTraining", this._props.name);
    },
    decreaseTraining () {
      this.$store.commit("decreaseTraining", this._props.name);
    }
  }
};
</script>

<style>
.buffed {
  color: green;
  font-weight: bold;
}
</style>
