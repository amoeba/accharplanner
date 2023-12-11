<script>
import Augmentation from "./Augmentation.vue"
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Augmentations",
  components: {
    Augmentation,
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  data() {
    return {
      filterQuery: "",
    }
  },
  computed: {
    isExpanded() {
      return this.store.augmentationsPaneVisible
    },
    errors() {
      return this.store.augmentationErrors
    },
    augmentations() {
      return filterText(this.filterQuery, Object.keys(AUGMENTATION_NAME))
    },
    filterPresent() {
      return this.filterQuery !== ""
    },
  },
  methods: {
    changeInvested(e) {
      this.store.changeAllAugmentationInvestment(Number(e.target.value))
    },
    toggleExpanded() {
      this.store.toggleAugmentationsPane()
    },
    clearFilter() {
      this.filterQuery = ""
    },
  },
}
</script>

<template>
  <CollapsiblePane :toggle-expanded="toggleExpanded" :is-expanded="isExpanded">
    <template #title>
      Experience Augmentations
    </template>
    <template #right>
      <span v-if="errors" class="text-red-500">{{ errors }}</span>
    </template>
    <template #content>
      <table class="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th colspan="2">
              Invested
            </th>
          </tr>
          <tr>
            <th>
              <div class="flex">
                <input v-model="filterQuery" class="py-1 font-normal" type="text" placeholder="Type to filter...">
                <button v-if="filterPresent" class="px-2 py-1 hover:bg-zinc-200 rounded" @click="clearFilter">
                  Reset
                </button>
              </div>
            </th>
            <th>
              <input type="range" min="0" max="1" value="0" @change="changeInvested">
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <Augmentation v-for="augmentation in augmentations" :key="augmentation" :name="augmentation" />
        </tbody>
      </table>
    </template>
  </CollapsiblePane>
</template>
