<template>
  <Pane>
    <template #title>Armor Sets</template>
    <template #right> <span v-if="errors" class="text-rose-500">{{ errors }}</span>
    </template>
    <template #content>
      <table class="width-full">
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
    </template>
  </Pane>
</template>

<script>
import ArmorSet from "./ArmorSet";
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "ArmorSets",
  components: {
    ArmorSet,
  },
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  computed: {
    collapsed() {
      return this.store.armorSetsPaneVisible;
    },
    errors() {
      return this.store.armorSetNumEquippedErrors;
    },
  },
  methods: {
    toggle() {
      this.store.toggleArmorSetsPane;
    },
  },
};
</script>
<style></style>
