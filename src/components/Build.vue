<template>
  <div class="build">
    <h3>{{ description }}</h3>
    <div class="savedat"><strong>Saved at:</strong> {{ buildKey }}</div>
    <div class="buttons">
      <button v-on:click="load">Load</button>
      <button v-on:click="exportBuild">Export</button>
      <button v-on:click="remove">Delete</button>
    </div>
  </div>
</template>

<script>
import { exportCharacter } from "../helpers";

export default {
  name: "Build",
  props: {
    buildKey: String,
    buildData: String
  },
  computed: {
    description() {
      const data = JSON.parse(this._props.buildData);
      return data.character.name + " (Level " + data.character.level + ")";
    },
    data() {
      return JSON.stringify(this._props.buildData, null, 2);
    }
  },
  methods: {
    load() {
      console.log(this._props.buildData)
      this.$store.dispatch("import", JSON.parse(this._props.buildData));
    },
    exportBuild() {
      const data = JSON.parse(this._props.buildData);
      exportCharacter(data, data.character.name);
    },
    remove() {
      this.$store.commit("deleteBuild", this._props.buildKey);
    }
  }
};
</script>

<style>
.build {
  padding: 0.5rem 0;
  border-bottom: 1px solid #CCC;
}

.build:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.build h3 {
  margin: 0 0 0.5rem 0;
}

.build .savedat {
  margin-bottom: 0.25rem;
}

</style>
