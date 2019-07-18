<template>
  <tbody id="vitals">
    <tr>
      <th colspan="12">Vitals</th>
    </tr>
    <tr class="pane-header">
      <th colspan="2">Name</th>
      <th colspan="2">Creation</th>
      <th>Base</th>
      <th>Buffed</th>
      <th colspan="2">Invested</th>
      <th>Buff</th>
      <th>Cantrip</th>
    </tr>
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
      <th>
        <select v-on:change="changeBuffed">
          <option value="0">None</option>
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="3">III</option>
          <option value="4">IV</option>
          <option value="5">V</option>
          <option value="6">VI</option>
          <option value="7">VII</option>
          <option value="8">VII</option>
        </select>
      </th>
      <th>
        <select v-on:change="changeCantrips">
          <option value="0">None</option>
          <option value="1">Minor</option>
          <option value="2">Major</option>
          <option value="3">Epic</option>
          <option value="4">Legendary</option>
        </select>
      </th>
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
    Vital
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllVitalInvestment", e.target.value);
    },
    changeBuffed(e) {
      this.$store.commit("changeAllVitalBuffs", e.target.value);
    },
    changeCantrips(e) {
      this.$store.commit("changeAllVitalCantrips", e.target.value);
    }
  }
};
</script>
