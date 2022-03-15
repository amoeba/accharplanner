<template>
  <tbody id="vitals">
    <tr class="controls">
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>
        <input
          type="range"
          min="0"
          max="196"
          value="0"
          v-on:change="changeInvested"
        />
      </th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
    </tr>
    <Vital name="health" display-name="Health" tabIndex="106" />
    <Vital name="stamina" display-name="Stamina" tabIndex="107" />
    <Vital name="mana" display-name="Mana" tabIndex="107" />
  </tbody>
</template>

<script>
import Vital from "./Vital.vue";

export default {
  name: "Vitals",
  components: {
    Vital,
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllVitalInvestment", e.target.value);
    },
  },
};
</script>
