<script>
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Vital",
  props: {
    name: String,
    displayName: String,
    tabIndex: String,
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  data() {
    return {
      maxVitalInvested: MAX_VITAL_INVESTED,
    }
  },
  computed: {
    formula() {
      return VITAL_FORMULA[this.name]
    },
    isBuffed() {
      return (
        Math.round(this.store[`${this.name}Buffed`])
        > Math.round(this.store[`${this.name}Base`])
      )
    },
    creation() {
      return this.store[`${this.name}Creation`]
    },
    base() {
      return Math.round(this.store[`${this.name}Base`])
    },
    buffed() {
      return Math.round(this.store[`${this.name}Buffed`])
    },
    invested: {
      get() {
        return this.store.build.character.vitals[this.name].invested
      },
      set(value) {
        let out = Math.round(Number(value) || 0)

        out = Math.max(
          MIN_VITAL_INVESTED,
          Math.min(out, MAX_VITAL_INVESTED),
        )

        this.store.updateVitalInvested({
          name: this.name,
          value,
        })
      },
    },
  },
}
</script>

<template>
  <tr>
    <td>
      <img
        style="clip-path: circle(50%)"
        :src="`/icons/${name}.png`"
        :alt="displayName"
        width="20"
        height="20"
      >
    </td>
    <td>
      {{ displayName }}
      <span class="text-gray-500">{{ formula }}</span>
    </td>
    <td>&nbsp;</td>
    <td>{{ creation }}</td>
    <td>{{ base }}</td>
    <td :class="isBuffed ? 'text-green-600' : ''">
      {{ buffed }}
    </td>
    <td>
      <input
        v-model="invested"
        type="range"
        min="0"
        :max="maxVitalInvested"
      >
    </td>
    <td>
      <input
        class="w-10"
        type="text"
        model="invested"
        :tabindex="tabIndex"
      >
    </td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</template>
