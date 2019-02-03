import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// Automatically persist state to localStorage
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// TODO: Factor out into lib
const calcTrainingBonus = function(training) {
  if (training === "specialized") {
    return 10;
  } else if (training === "trained") {
    return 5;
  } else {
    return 0;
  }
}

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
    exportedCharacter: state => {
      return JSON.stringify(state, null, 4);
    },
    isBuffed: state => {
      return state.isBuffed;
    },
    alchemy_unbuffed: state => {
      const trainingBonusAmount = calcTrainingBonus(state.character.skills.alchemy.training);

      return Math.round(state.character.attributes.focus / 2) + trainingBonusAmount;
    },
    alchemy_buffed: state => {
      const buffAmount = state.isBuffed ? 100 : 0;
      const trainingBonusAmount = calcTrainingBonus(state.character.skills.alchemy.training);

      return Math.round(state.character.attributes.focus / 2 + buffAmount) + trainingBonusAmount;
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
  plugins: [
    vuexLocal.plugin
  ]
});
