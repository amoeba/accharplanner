<script>
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Augmentation",
  props: {
    name: {
      type: String,
      required: true,
    }
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  computed: {
    displayName() {
      return AUGMENTATION_NAME[this.name]
    },
    extraInfo() {
      return AUGMENTATION_EXTRA_INFO[this.name]
    },
    invested: {
      get() {
        return this.store.build.character.augmentations[this.name]
          .invested
      },
      set(value) {
        let out = Math.round(Number(value) || 0)

        out = Math.max(
          0,
          Math.min(out, AUGMENTATION_MAX_USES[this.name]),
        )

        this.store.updateAugmentationInvested({
          name: this.name,
          value: out,
        })
      },
    },
    max() {
      return AUGMENTATION_MAX_USES[this.name]
    },
  },
}
</script>

<template>
  <tr>
    <td class="pl-1">
      {{ displayName }}
      <span class="text-gray-500">{{ extraInfo }}</span>
    </td>
    <td class="px-1">
      <input
        v-model="invested"
        type="range"
        min="0"
        :max="max"
      >
    </td>
    <td class="pr-1 text-right">
      <input
        v-model="invested"
        type="text"
        class="w-8 text-right"
      >
    </td>
  </tr>
</template>
