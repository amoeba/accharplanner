<template>
  <tr>
    <td>
      <img
        :src="'/img/' + name + '.png'"
        :alt="displayName"
        width="20"
        height="20"
      />
    </td>
    <td>{{ displayName }}</td>
    <td>
      <input type="range" min="10" max="100" v-model="creation" />
    </td>
    <td class="number">
      <input
        type="text"
        v-bind:value="creation"
        v-on:change="updateCreation"
        v-bind:tabindex="tabIndex"
      />
    </td>
    <td class="base number">{{ base }}</td>
    <td class="buffed number" v-bind:class="isBuffed ? 'isBuffed' : ''">
      {{ buffed }}
    </td>
    <td>
      <input type="range" min="0" max="190" v-model="invested" />
    </td>
    <td class="invested number">
      <input
        type="text"
        v-bind:value="invested"
        v-on:change="updateInvested"
        v-bind:tabindex="tabIndex"
      />
    </td>
    <td>
      <select v-model="buffLevel">
        <option value="0"></option>
        <option value="1">I</option>
        <option value="2">II</option>
        <option value="3">III</option>
        <option value="4">IV</option>
        <option value="5">V</option>
        <option value="6">VI</option>
        <option value="7">VII</option>
        <option value="8">VIII</option>
        <option value="9">Beer</option>
      </select>
    </td>
    <td>
      <select v-model="cantrip">
        <option value="0"></option>
        <option value="1">Minor</option>
        <option value="2">Major</option>
        <option value="3">Epic</option>
        <option value="4">Legen.</option>
      </select>
    </td>
  </tr>
</template>

<script>
import { ATTRIBUTE_NAME, BUFF_NAME, CANTRIP_NAME } from "../mappings";

export default {
  name: "Attribute",
  props: {
    name: String,
    tabIndex: String,
  },
  computed: {
    displayName() {
      return ATTRIBUTE_NAME[this.name];
    },
    isBuffed() {
      return (
        Math.round(this.$store.getters[this.name + "Buffed"]) >
        Math.round(this.$store.getters[this.name + "Base"])
      );
    },
    creation: {
      get() {
        return this.$store.state.build.character.attributes[this.name].creation;
      },
      set(value) {
        if (value > 100) {
          value = 100;
        } else if (value < 10) {
          value = 10;
        }

        this.$store.commit("updateAttributeCreation", {
          name: this.name,
          value: value,
        });
      },
    },
    invested: {
      get() {
        return this.$store.state.build.character.attributes[this.name].invested;
      },
      set(value) {
        this.$store.commit("updateAttributeInvested", {
          name: this.name,
          value: value,
        });
      },
    },
    base() {
      return Math.round(this.$store.getters[this.name + "Base"]);
    },
    buffed() {
      return Math.round(this.$store.getters[this.name + "Buffed"]);
    },
    buffLevel: {
      get() {
        return this.$store.state.build.character.attributes[this.name].buff;
      },
      set(value) {
        this.$store.commit("updateAttributeBuff", {
          name: this.name,
          value: value,
        });
      },
    },
    buffName() {
      return BUFF_NAME[
        this.$store.state.build.character.attributes[this.name].buff
      ];
    },
    cantrip: {
      get() {
        return this.$store.state.build.character.attributes[this.name].cantrip;
      },
      set(value) {
        this.$store.commit("updateAttributeCantrip", {
          name: this.name,
          value: value,
        });
      },
    },
    cantripName() {
      return CANTRIP_NAME[
        this.$store.state.build.character.attributes[this.name].cantrip
      ];
    },
  },
  methods: {
    updateCreation(e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 10;
      }

      if (value > 100) {
        value = 100;
      } else if (value < 10) {
        value = 10;
      }

      this.$store.commit("updateAttributeCreation", {
        name: this.name,
        value: value,
      });

      e.target.value = value;
    },
    updateInvested(e) {
      let value = Math.round(Number(e.target.value));

      if (isNaN(value)) {
        value = 0;
      }

      if (value > 190) {
        value = 190;
      } else if (value < 0) {
        value = 0;
      }

      this.$store.commit("updateAttributeInvested", {
        name: this.name,
        value: value,
      });

      e.target.value = value;
    },
  },
};
</script>
