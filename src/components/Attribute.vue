<template>
  <tr>
    <td>
      <img
        :src="'/images/' + name + '.png'"
        :alt="displayName"
        width="20"
        height="20"
      />
    </td>
    <td>
      {{ displayName }}
    </td>
    <td><input type="range" min="10" max="100" v-model="creation" /></td>
    <td class="number">{{ creation }}</td>
    <td class="base number">{{ base }}</td>
    <td class="buffed number" v-bind:class="isBuffed ? 'isBuffed' : ''">
      {{ buffed }}
    </td>
    <td><input type="range" min="0" max="190" v-model="invested" /></td>
    <td class="invested number">{{ invested }}</td>
    <td>
      <select v-model="buffLevel">
        <option value="0">None</option>
        <option value="1">I</option>
        <option value="2">II</option>
        <option value="3">III</option>
        <option value="4">IV</option>
        <option value="5">V</option>
        <option value="6">VI</option>
        <option value="7">VII</option>
        <option value="8">VII</option>
      </select>
    </td>
    <td>
      <select v-model="cantrip">
        <option value="0">None</option>
        <option value="1">Minor</option>
        <option value="2">Major</option>
        <option value="3">Epic</option>
        <option value="4">Legendary</option>
      </select>
    </td>
  </tr>
</template>

<script>
import Constants from "../constants";

export default {
  name: "Attribute",
  props: {
    name: String,
    displayName: String
  },
  computed: {
    isBuffed() {
      return (
        this.$store.state.character.attributes[this._props.name].buff > 0 ||
        this.$store.state.character.attributes[this._props.name].cantrip > 0
      );
    },
    creation: {
      get() {
        return this.$store.state.character.attributes[this._props.name]
          .creation;
      },
      set(value) {
        this.$store.commit("updateAttributeCreation", {
          name: this._props.name,
          value: value
        });
      }
    },
    invested: {
      get() {
        return this.$store.state.character.attributes[this._props.name]
          .invested;
      },
      set(value) {
        this.$store.commit("updateAttributeInvested", {
          name: this._props.name,
          value: value
        });
      }
    },
    base() {
      return this.$store.getters[this._props.name + "Base"];
    },
    buffed() {
      return this.$store.getters[this._props.name + "Buffed"];
    },
    buffLevel: {
      get() {
        return this.$store.state.character.attributes[this._props.name].buff;
      },
      set(value) {
        this.$store.commit("updateAttributeBuff", {
          name: this._props.name,
          value: value
        });
      }
    },
    buffName() {
      return Constants.BUFF_NAME[
        this.$store.state.character.attributes[this._props.name].buff
      ];
    },
    cantrip: {
      get() {
        return this.$store.state.character.attributes[this._props.name].cantrip;
      },
      set(value) {
        this.$store.commit("updateAttributeCantrip", {
          name: this._props.name,
          value: value
        });
      }
    },
    cantripName() {
      return Constants.CANTRIP_NAME[
        this.$store.state.character.attributes[this._props.name].cantrip
      ];
    }
  }
};
</script>
