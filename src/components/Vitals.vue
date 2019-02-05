<template>
  <div>
    <h3>Vitals</h3>
    <span>Invested <input type="range" min="0" max="196" v-on:change="changeInvested" /></span>
    <ul>
      <Vital name="health" />
      <Vital name="stamina" />
      <Vital name="mana" />
    </ul>
  </div>
</template>

<script>
import Vital from "./Vital.vue";

export default {
  name: "Vitals",
  components: {
    Vital
  },
  methods: {
    changeInvested (e) {
      this.$store.commit("changeAllVitalInvestment", e.target.value);
    }
  }
};
</script>
