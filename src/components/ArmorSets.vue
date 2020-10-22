<template>
  <div id="armorsets" class="pane items">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div>
          <h3>Armor Sets</h3>
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
            <ArmorSet id="dedication" />
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
    ArmorSet
  },
  computed: {
    collapsed() {
      return this.$store.getters.armorSetsPaneVisible;
    }
  },
  methods: {
    toggle() {
      this.$store.commit("toggleArmorSetsPane");
    }
  }
};
</script>
<style></style>
