import {createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import App from "./components/App.vue";
import "./assets/styles.scss";

// Sentry.io
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

// if (process.env.SENTRY_DSN) {
//   Sentry.init({
//     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
//     integrations: [new Integrations.Vue({ Vue, attachProps: true })]
//   });
// }

const Planner = () =>
  import(/* webpackChunkName: "planner" */ "./components/Planner.vue");
const SavedBuilds = () =>
  import(/* webpackChunkName: "other" */ "./components/SavedBuilds.vue");
const Import = () =>
  import(/* webpackChunkName: "other" */ "./components/Import.vue");
const About = () =>
  import(/* webpackChunkName: "other" */ "./components/About.vue");
const Builds = () =>
  import(/* webpackChunkName: "other" */ "./components/Builds.vue");
const Build = () =>
  import(/* webpackChunkName: "other" */ "./components/Build.vue");
const BuildLoader = () =>
  import(/* webpackChunkName: "other" */ "./components/BuildLoader.vue");

import store from "./store";
import { importCharacter } from "./import";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Planner },
    { path: "/saved", component: SavedBuilds },
    { path: "/import", component: Import },
    { path: "/about", component: About },
    { path: "/builds", component: Builds },
    { path: "/builds/:id", component: Build },
    { path: "/:build_id", component: BuildLoader }
  ]
});

createApp(App)
  .use(router)
  .use(store)
  .mount("#app")
