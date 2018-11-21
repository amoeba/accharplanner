<template>
  <div>
    <h3>Attributes</h3>
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
  }
};
</script>
