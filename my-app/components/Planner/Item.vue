<template>
  <li>
    <input v-bind:id="id" v-bind:name="id" type="checkbox" v-model="checked" />
    <label v-bind:for="id">{{ displayName }}</label>
  </li>
</template>

<script>


export default {
  name: "Item",
  props: {
    id: String,
    name: String,
  },
  computed: {
    displayName() {
      return ITEM_NAME[this.id];
    },
    checked: {
      get() {
        return this.$store.state.build.character.items[this.id];
      },

      set(value) {
        this.$store.commit("updateItem", {
          id: this.id,
          value: value,
        });
      },
    },
  },
};
</script>
