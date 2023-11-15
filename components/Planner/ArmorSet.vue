<template>
  <tr>
    <td>
      {{ displayName }}
      <span class="text-gray-500">{{ extraInfo }}</span>
    </td>
    <td>
      <input v-bind:id="id" v-bind:name="id" type="range" min="0" max="9" v-model="equipped" />
    </td>
    <td>
      <input v-model="equipped" type="text" class="w-8" />
    </td>
  </tr>
</template>

<script>
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "ArmorSet",
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
      return ARMOR_SET_NAME[this.id];
    },
    extraInfo() {
      return ARMOR_SET_NAME_EXTRA_INFO[this.id];
    },
    equipped: {
      get() {
        return this.store.build.character.armor_sets[this.id].equipped;
      },

      set(value) {
        this.store.updateArmorSet({
          id: this.id,
          value: Number(value),
        });
      },
    },
  },
};
</script>
