<template>
  <li>
    <input v-bind:id="id" v-bind:name="id" type="checkbox" v-model="checked" />
    <label v-bind:for="id">{{ displayName }}</label>
  </li>
</template>

<script>

import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Item",
  props: {
    id: String,
    name: String,
  },
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  computed: {
    displayName() {
      return ITEM_NAME[this.id];
    },
    checked: {
      get() {
        return this.store.build.character.items[this.id];
      },

      set(value) {
        this.store.updateItem({
          id: this.id,
          value: value,
        });
      },
    },
  },
};
</script>
