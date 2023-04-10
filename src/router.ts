import { createRouter, createWebHistory } from "vue-router";

const Planner = () => import("./components/Planner.vue");
const SavedBuilds = () => import("./components/SavedBuilds.vue");
const Import = () => import("./components/Import.vue");
const About = () => import("./components/About.vue");
const Builds = () => import("./components/Builds.vue");
const Build = () => import("./components/Build.vue");
const EditBuild = () => import("./components/EditBuild.vue");
const BuildLoader = () => import("./components/BuildLoader.vue");
const Changelog = () => import("./components/Changelog.vue");
const Login = () => import("./components/Login.vue");
const Account = () => import("./components/Account.vue");

import store from "./store";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Planner },
    { path: "/saved", component: SavedBuilds },
    { path: "/import", component: Import },
    { path: "/about", component: About },
    { path: "/builds", component: Builds },
    { path: "/changelog", component: Changelog },
    { path: "/builds/:id", component: Build },
    { path: "/builds/:id/edit", component: EditBuild },
    { path: "/:build_id", component: BuildLoader },
    { path: "/login", component: Login },
    { path: "/account", component: Account },
  ],
});
