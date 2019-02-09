<template>
  <tbody id="vitals">
    <tr>
      <th colspan="11">Vitals</th>
    </tr>
    <tr class="headers">
      <th>Name</th>
      <th colspan="2">Creation</th>
      <th colspan="2">Invested</th>
      <th>Base</th>
      <th>Buffed</th>
      <th colspan="2">Buff</th>
      <th colspan="2">Cantrip</th>
    </tr>
    <tr class="controls">
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th><input type="range" min="0" max="190" value="0" v-on:change="changeInvested" /></th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th><input type="range" min="0" max="8" value="0" v-on:change="changeBuffed" /></th>
      <th>&nbsp;</th>
      <th><input type="range" min="0" max="4" value="0" v-on:change="changeCantrips" /></th>
      <th>&nbsp;</th>
    </tr>
    <Vital name="health" displayName="Health" />
    <Vital name="stamina" displayName="Stamina" />
    <Vital name="mana" displayName="Mana" />
  </tbody>
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
