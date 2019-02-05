<template>
  <div>
    <h3>Attributes</h3>
    <ul>
      <li>Invested <input type="range" min="0" max="190" v-on:change="changeInvested" /></li>
      <li>Buffed <input type="range" min="0" max="8" value="0" v-on:change="changeBuffed" /></li>
      <li>Attribute Points Spent {{ attributePointsSpent }} / 330</li>
    </ul>

    <ul>
      <Attribute name="strength" />
      <Attribute name="endurance" />
      <Attribute name="coordination" />
      <Attribute name="quickness" />
      <Attribute name="focus" />
      <Attribute name="self" />
    </ul>
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
    }
  }
};
</script>
