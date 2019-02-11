<template>
  <tr>
    <td>
      <img :src="'/images/' + name + '.png'" :alt="displayName" width="20" height="20" />
    </td>
    <td>
      {{ displayName }}
    </td>
    <td><input type="range" min="10" max="100" v-model="creation" /></td>
    <td class="number">{{ creation }}</td>
    <td><input type="range" min="0" max="190" v-model="invested" /></td>
    <td class="number">{{ invested }}</td>
    <td class="number">{{ base }}</td>
    <td v-bind:class="isBuffed ? 'buffed' : ''">{{ buffed }}</td>
    <td><input type="range" min="0" max="8" v-model="buffLevel" /></td>
    <td class="number">{{ buffName }}</td>
    <td><input type="range" min="0" max="4" v-model="cantrip" /></td>
    <td class="number">{{ cantripName }}</td>
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
