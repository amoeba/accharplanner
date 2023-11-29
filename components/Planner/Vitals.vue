<script>
import Vital from "./Vital.vue"

export default {
  name: "Vitals",
  components: {
    Vital,
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
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>&nbsp;</th>
      <th>
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
