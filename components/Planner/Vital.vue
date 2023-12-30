<script>
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Vital",
  props: {
    name: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    tabIndex: {
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
          out,
        })
      },
    },
  },
}
</script>

<template>
  <tr>
    <td class="bg-zinc-100 pl-1 dark:bg-stone-600">
      <img
        style="clip-path: circle(50%)"
        :src="`/icons/${name}.png`"
        :alt="displayName"
        width="20"
        height="20"
      >
    </td>
    <td class="border-r bg-zinc-100 pl-1 pr-2 dark:bg-stone-600">
      {{ displayName }}
      <span class="text-gray-500">{{ formula }}</span>
    </td>
    <td>&nbsp;</td>
    <td class="pr-2 text-right">
      {{ creation }}
    </td>
    <td class="border-l px-2 text-right">
      {{ base }}
    </td>
    <td
      class="px-2 text-right"
      :class="isBuffed ? 'text-green-600 font-bold' : ''"
    >
      {{ buffed }}
    </td>
    <td class="border-l pl-2 pr-1">
      <input
        v-model="invested"
        class="text-right"
        type="range"
        min="0"
        :max="maxVitalInvested"
      >
    </td>
    <td class="border-r">
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
