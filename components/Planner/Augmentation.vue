<script>
import { usePlannerStore } from '~/stores/planner'

export default {
  name: 'Augmentation',
  props: {
    name: String,
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
    <td>
      {{ displayName }}
      <span class="text-gray-500">{{ extraInfo }}</span>
    </td>
    <td>
      <input
        v-model="invested"
        type="range"
        min="0"
        :max="max"
      >
    </td>
    <td>
      <input
        v-model="invested"
        type="text"
        class="w-8"
      >
    </td>
  </tr>
</template>
