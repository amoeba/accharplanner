<template>
  <div>
    <span>{{ name }}: {{ base }} / {{ buffed }}</span>
    <button v-on:click="increaseTraining">+</button>
    <button v-on:click="decreaseTraining">-</button>
    <ul>
      <li>Invested <input type="range" min="0" v-bind:max="maxInvestment" v-model="invested" /> {{ invested }}</li>
      <li>Buff: <input type="range" min="0" max="8" v-model="buffLevel" /> {{ buffLevel }}</li>
    </ul>
  </div>
</template>

<script>
import Constants from "../constants";

export default {
  name: "Skill",
  props: {
    name: String
  },
  computed: {
    invested: {
      get () {
        return this.$store.state.character.skills[this._props.name].invested;
      },
      set (value) {
        this.$store.commit("updateSkillInvestment", { 
          "name": this._props.name, 
          "value": value 
        });
      }
    },
    maxInvestment () {
      if (this.$store.state.character.skills[this._props.name].training === Constants.TRAINING.SPECIALIZED) {
        return 226;
      }  else if (this.$store.state.character.skills[this._props.name].training === Constants.TRAINING.TRAINED) {
        return 208;
      } else {
        return -1;
      }
    },
    base () {
      return this.$store.getters[this._props.name + "Base"]
    },
    buffed () {
      return this.$store.getters[this._props.name + "Buffed"]
    },
    buffLevel: {
      get () {
        return this.$store.state.character.skills[this._props.name].buff;
      },
      set (value) {
        this.$store.commit("updateSkillBuff", { 
          "name": this._props.name, 
          "value": value 
        });
      }
    }
  },
  methods: {
    increaseTraining () {
      this.$store.commit("increaseTraining", this._props.name);
    },
    decreaseTraining () {
      this.$store.commit("decreaseTraining", this._props.name);
    }
  }
};
</script>

<style>
.buffed {
  color: green;
  font-weight: bold;
}
</style>
