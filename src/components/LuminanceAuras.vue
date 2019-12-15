<template>
  <div id="luminance" class="pane luminance">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div><h3>Luminance Auras</h3></div>
      </div>
      <div v-if="collapsed" class="table-wrapper">
        <table>
          <thead id="luminance">
            <tr class="table-header">
              <th>Name</th>
              <th colspan="2">Invested</th>
            </tr>
            <tr class="controls">
              <th>&nbsp;</th>
              <th colspan="2">
                <input type="range" min="0" max="1" value="0" v-on:change="changeInvested" />
              </th>
            </tr>
          </thead>
          <tbody>
            <LuminanceAura name="aetheric_vision" />
            <LuminanceAura name="craftsman" />
            <LuminanceAura name="destruction" />
            <LuminanceAura name="glory" />
            <LuminanceAura name="hardening" />
            <LuminanceAura name="invulnerability" />
            <LuminanceAura name="mana_flow" />
            <LuminanceAura name="mana_infusion" />
            <LuminanceAura name="protection" />
            <LuminanceAura name="purity" />
            <LuminanceAura name="retribution" />
            <LuminanceAura name="skill" />
            <LuminanceAura name="specialization" />
            <LuminanceAura name="temperance" />
            <LuminanceAura name="valor" />
            <LuminanceAura name="world" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import LuminanceAura from "./LuminanceAura.vue";

export default {
  name: "LuminanceAuras",
  components: {
    LuminanceAura
  },
  computed: {
    collapsed() {
      return this.$store.getters.aurasPaneVisible;
    }
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllLuminanceAuraInvestment", e.target.value);
    },
    toggle() {
      this.$store.commit("toggleAurasPane");
    }
  }
};
</script>
<style></style>
