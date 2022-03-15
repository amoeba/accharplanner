import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'


import App from "./components/App.vue";
import "./assets/styles.scss";

const Planner = () => import("./components/Planner.vue");
const SavedBuilds = () => import("./components/SavedBuilds.vue");
const Import = () => import("./components/Import.vue");
const About = () => import("./components/About.vue");
const Builds = () => import("./components/Builds.vue");
const Build = () => import("./components/Build.vue");
const BuildLoader = () => import("./components/BuildLoader.vue");

import store from "./store";

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

// Sentry.io
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN + "", // + "" is to get around TS
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "planner.treestats.net", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

app
  .use(router)
  .use(store)
  .use(FloatingVue)
  .mount("#app")
