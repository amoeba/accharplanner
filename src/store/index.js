import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

// Automatically persist state to localStorage
const vuexLocal = new VuexPersistence({
  key: "character",
  storage: window.localStorage
});

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  plugins: [
    vuexLocal.plugin
  ]
});
