<template>
  <Pane>
    <template #title>Attributes</template>
    <template #right>
      <div>
        <span v-if="errors" class="error">{{ errors }}</span>
      </div>
      <div>
        <span v-tooltip="'Character creation attribute points spent. Increased from the base of 330 by the +5 attribute points experience augmentations to a maximum of 380.'
          ">{{ attributePointsSpent }} / {{ attributePointsAvailable }}</span>
      </div>
    </template>
    <template #content>
      <table>
        <Attributes />
        <Vitals />
      </table>
    </template>
  </Pane>
</template>

<script>
import Attributes from "./Attributes"
import Vitals from "./Vitals"

import { usePlannerStore } from "~/stores/planner";

export default {
  name: "AttributesAndVitals",
  components: {
    Attributes,
    Vitals,
  },
  setup() {
    const store = usePlannerStore();

    return { store };
  },
  computed: {
    attributePointsSpent() {
      return this.store.attributePointsSpent;
    },
    attributePointsAvailable() {
      return this.store.attributePointsAvailable;
    },
    collapsed() {
      return this.store.attributesPaneVisible;
    },
    errors() {
      return this.store.attributesAndVitalsErrors;
    },
  },
  methods: {
    toggle() {
      this.store.toggleAttributesPane();
    },
  },
};
</script>
