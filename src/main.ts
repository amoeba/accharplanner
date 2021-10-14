import {createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import App from "./components/App.vue";
import "./assets/styles.scss";

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

const app = createApp(App)
  .use(router)
  .use(store)
  .mount("#app")

// Sentry.io
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,  });
}
