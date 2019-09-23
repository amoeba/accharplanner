import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import { State } from "../types";
import actions from './actions';

Vue.use(Vuex);

// Automatically persist state to localStorage
const vuexLocal = new VuexPersistence<State>({
  key: "planner",
  storage: window.localStorage
});

export default new Vuex.Store<State>({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  plugins: [vuexLocal.plugin]
});
