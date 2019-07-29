<template>
  <table>
    <tbody id="luminance">
      <tr>
        <th colspan="2">Luminance Auras</th>
      </tr>
      <tr class="pane-header">
        <th>Name</th>
        <th colspan="2">Invested</th>
      </tr>
      <tr class="controls">
        <th>&nbsp;</th>
        <th colspan="2">
          <input type="range" min="0" max="1" v-on:change="changeInvested" />
        </th>
      </tr>
      <LuminanceAura name="aetheric_vision" />
      <LuminanceAura name="craftsman" />
      <LuminanceAura name="glory" />
      <LuminanceAura name="mana_flow" />
      <LuminanceAura name="manu_infusion" />
      <LuminanceAura name="protection" />
      <LuminanceAura name="purity" />
      <LuminanceAura name="skill" />
      <LuminanceAura name="temperance" />
      <LuminanceAura name="valor" />
      <LuminanceAura name="world" />
      <LuminanceAura name="specialization" />
      <LuminanceAura name="invulnerability" />
      <LuminanceAura name="destruction" />
      <LuminanceAura name="retribution" />
      <LuminanceAura name="hardening" />
    </tbody>
  </table>
</template>

<script>
import LuminanceAura from "./LuminanceAura.vue";

export default {
  name: "LuminanceAuras",
  components: {
    LuminanceAura
  },
  computed: {
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllLuminanceAuraInvestment", e.target.value);
    }
  }
};
</script>
<style></style>
