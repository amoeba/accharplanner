<template>
  <Pane :toggleExpanded="toggleExpanded" :isExpanded="isExpanded">
    <template #title>Items</template>
    <template #content>
      <ul>
        <Item id="focusing_stone" />
        <Item id="font_of_joji" />
      </ul>
    </template>
  </Pane>
</template>

<script>
import Item from "./Item.vue";
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Items",
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  components: {
    Item,
  },
  computed: {
    isExpanded() {
      return this.store.itemsPaneVisible;
    },
  },
  methods: {
    toggleExpanded() {
      this.store.toggleItemsPane();
    },
  },
};
</script>
