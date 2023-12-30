<script>
import ArmorSet from "./ArmorSet"
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "ArmorSets",
  components: {
    ArmorSet,
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  computed: {
    isExpanded() {
      return this.store.armorSetsPaneVisible
    },
    errors() {
      return this.store.armorSetNumEquippedErrors
    },
  },
  methods: {
    toggleExpanded() {
      this.store.toggleArmorSetsPane()
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
      Armor Sets
    </template>
    <template #right>
      <span
        v-if="errors"
        class="text-rose-500"
      >{{ errors }}</span>
    </template>
    <template #content>
      <table class="w-full">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th colspan="2">
              Equipped
            </th>
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
    </template>
  </CollapsiblePane>
</template>
