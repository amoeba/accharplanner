<template>
  <div id="armorsets" class="pane items">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div>
          <h3>Armor Sets</h3>
        </div>
        <div class="right">
          <span v-if="errors" class="error">{{ errors }}</span>
        </div>
      </div>
      <div v-if="collapsed" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th colspan="2">Equipped</th>
            </tr>
          </thead>
          <tbody>
            <ArmorSet id="adepts" />
            <ArmorSet id="archers" />
            <ArmorSet id="crafters" />
            <ArmorSet id="dedication" />
            <ArmorSet id="defenders" />
            <ArmorSet id="dextrous" />
            <ArmorSet id="hearty" />
            <ArmorSet id="soldiers" />
            <ArmorSet id="swift" />
            <ArmorSet id="tinkers" />
            <ArmorSet id="wise" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ArmorSet from "./ArmorSet.vue";

export default {
  name: "ArmorSets",
  components: {
    ArmorSet,
  },
  computed: {
    collapsed() {
      return this.$store.getters.armorSetsPaneVisible;
    },
    errors() {
      return this.$store.getters.armorSetNumEquippedErrors;
    },
  },
  methods: {
    toggle() {
      this.$store.commit("toggleArmorSetsPane");
    },
  },
};
</script>
<style></style>
