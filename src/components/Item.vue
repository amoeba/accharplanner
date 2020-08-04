<template>
  <li>
    <input v-bind:id="id" v-bind:name="id" type="checkbox" v-model="checked" />
    <label v-bind:for="id">{{ displayName }}</label>
  </li>
</template>

<script>
import { ITEM_NAME } from "../mappings";

export default {
  name: "Item",
  props: {
    id: String,
    name: String
  },
  computed: {
    displayName() {
      return ITEM_NAME[this._props.id];
    },
    checked: {
      get() {
        return this.$store.state.build.character.items[this._props.id];
      },

      set(value) {
        this.$store.commit("updateItem", {
          id: this._props.id,
          value: value
        });
      }
    }
  }
};
</script>
<style></style>
