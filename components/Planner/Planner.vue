<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-end gap-x-1">
      <Button v-on:click="saveBuild">
        Save
      </Button>
      <Button v-on:click="exportCharacter">
        Export
      </Button>
      <Button v-on:click="resetPlanner">
        Reset
      </Button>
      <ButtonWithPopout widthClass="w-96">
        <template #title>🌍 Share</template>
        <template #content>
          <PlannerPopoutsPlannerShare />
        </template>
      </ButtonWithPopout>
      <ButtonWithPopout>
        <template #title>🛠️ Settings</template>
        <template #content>
          <PlannerPopoutsPlannerSettings />
        </template>
      </ButtonWithPopout>
    </div>
    <Headers />
    <Stages />
    <AttributesAndVitals />
    <Skills />
    <Augmentations />
    <LuminanceAuras />
    <Items />
    <ArmorSets />
  </div>
</template>

<script>
import Stages from "./Stages.vue";
import Headers from "./Headers.vue";
import AttributesAndVitals from "./AttributesAndVitals.vue";
import Skills from "./Skills.vue";
import Augmentations from "./Augmentations.vue";
import LuminanceAuras from "./LuminanceAuras.vue";
import Items from "./Items.vue";
import ArmorSets from "./ArmorSets.vue";

import { usePlannerStore } from "~/stores/planner";

export default {
  name: "planner",
  components: {
    Stages,
    Headers,
    AttributesAndVitals,
    Skills,
    Augmentations,
    LuminanceAuras,
    Items,
    ArmorSets,
  },
  setup() {
    const store = usePlannerStore();

    return { store };
  },
  methods: {
    saveBuild() {
      this.store.addNotification({
        type: "success",
        message: "Build saved. See the Saved tab.",
      });
      this.store.saveBuild();
    },
    exportCharacter() {
      exportCharacter(
        this.store.build,
        this.store.build.character.name
      );
    },
    resetPlanner() {
      this.store.reset();
    },
  },
};
</script>
