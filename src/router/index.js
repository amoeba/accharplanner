import Vue from "vue";
import Router from "vue-router";
import Character from "@/components/Character";
import About from "@/components/About";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Character",
      component: Character
    },
    {
      path: "/about",
      name: "About",
      component: About
    }
  ]
});
