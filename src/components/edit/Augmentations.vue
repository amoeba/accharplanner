<template>
  <div id="augmentations" class="pane augmentations">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div>
          <h3>Experience Augmentations</h3>
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
            <Augmentation
              v-for="(augmentation) in augmentations"
              :key="augmentation"
              :name="augmentation"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Augmentation from "./Augmentation.vue";
import { filterText } from "../../helpers";
import { AUGMENTATION_NAME } from "../../mappings";

export default {
  name: "Augmentations",
  components: {
    Augmentation,
  },
  data() {
    return {
      filterQuery: "",
    }
  },
  computed: {
    collapsed() {
      return this.$store.getters.augmentationsPaneVisible;
    },
    errors() {
      return this.$store.getters.augmentationErrors;
    },
    augmentations() {
      return filterText(this.filterQuery, Object.keys(AUGMENTATION_NAME));
    },
    filterPresent() {
      return this.filterQuery !== "";
    },
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllAugmentationInvestment", e.target.value);
    },
    toggle() {
      this.$store.commit("toggleAugmentationsPane");
    },
    clearFilter() {
      this.filterQuery = "";
    }
  },
};
</script>
