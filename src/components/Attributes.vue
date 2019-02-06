<template>
  <div id="attributes">
    <h3>Attributes</h3>
    <p>Creation Attribute Points Spent {{ attributePointsSpent }} / 330</p>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th colspan="2">Creation</th>
          <th colspan="2">Invested</th>
          <th>Base</th>
          <th>Buffed</th>
          <th colspan="2">Buff</th>
          <th colspan="2">Cantrip</th>
        </tr>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th><input type="range" min="0" max="190" v-on:change="changeInvested" /></th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th><input type="range" min="0" max="8" value="0" v-on:change="changeBuffed" /></th>
          <th>&nbsp;</th>
          <th><input type="range" min="0" max="4" value="0" v-on:change="changeCantrip" /></th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <Attribute name="strength" />
        <Attribute name="endurance" />
        <Attribute name="coordination" />
        <Attribute name="quickness" />
        <Attribute name="focus" />
        <Attribute name="self" />
      </tbody>
    </table>
  </div>
</template>

<script>
import Attribute from "./Attribute.vue";

export default {
  name: "Attributes",
  components: {
    Attribute
  },
  computed: {
    attributePointsSpent () {
      return this.$store.getters.attributePointsSpent;
    }
  },
  methods: {
    changeInvested (e) {
      this.$store.commit("changeAllAttributeInvestment", e.target.value);
    },
    changeBuffed (e) {
      this.$store.commit("changeAllAttributeBuffs", e.target.value);
    },
    changeCantrip (e) {
      this.$store.commit("changeAllAttributeCantrips", e.target.value);
    }
  }
};
</script>
<style>
#attributes {
  border: 1px solid red;
}
</style>
