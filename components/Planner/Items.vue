<template>
  <Pane
    :toggle-expanded="toggleExpanded"
    :is-expanded="isExpanded"
  >
    <template #title>
      Items
    </template>
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
  components: {
    Item,
  },
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
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
