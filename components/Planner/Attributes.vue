<script>
import Attribute from "./Attribute.vue"
import { usePlannerStore } from "~/stores/planner"

export default {
  name: "Attributes",
  components: {
    Attribute,
  },
  setup() {
    const store = usePlannerStore()

    return {
      store,
    }
  },
  data() {
    return {
      maxAttributeInvested: MAX_ATTRIBUTE_INVESTED,
    }
  },
  methods: {
    changeInvested(e) {
      this.store.changeAllAttributeInvestment(e.target.value)
    },
    changeBuffed(e) {
      this.store.changeAllAttributeBuffs(e.target.value)
    },
    changeCantrip(e) {
      this.store.changeAllAttributeCantrips(e.target.value)
    },
  },
}
</script>

<template>
  <tbody id="attributes">
    <tr>
      <th
        class="border-r bg-zinc-100 dark:bg-stone-600"
        colspan="2"
      >
        &nbsp;
      </th>
      <th
        colspan="2"
        class="border-r"
      >
        Creation
      </th>
      <th class="pl-2 text-right">
        Base
      </th>
      <th class="border-r p-2 text-right">
        Buffed
      </th>
      <th
        class="border-r"
        colspan="2"
      >
        Invested
      </th>
      <th>Buff</th>
      <th>Cantrip</th>
    </tr>
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
          :max="maxAttributeInvested"
          value="0"
          @change="changeInvested"
        >
      </th>
      <th class="pl-2">
        <select @change="changeBuffed">
          <option value="0" />
          <option value="1">
            I
          </option>
          <option value="2">
            II
          </option>
          <option value="3">
            III
          </option>
          <option value="4">
            IV
          </option>
          <option value="5">
            V
          </option>
          <option value="6">
            VI
          </option>
          <option value="7">
            VII
          </option>
          <option value="8">
            VIII
          </option>
          <option value="9">
            Beer
          </option>
        </select>
      </th>
      <th class="pr-1">
        <select @change="changeCantrip">
          <option value="0" />
          <option value="1">
            Minor
          </option>
          <option value="2">
            Major
          </option>
          <option value="3">
            Epic
          </option>
          <option value="4">
            Legen.
          </option>
        </select>
      </th>
    </tr>
    <Attribute
      name="strength"
      tab-index="100"
    />
    <Attribute
      name="endurance"
      tab-index="101"
    />
    <Attribute
      name="coordination"
      tab-index="102"
    />
    <Attribute
      name="quickness"
      tab-index="103"
    />
    <Attribute
      name="focus"
      tab-index="104"
    />
    <Attribute
      name="self"
      tab-index="105"
    />
  </tbody>
</template>
