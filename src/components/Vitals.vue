<template>
  <div>
    <h3>Vitals</h3>
    <ul>
      <li>Invested <input type="range" min="0" max="196" v-on:change="changeInvested" /></li>
      <li>Buffed <input type="range" min="0" max="8" value="0" v-on:change="changeBuffed" /></li>
      <li>Cantrip <input type="range" min="0" max="4" value="0" v-on:change="changeCantrips" /></li>
    </ul>

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
    },
    changeBuffed (e) {
      this.$store.commit("changeAllVitalBuffs", e.target.value);
    },
    changeCantrips (e) {
      this.$store.commit("changeAllVitalCantrips", e.target.value);
    }
  }
};
</script>
