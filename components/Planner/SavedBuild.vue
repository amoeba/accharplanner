<template>
  <div class="saved-build">
    <h3>{{ description }}</h3>
    <div class="savedat">
      <strong>Saved at:</strong>
      {{ buildKey }}
    </div>
    <div class="buttons">
      <button v-on:click="load">Load</button>
      <button v-on:click="exportBuild">Export</button>
      <button v-on:click="remove">Delete</button>
    </div>
  </div>
</template>

<script>
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Build",
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  props: {
    buildKey: String,
    buildData: String,
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
