<script>
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "LuminanceAura",
  props: {
    name: {
      type:String,
      required: true
    },
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  computed: {
    displayName() {
      return LUMINANCE_AURA_NAME[this.name]
    },
    hoverInfo() {
      return LUMINANCE_AURA_HOVER_INFO[this.name]
    },
    extraInfo() {
      return LUMINANCE_AURA_EXTRA_INFO[this.name]
    },
    invested: {
      get() {
        return this.store.build.character.luminance_auras[this.name]
          .invested
      },
      set(value) {
        this.store.updateLuminanceAuraInvested({
          name: this.name,
          value,
        })
      },
    },
    max() {
      return LUMINANCE_AURA_MAX_USES[this.name]
    },
  },
  methods: {
    updateInvested(e) {
      let value = Math.round(Number(e.target.value))

      if (Number.isNaN(value)) {
        value = 0
      }

      if (value > LUMINANCE_AURA_MAX_USES[this.name]) {
        value = LUMINANCE_AURA_MAX_USES[this.name]
      }
 else if (value < 0) {
        value = 0
      }

      this.store.updateLuminanceAuraInvested({
        name: this.name,
        value,
      })
    },
  },
}
</script>

<template>
  <tr>
    <td class="pl-1">
      <abbr
        v-if="hoverInfo"
        :title="hoverInfo"
      >
        {{ displayName }}
      </abbr>
      <span v-else>
        {{ displayName }}
      </span>
      <span
        style="margin-left: 0.5em"
        class="text-gray-500"
      >{{ extraInfo }}</span>
    </td>
    <td>
      <input
        v-model="invested"
        type="range"
        min="0"
        :max="max"
        @change="updateInvested"
      >
    </td>
    <td>
      <input
        v-model="invested"
        type="text"
        class="w-8"
        @change="updateInvested"
      >
    </td>
  </tr>
</template>
