<template>
  <div id="luminance" class="pane luminance">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div>
          <h3>Luminance Auras</h3>
        </div>
        <div class="right">
          <span v-if="errors" class="error">{{ errors }}</span>
        </div>
      </div>
      <div v-if="collapsed" class="table-wrapper">
        <table>
          <thead>
            <tr class="table-header">
              <th>Name</th>
              <th colspan="2">Invested</th>
            </tr>
            <tr class="controls">
              <th>
                <input v-model="filterQuery" class="w60" placeholder="Filter"/>
                <button v-if="filterPresent" @click="clearFilter">x</button>
              </th>
              <th>
                <input
                  type="range"
                  min="0"
                  max="1"
                  value="0"
                  v-on:change="changeInvested"
                />
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <LuminanceAura
              v-for="(aura) in auras"
              :key="aura"
              :name="aura"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import LuminanceAura from "./LuminanceAura.vue";
import { filterText } from "../helpers";
import { LUMINANCE_AURA_NAME } from "../mappings";

export default {
  name: "LuminanceAuras",
  components: {
    LuminanceAura,
  },
  data() {
    return {
      filterQuery: "",
    }
  },
  computed: {
    collapsed() {
      return this.$store.getters.aurasPaneVisible;
    },
    errors() {
      return this.$store.getters.auraErrors;
    },
    auras() {
      return filterText(this.filterQuery, Object.keys(LUMINANCE_AURA_NAME));
    },
    filterPresent() {
      return this.filterQuery !== "";
    },
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllLuminanceAuraInvestment", e.target.value);
    },
    toggle() {
      this.$store.commit("toggleAurasPane");
    },
    clearFilter() {
      this.filterQuery = "";
    },
  },
};
</script>
