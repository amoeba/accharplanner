<template>
  <div id="augmentations" class="pane items">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div>
          <h3>Items</h3>
        </div>
      </div>
      <div v-if="collapsed" class="table-wrapper">
        <ul>
          <Item id="focusing_stone" />
          <Item id="font_of_joji" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";

export default {
  name: "Items",
  components: {
    Item,
  },
  computed: {
    collapsed() {
      return this.$store.getters.itemsPaneVisible;
    },
  },
  methods: {
    toggle() {
      this.$store.commit("toggleItemsPane");
    },
  },
};
</script>
