import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
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

createApp(App)
  .use(router)
  .use(store)
  .mount("#app")

// Sentry.io
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

if (import.meta.env.SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.NEXT_PUBLIC_SENTRY_DSN + "", // + "" is to get around TS
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
