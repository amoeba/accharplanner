<template>
  <tr>
    <td>
      <img style="clip-path: circle(50%)" :src="'/img/' + name + '.png'" :alt="displayName" width="20" height="20" />
    </td>
    <td>
      {{ displayName }}
      <span class="text-gray-500">{{ formula }}</span>
    </td>
    <td>&nbsp;</td>
    <td>{{ creation }}</td>
    <td>{{ base }}</td>
    <td v-bind:class="isBuffed ? 'text-green-600' : ''">
      {{ buffed }}
    </td>
    <td>
      <input type="range" min="0" :max="maxVitalInvested" v-model="invested" />
    </td>
    <td>
      <input class="w-10" type="text" v-bind:value="invested" v-on:change="updateInvested" v-bind:tabindex="tabIndex" />
    </td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</template>

<script>
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Vital",
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  props: {
    name: String,
    displayName: String,
    tabIndex: String,
  },
  computed: {
    formula() {
      return VITAL_FORMULA[this.name];
    },
    isBuffed() {
      return (
        Math.round(this.store[this.name + "Buffed"]) >
        Math.round(this.store[this.name + "Base"])
      );
    },
    creation() {
      return this.store[this.name + "Creation"];
    },
    base() {
      return Math.round(this.store[this.name + "Base"]);
    },
    buffed() {
      return Math.round(this.store[this.name + "Buffed"]);
    },
    invested: {
      get() {
        return this.store.build.character.vitals[this.name].invested;
      },
      set(value) {
        this.store.updateVitalInvested({
          name: this.name,
          value: value,
        });
      },
    },
  },
  data() {
    return {
      maxVitalInvested: MAX_VITAL_INVESTED
    }
  },
  methods: {
    updateInvested(e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 0;
      }

      if (this.store.settings.infiniteMode) {
        // Do nothing
      } else if (value > MAX_VITAL_INVESTED) {
        value = MAX_VITAL_INVESTED;
      } else if (value < 0) {
        value = 0;
      }

      this.store.updateVitalInvested({
        name: this.name,
        value: value,
      });

      e.target.value = value;
    },
  },
};
</script>
