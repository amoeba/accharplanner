import Vue from "vue";
import Vuex from "vuex";
import Helpers from "./helpers";
import Constants from "./constants";

Vue.use(Vuex);

// Automatically persist state to localStorage
// import VuexPersistence from 'vuex-persist'
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// });

export default new Vuex.Store({
  state: {
    isBuffed: false,
    character: {
      level: 5,
      attributes: {
        strength: {
          creation: 100,
          invested: 0,
          buff: 0
        },
        endurance: {
          creation: 100,
          invested: 0,
          buff: 0
        },
        coordination: {
          creation: 100,
          invested: 0,
          buff: 0
        },
        quickness: {
          creation: 100,
          invested: 0,
          buff: 0
        },
        focus: {
          creation: 100,
          invested: 0,
          buff: 0
        },
        self: {
          creation: 100,
          invested: 0,
          buff: 0
        }
      },
      skills: {
        alchemy: {
          training: Constants.TRAINING.TRAINED,
          invested: 0,
          buff: 0
        }
      }
    }
  },
  getters: {
    // General
    exportedCharacter: state => {
      return JSON.stringify(state, null, 4);
    },
    isBuffed: state => {
      return state.isBuffed;
    },
    totalXPCost: (state, getters) => {
      let cost = 0;

      cost += Constants.COST_LEVEL[state.character.level];
      
      Constants.ATTRIBUTES.forEach(a => {
        cost += Constants.COST_ATTRIBUTE[state.character.attributes[a].invested];
      });

      getters.specializedSkills.forEach(s => {
        cost += Constants.COST_SKILL_SPECIALIZED[state.character.skills[s].invested];
      });

      getters.trainedSkills.forEach(s => {
        cost += Constants.COST_SKILL_TRAINED[state.character.skills[s].invested];
      });

      return cost;
    },

    // Attributes
    strengthBase: state => {
      return state.character.attributes.strength.creation + state.character.attributes.strength.invested;
    },
    strengthBuffed: (state, getters) => {
      return getters.strengthBase + Helpers.buffBonus(state.character.attributes.strength.buff);
    },
    enduranceBase: state => {
      return state.character.attributes.endurance.creation + state.character.attributes.endurance.invested;
    },
    enduranceBuffed: (state, getters) => {
      return getters.enduranceBase + Helpers.buffBonus(state.character.attributes.endurance.buff);
    },
    coordinationBase: state => {
      return state.character.attributes.coordination.creation + state.character.attributes.coordination.invested;
    },
    coordinationBuffed: (state, getters) => {
      return getters.coordinationBase + Helpers.buffBonus(state.character.attributes.coordination.buff);
    },
    quicknessBase: state => {
      return state.character.attributes.quickness.creation + state.character.attributes.quickness.invested;
    },
    quicknessBuffed: (state, getters) => {
      return getters.quicknessBase + Helpers.buffBonus(state.character.attributes.quickness.buff);
    },
    focusBase: state => {
      return state.character.attributes.focus.creation + state.character.attributes.focus.invested;
    },
    focusBuffed: (state, getters) => {
      return getters.focusBase + Helpers.buffBonus(state.character.attributes.focus.buff);
    },
    selfBase: state => {
      return state.character.attributes.self.creation + state.character.attributes.self.invested;
    },
    selfBuffed: (state, getters) => {
      return getters.selfBase + Helpers.buffBonus(state.character.attributes.self.buff);
    },
    
    // Skills
    alchemyBase: (state, getters) => {
      return Math.round(getters.focusBase / 2) + 
        Helpers.trainingBonus(state.character.skills.alchemy.training) + 
        state.character.skills.alchemy.invested;
    },
    alchemyBuffed: (state, getters) => {
      return getters.alchemyBase + 
        Helpers.buffBonus(state.character.skills.alchemy.buff) +
        Math.round(Helpers.buffBonus(state.character.attributes.focus.buff) /2);
    },
    specializedSkills: state => {
      return Object.keys(state.character.skills)
        .filter(key => state.character.skills[key].training === Constants.TRAINING.SPECIALIZED);
    },
    trainedSkills: state => {
      return Object.keys(state.character.skills)
        .filter(key => state.character.skills[key].training === Constants.TRAINING.TRAINED);
    },
    untrainedSkills: state => {
      return Object.keys(state.character.skills)
        .filter(key => state.character.skills[key].training === Constants.TRAINING.UNTRAINED);
    },
    unusableSkills: state => {
      return Object.keys(state.character.skills)
        .filter(key => state.character.skills[key].training === Constants.TRAINING.UNUSABLE);
    }
  },
  mutations: {
    updateLevel(state, value) {
      state.character.level = Number(value);
    },

    updateBuffed(state, value) {
      state.isBuffed = value;
    },

    updateAttributeCreation(state, payload) {
      state.character.attributes[payload.name].creation = Number(payload.value);
    },

    updateAttributeInvested(state, payload) {
      state.character.attributes[payload.name].invested = Number(payload.value);
    },

    updateAttributeBuff(state, payload) {
      state.character.attributes[payload.name].buff = Number(payload.value);
    },

    updateSkillInvestment(state, payload) {
      state.character.skills[payload.name].invested = Number(payload.value);
    },

    updateSkillBuff(state, payload) {
      state.character.skills[payload.name].buff = Number(payload.value);
    },

    increaseTraining(state, skill) {
      const currentTraining = state.character.skills[skill].training;
      var newTraining = null;

      switch (currentTraining) {
        case Constants.TRAINING.UNUSABLE:
          newTraining = Constants.TRAINING.TRAINED;
          break;
        case Constants.TRAINING.UNTRAINED:
          newTraining = Constants.TRAINING.TRAINED;
          break;
        case Constants.TRAINING.TRAINED:
          newTraining = Constants.TRAINING.SPECIALIZED;
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
        case Constants.TRAINING.SPECIALIZED:
          newTraining = Constants.TRAINING.TRAINED;
          
          // Reduce max skill invested to 208 (max for trained) if over
          if (state.character.skills[skill].invested > 208) {
            state.character.skills[skill].invested = 208;
          }

          break;
        case Constants.TRAINING.TRAINED:
          newTraining = Constants.UNTRAINED_STATE[skill];
          break;
        default:
          return;
      }

      state.character.skills[skill].training = newTraining;
    }
  }
});
