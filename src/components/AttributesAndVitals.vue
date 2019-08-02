<template>
  <div id="attributes_and_vitals" class="pane">
    <table>
      <Attributes />
      <Vitals />
    </table>
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

  },
  methods: {
  }
};
</script>
<style></style>
