<script>
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "ExtraSkillCredit",
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  computed: {
    checked: {
      get() {
        return this.store.build.character.extraSkillCredits[this.id]
      },

      set(value) {
        this.store.updateExtraSkillCredit({
          name: this.id,
          value,
        })
      },
    },
  },
}
</script>

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
