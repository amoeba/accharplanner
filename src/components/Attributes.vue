<template>
  <tbody id="attributes">
    <tr>
      <th colspan="12">Attributes</th>
    </tr>
    <tr>
      <th colspan="12">
        Creation Attribute Points Spent: {{ attributePointsSpent }} / 330
      </th>
    </tr>
    <tr class="headers">
      <th colspan="2" class="name">Name</th>
      <th class="creation" colspan="2">Creation</th>
      <th>Base</th>
      <th>Buffed</th>
      <th class="invested" colspan="2">Invested</th>
      <th class="buff" colspan="2">Buff</th>
      <th class="cantrip" colspan="2">Cantrip</th>
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
        <input
          type="range"
          min="0"
          max="8"
          value="0"
          v-on:change="changeBuffed"
        />
      </th>
      <th>&nbsp;</th>
      <th>
        <input
          type="range"
          min="0"
          max="4"
          value="0"
          v-on:change="changeCantrip"
        />
      </th>
      <th>&nbsp;</th>
    </tr>
    <Attribute name="strength" display-name="Strength" />
    <Attribute name="endurance" display-name="Endurance" />
    <Attribute name="coordination" display-name="Coordination" />
    <Attribute name="quickness" display-name="Quickness" />
    <Attribute name="focus" display-name="Focus" />
    <Attribute name="self" display-name="Self" />
  </tbody>
</template>

<script>
import Attribute from "./Attribute.vue";

export default {
  name: "Attributes",
  components: {
    Attribute
  },
  computed: {
    attributePointsSpent() {
      return this.$store.getters.attributePointsSpent;
    }
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
