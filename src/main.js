import Vue from "vue";
import Planner from "./Planner.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Planner)
}).$mount("#planner");
