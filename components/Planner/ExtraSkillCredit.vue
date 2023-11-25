<template>
  <label class="flex gap-2">
    <input
      :id="name"
      v-model="checked"
      :name="name"
      type="checkbox"
    >
    {{ name }}
  </label>
</template>

<script>
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "ExtraSkillCredit",
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
    checked: {
      get() {
        return this.store.build.character.extraSkillCredits[this.id];
      },

      set(value) {
        this.store.updateExtraSkillCredit({
          name: this.id,
          value: value,
        });
      },
    },
  },
};
</script>
