<template>
  <div id="attributes_and_vitals" class="pane">
    <div class="pane-header">
      <div><h3>Attributes</h3></div>
      <div class="right">
        <abbr title="Character creation attribute points spent">{{ attributePointsSpent }} / 330</abbr>
      </div>
    </div>
    <div class="table-wrapper">
      <table>
        <Attributes />
        <Vitals />
      </table>
    </div>
  </div>
</template>

<script>
import Attributes from "./Attributes.vue";
import Vitals from "./Vitals.vue";

export default {
  name: "AttributesAndVitals",
  components: {
    Attributes,
    Vitals
  },
  computed: {
    attributePointsSpent() {
      return this.$store.getters.attributePointsSpent;
    }
  },
  methods: {
  }
};
</script>
<style></style>
