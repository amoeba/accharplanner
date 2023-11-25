<template>
  <div>
    <h3>{{ description }}</h3>
    <div>
      <strong>Saved at:</strong>
      {{ buildKey }}
    </div>
    <div>
      <ButtonView @click="load"> Load </ButtonView>
      <ButtonView @click="exportBuild"> Export </ButtonView>
      <ButtonView @click="remove"> Delete </ButtonView>
    </div>
  </div>
</template>

<script>
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Build",
  props: {
    buildKey: String,
    buildData: String,
  },
  setup() {
    const store = usePlannerStore();

    return {
      store,
    };
  },
  computed: {
    description() {
      const data = JSON.parse(this.buildData);
      return data.character.name + " (Level " + data.character.level + ")";
    },
    data() {
      return JSON.stringify(this.buildData, null, 2);
    },
  },
  methods: {
    load() {
      this.store.import(JSON.parse(this.buildData));
    },
    exportBuild() {
      const data = JSON.parse(this.buildData);
      exportCharacter(data, data.character.name);
    },
    remove() {
      this.store.deleteBuild(this.buildKey);
    },
  },
};
</script>
