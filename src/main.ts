import { createApp } from "vue";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

import router from "./router";
import store from "./store/index";
import App from "./components/App.vue";
import "./assets/styles.scss";

// Create app, gets filled in later on
const app = createApp(App);

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

// Finish setup and then mount
app.use(router).use(store).use(FloatingVue).mount("#app");
