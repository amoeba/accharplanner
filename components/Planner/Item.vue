<template>
  <li class="flex gap-2">
    <input
      :id="id"
      v-model="checked"
      :name="id"
      type="checkbox"
    >
    <label :for="id">{{ displayName }}</label>
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
