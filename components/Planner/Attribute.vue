<template>
  <tr>
    <td>
      <img
        style="clip-path: circle(50%)"
        :src="'/img/' + name + '.png'"
        :alt="displayName"
        width="20"
        height="20"
      >
    </td>
    <td>{{ displayName }}</td>
    <td>
      <input
        v-model="creation"
        type="range"
        min="10"
        max="100"
      >
    </td>
    <td>
      <input
        v-model="creation"
        class="w-10"
        type="text"
        :tabindex="tabIndex"
      >
    </td>
    <td>{{ base }}</td>
    <td :class="isBuffed ? 'text-green-600' : ''">
      {{ buffed }}
    </td>
    <td>
      <input
        v-model="invested"
        type="range"
        min="0"
        :max="maxAttributeInvested"
      >
    </td>
    <td>
      <input
        v-model="invested"
        class="w-10"
        type="text"
        :tabindex="tabIndex"
      >
    </td>
    <td>
      <select v-model="buffLevel">
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
    </td>
    <td>
      <select v-model="cantrip">
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
    </td>
  </tr>
</template>

<script>
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "Attribute",
  props: {
    name: String,
    tabIndex: String,
  },
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  data() {
    return {
      maxAttributeInvested: MAX_ATTRIBUTE_INVESTED
    };
  },
  computed: {
    displayName() {
      return ATTRIBUTE_NAME[this.name];
    },
    isBuffed() {
      return (
        Math.round(this.store[this.name + "Buffed"]) >
        Math.round(this.store[this.name + "Base"])
      );
    },
    creation: {
      get() {
        return this.store.build.character.attributes[this.name].creation;
      },
      set(value) {
        let out = Math.round(Number(value) || 0)

        out = Math.max(
          MIN_CREATION_ATTRIBUTE_POINTS,
          Math.min(out, MAX_CREATION_ATTRIBUTE_POINTS)
        );

        this.store.updateAttributeCreation({
          name: this.name,
          value: out,
        });
      },
    },
    invested: {
      get() {
        return this.store.build.character.attributes[this.name].invested;
      },
      set(value) {
        this.store.updateAttributeInvested({
          name: this.name,
          value: value,
        });
      },
    },
    base() {
      return Math.round(this.store[this.name + "Base"]);
    },
    buffed() {
      return Math.round(this.store[this.name + "Buffed"]);
    },
    buffLevel: {
      get() {
        return this.store.build.character.attributes[this.name].buff;
      },
      set(value) {
        this.store.updateAttributeBuff({
          name: this.name,
          value: value,
        });
      },
    },
    buffName() {
      return BUFF_NAME[
        this.store.build.character.attributes[this.name].buff
      ];
    },
    cantrip: {
      get() {
        return this.store.build.character.attributes[this.name].cantrip;
      },
      set(value) {
        this.store.updateAttributeCantrip({
          name: this.name,
          value: value,
        });
      },
    },
    cantripName() {
      return CANTRIP_NAME[
        this.store.build.character.attributes[this.name].cantrip
      ];
    },

  },
};
</script>
