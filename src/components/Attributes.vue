<template>
  <div>
    <h3>Attributes</h3>
    <span>Invested <input type="range" min="0" max="190" v-on:change="changeInvested" /></span>
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
  methods: {
    changeInvested (e) {
      this.$store.commit("changeAllAttributeInvestment", e.target.value);
    }
  }
};
</script>
