<template>
  <tbody id="attributes">
    <tr>
      <th colspan="2" class="name">Name</th>
      <th class="creation" colspan="2">Creation</th>
      <th>Base</th>
      <th>Buffed</th>
      <th class="invested" colspan="2">Invested</th>
      <th class="buff">Buff</th>
      <th class="cantrip">Cantrip</th>
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
          max="190"
          value="0"
          v-on:change="changeInvested"
        />
      </th>
      <th>&nbsp;</th>
      <th>
        <select v-on:change="changeBuffed">
          <option value="0"></option>
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="3">III</option>
          <option value="4">IV</option>
          <option value="5">V</option>
          <option value="6">VI</option>
          <option value="7">VII</option>
          <option value="8">VIII</option>
        </select>
      </th>
      <th>
        <select v-on:change="changeCantrip">
          <option value="0"></option>
          <option value="1">Minor</option>
          <option value="2">Major</option>
          <option value="3">Epic</option>
          <option value="4">Legen.</option>
        </select>
      </th>
    </tr>
    <Attribute name="strength" tab-index="100" />
    <Attribute name="endurance" tab-index="101" />
    <Attribute name="coordination" tab-index="102" />
    <Attribute name="quickness" tab-index="103" />
    <Attribute name="focus" tab-index="104" />
    <Attribute name="self" tab-index="105" />
  </tbody>
</template>

<script>
import Attribute from "./Attribute.vue";

export default {
  name: "Attributes",
  components: {
    Attribute
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllAttributeInvestment", e.target.value);
    },
    changeBuffed(e) {
      this.$store.commit("changeAllAttributeBuffs", e.target.value);
    },
    changeCantrip(e) {
      this.$store.commit("changeAllAttributeCantrips", e.target.value);
    }
  }
};
</script>
<style></style>
