<script>
import Vital from "./Vital.vue"
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Vitals",
  components: {
    Vital,
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
  methods: {
    changeInvested(e) {
      this.store.changeAllVitalInvestment(e.target.value)
    },
  },
}
</script>

<template>
  <tbody>
    <tr>
      <th
        class="border-r bg-zinc-100 dark:bg-stone-600"
        colspan="2"
      >
&nbsp;
      </th>
      <th>&nbsp;</th>
      <th class="border-r">
&nbsp;
      </th>
      <th>&nbsp;</th>
      <th class="border-r">
&nbsp;
      </th>
      <th
        class="border-r px-2"
        colspan="2"
      >
        <input
          type="range"
          min="0"
          :max="maxVitalInvested"
          value="0"
          @change="changeInvested"
        >
      </th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
    </tr>
    <Vital
      name="health"
      display-name="Health"
      tab-index="106"
    />
    <Vital
      name="stamina"
      display-name="Stamina"
      tab-index="107"
    />
    <Vital
      name="mana"
      display-name="Mana"
      tab-index="107"
    />
  </tbody>
</template>
