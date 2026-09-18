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
          <Item id="red_colosseum_ring" />
          <Item id="yellow_colosseum_ring" />

          <li class="item-group-header">Trinket &mdash; Minor</li>
          <Item id="trinket_augmented_stamina_i" />
          <Item id="trinket_augmented_damage_i" />
          <Item id="trinket_augmented_damage_reduction_i" />
          <Item id="trinket_augmented_understanding_i" />
          <Item id="trinket_augmented_health_i" />
          <Item id="trinket_augmented_mana_i" />

          <li class="item-group-header">Trinket &mdash; Moderate</li>
          <Item id="trinket_augmented_stamina_ii" />
          <Item id="trinket_augmented_damage_ii" />
          <Item id="trinket_augmented_damage_reduction_ii" />
          <Item id="trinket_augmented_understanding_ii" />
          <Item id="trinket_augmented_health_ii" />
          <Item id="trinket_augmented_mana_ii" />

          <li class="item-group-header">Trinket &mdash; Major</li>
          <Item id="trinket_augmented_stamina_iii" />
          <Item id="trinket_augmented_damage_iii" />
          <Item id="trinket_augmented_damage_reduction_iii" />
          <Item id="trinket_augmented_understanding_iii" />
          <Item id="trinket_augmented_health_iii" />
          <Item id="trinket_augmented_mana_iii" />
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

<style scoped>
.item-group-header {
  font-weight: bold;
  margin-top: 0.5em;
}
</style>
