<script>
import LuminanceAura from "./LuminanceAura.vue"
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "LuminanceAuras",
  components: {
    LuminanceAura,
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
      return this.store.aurasPaneVisible
    },
    errors() {
      return this.store.auraErrors
    },
    auras() {
      return filterText(this.filterQuery, Object.keys(LUMINANCE_AURA_NAME))
    },
    filterPresent() {
      return this.filterQuery !== ""
    },
  },
  methods: {
    changeInvested(e) {
      this.store.changeAllLuminanceAuraInvestment(Number(e.target.value))
    },
    toggleExpanded() {
      this.store.toggleAurasPane()
    },
    clearFilter() {
      this.filterQuery = ""
    },
  },
}
</script>

<template>
  <CollapsiblePane
    :toggle-expanded="toggleExpanded"
    :is-expanded="isExpanded"
    :is-collapsible="true"
  >
    <template #title>
      Luminance Auras
    </template>
    <template #right>
      <span
        v-if="errors"
        class="text-red-500"
      >{{ errors }}</span>
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
                <input
                  v-model="filterQuery"
                  class="font-normal"
                  type="text"
                  placeholder="Type to filter..."
                >
                <ButtonView
                  v-if="filterPresent"
                  class="rounded px-2 py-1 hover:bg-zinc-200"
                  @click="clearFilter"
                >
                  Reset
                </ButtonView>
              </div>
            </th>
            <th>
              <input
                type="range"
                min="0"
                max="1"
                value="0"
                @change="changeInvested"
              >
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <LuminanceAura
            v-for="aura in auras"
            :key="aura"
            :name="aura"
          />
        </tbody>
      </table>
    </template>
  </CollapsiblePane>
</template>
