import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isBuffed: false,
    character: {
      attributes: {
        strength: 100,
        endurance: 100,
        coordination: 100,
        quickness: 100,
        focus: 100,
        self: 100
      },
      skills: {
        alchemy: {
          training: "untrained"
        }
      }
    }
  },
  getters: {
    isBuffed: state => {
      return state.isBuffed;
    },
    alchemy_unbuffed: state => {
      return state.character.attributes.focus / 2;
    },
    alchemy_buffed: state => {
      const buffAmount = state.isBuffed ? 100 : 0;
      return state.character.attributes.focus / 2 + buffAmount;
    },
    specializedSkills: state => {
      return Object.keys(state.character.skills)
        .filter(key => state.character.skills[key].training === "specialized");
    },
    trainedSkills: state => {
      return Object.keys(state.character.skills)
        .filter(key => state.character.skills[key].training === "trained");
    },
    untrainedSkills: state => {
      return Object.keys(state.character.skills)
        .filter(key => state.character.skills[key].training === "untrained");
    }
  },
  mutations: {
    updateBuffed(state, value) {
      state.isBuffed = value;
    },

    updateAttribute(state, payload) {
      state.character.attributes[payload.name] = payload.value;
    },

    increaseTraining(state, skill) {
      const currentTraining = state.character.skills[skill].training;
      var newTraining = null;

      switch (currentTraining) {
        case "untrained":
          newTraining = "trained";
          break;
        case "trained":
          newTraining = "specialized";
          break;
        default:
          return;
      }

      state.character.skills[skill].training = newTraining;
    },

    decreaseTraining(state, skill) {
      const currentTraining = state.character.skills[skill].training;
      var newTraining = null;

      switch (currentTraining) {
        case "specialized":
          newTraining = "trained";
          break;
        case "trained":
          newTraining = "untrained";
          break;
        default:
          return;
      }

      state.character.skills[skill].training = newTraining;
    }
  },
  actions: {}
});
