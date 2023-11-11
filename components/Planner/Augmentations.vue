<template>
  <Pane :toggleExpanded="toggleExpanded" :isExpanded="isExpanded">
    <template #title>Experience Augmentations</template>
    <template #right> <span v-if="errors" class="text-red-500">{{ errors }}</span>
    </template>
    <template #content>
      <table>
        <thead>
          <tr class="table-header">
            <th>Name</th>
            <th colspan="2">Invested</th>
          </tr>
          <tr class="controls">
            <th>
              <div class="flex">
                <input class="py-1 font-normal" type="text" v-model="filterQuery" placeholder="Type to filter..." />
                <button class="px-2 py-1 hover:bg-zinc-200 rounded" v-if="filterPresent"
                  @click="clearFilter">Reset</button>
              </div>
            </th>
            <th>
              <input type="range" min="0" max="1" value="0" v-on:change="changeInvested" />
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <Augmentation v-for="(augmentation) in augmentations" :key="augmentation" :name="augmentation" />
        </tbody>
      </table>
    </template>
  </Pane>
</template>

<script>
import Augmentation from "./Augmentation.vue";
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Augmentations",
  components: {
    Augmentation,
  },
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  data() {
    return {
      filterQuery: "",
    }
  },
  computed: {
    isExpanded() {
      return this.store.augmentationsPaneVisible;
    },
    errors() {
      return this.store.augmentationErrors;
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
      this.store.changeAllAugmentationInvestment(e.target.value);
    },
    toggleExpanded() {
      this.store.toggleAugmentationsPane();
    },
    clearFilter() {
      this.filterQuery = "";
    }
  },
};
</script>
