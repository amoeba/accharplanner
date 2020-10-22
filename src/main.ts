import Vue from "vue";
import VueRouter from "vue-router";
import App from "./components/App.vue";
import "./assets/styles.scss";

// Sentry.io
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  });
}

const Planner = () =>
  import(/* webpackChunkName: "planner" */ "./components/Planner.vue");
const SavedBuilds = () =>
  import(/* webpackChunkName: "savedbuilds" */ "./components/SavedBuilds.vue");
const Import = () =>
  import(/* webpackChunkName: "import" */ "./components/Import.vue");
const About = () =>
  import(/* webpackChunkName: "import" */ "./components/About.vue");
const Builds = () =>
  import(/* webpackChunkName: "builds" */ "./components/Builds.vue");
const Build = () =>
  import(/* webpackChunkName: "builds" */ "./components/Build.vue");

import store from "./store";
import { importCharacter } from "./import";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Planner },
    { path: "/saved", component: SavedBuilds },
    { path: "/import", component: Import },
    { path: "/about", component: About },
    { path: "/builds", component: Builds },
    { path: "/builds/:id", component: Build },
    { path: "/:build_id", component: Planner }
  ]
});

new Vue({
  router,
  store,
  render: h => h(App),
  created: function () {
    // Clear any notifications stored in localStorage
    this.$store.commit("clearAllNotifications");

    // Decide if we should do things
    const params = new URL(document.location.href).searchParams;

    if (
      !params.get("action") ||
      !params.get("server") ||
      !params.get("character")
    ) {
      return;
    }

    if (params.get("action") != "import") {
      return;
    }

    // Reset our character before import
    this.$store.commit("reset");

    // Start doing things
    var store = this.$store;
    const url =
      "https://treestats.net/" +
      params.get("server") +
      "/" +
      params.get("character") +
      ".json";
    let errorEncountered = false;

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (!json.attribs) {
          throw "Invalid JSON structure. Is this character a stub character (i.e., no attributes, skills)?";
        }

        return json;
      })
      .then(json => {
        importCharacter(store, json);
      })
      .catch(error => {
        errorEncountered = true;

        store.commit("addNotification", {
          type: "error",
          message:
            "Failed to import " +
            params.get("character") +
            " (" +
            params.get("server") +
            "): " +
            error
        });

        return;
      })
      .then(() => {
        if (errorEncountered) {
          return;
        }

        store.commit("addNotification", {
          type: "success",
          message:
            params.get("character") +
            " (" +
            params.get("server") +
            ") successfully imported."
        });
      });
  }
}).$mount("#app");
