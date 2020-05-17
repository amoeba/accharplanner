import Vue from "vue";
import VueRouter from "vue-router";
import App from "./components/App.vue";
import "./assets/styles.css";

// Sentry.io
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

Sentry.init({
  dsn: "https://cfba8bdf4efc44358ed01b97bcaabc32@sentry.io/2802535",
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
});

const Planner = () => import(/* webpackChunkName: "planner" */ "./Planner.vue");
const Builds = () =>
  import(/* webpackChunkName: "builds" */ "./components/Builds.vue");
const Import = () =>
  import(/* webpackChunkName: "import" */ "./components/Import.vue");

import store from "./store";
import "./registerServiceWorker";
import { Training } from "./types";
import DefaultCharacter from "./store/DefaultCharacter";

// Firebase
import firebase from "./firebase";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Planner },
    { path: "/builds", component: Builds },
    { path: "/import", component: Import },
    { path: "/:build_id", component: Planner }
  ]
});

new Vue({
  router,
  store,
  render: h => h(App),
  created: function() {
    // Ping firebase with a heartbeat event
    const analytics = firebase.analytics();
    analytics.logEvent("appCreated");

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
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        // Re-set to blank state prior to import
        store.state.build.character = JSON.parse(
          JSON.stringify(DefaultCharacter())
        );
        store.state.build.stages = [];

        // Set Jack of All Trades invested to zero in case this character isn't
        // one of the original heritage groups
        store.state.build.character.augmentations.jack_of_all_trades.invested = 0;

        store.state.build.character.name = json.name;
        store.state.build.character.level = json.level;
        store.state.build.character.race = json.race;
        store.state.build.character.gender = json.gender;

        // Attributes
        Object.keys(json.attribs).forEach(a => {
          store.state.build.character.attributes[a].creation =
            json.attribs[a].creation;
          store.state.build.character.attributes[a].invested =
            json.attribs[a].base - json.attribs[a].creation;
        });

        // Vitals
        Object.keys(json.vitals).forEach(a => {
          store.state.build.character.vitals[a].indvested = 0;
          store.state.build.character.vitals[a].invested =
            json.vitals[a].base - store.getters[a + "Base"];
        });

        // Skills
        Object.keys(json.skills).forEach(s => {
          store.state.build.character.skills[s].training = json.skills[
            s
          ].training.toLowerCase();

          if (
            store.state.build.character.skills[s].training ===
              Training.SPECIALIZED ||
            store.state.build.character.skills[s].training === Training.TRAINED
          ) {
            store.state.build.character.skills[s].invested = 0;
            store.state.build.character.skills[s].invested =
              json.skills[s].base - store.getters[s + "Base"];
          }
        });

        // Experience Augmentations and Luminance Auras
        Object.keys(json.properties).forEach(property => {
          switch (property) {
            case "218":
              store.state.build.character.augmentations.reinforcement_of_the_lugians.invested =
                json.properties[property];
              break;
            case "219":
              store.state.build.character.augmentations.bleearghs_fortitude.invested =
                json.properties[property];
              break;
            case "220":
              store.state.build.character.augmentations.oswalds_enhancement.invested =
                json.properties[property];
              break;
            case "221":
              store.state.build.character.augmentations.siraluuns_blessing.invested =
                json.properties[property];
              break;
            case "222":
              store.state.build.character.augmentations.enduring_enchantment.invested =
                json.properties[property];
              break;
            case "223":
              store.state.build.character.augmentations.steadfast_will.invested =
                json.properties[property];
              break;
            case "224":
              store.state.build.character.augmentations.ciandras_essence.invested =
                json.properties[property];
              break;
            case "225":
              store.state.build.character.augmentations.yoshis_essence.invested =
                json.properties[property];
              break;
            case "226":
              store.state.build.character.augmentations.jibrils_essence.invested =
                json.properties[property];
              break;
            case "227":
              store.state.build.character.augmentations.celdiseths_essence.invested =
                json.properties[property];
              break;
            case "228":
              store.state.build.character.augmentations.kogas_essence.invested =
                json.properties[property];
              break;
            case "229":
              store.state.build.character.augmentations.shadow_of_the_seventh_mule.invested =
                json.properties[property];
              break;
            case "230":
              store.state.build.character.augmentations.might_of_the_seventh_mule.invested =
                json.properties[property];
              break;
            case "231":
              store.state.build.character.augmentations.clutch_of_the_miser.invested =
                json.properties[property];
              break;
            case "232":
              store.state.build.character.augmentations.enduring_enchantment.invested =
                json.properties[property];
              break;
            case "233":
              store.state.build.character.augmentations.critical_protection.invested =
                json.properties[property];
              break;
            case "234":
              store.state.build.character.augmentations.quick_learner.invested =
                json.properties[property];
              break;
            case "235":
              store.state.build.character.augmentations.ciandras_fortune.invested =
                json.properties[property];
              break;
            case "236":
              store.state.build.character.augmentations.charmed_smith.invested =
                json.properties[property];
              break;
            case "237":
              store.state.build.character.augmentations.innate_renewal.invested =
                json.properties[property];
              break;
            case "238":
              store.state.build.character.augmentations.archmages_endurance.invested =
                json.properties[property];
              break;
            case "240":
              store.state.build.character.augmentations.enhancement_of_the_blade_turner.invested =
                json.properties[property];
              break;
            case "241":
              store.state.build.character.augmentations.enhancement_of_the_arrow_turner.invested =
                json.properties[property];
              break;
            case "242":
              store.state.build.character.augmentations.enhancement_of_the_mace_turner.invested =
                json.properties[property];
              break;
            case "243":
              store.state.build.character.augmentations.caustic_enhancement.invested =
                json.properties[property];
              break;
            case "244":
              store.state.build.character.augmentations.fiery_enhancement.invested =
                json.properties[property];
              break;
            case "245":
              store.state.build.character.augmentations.icy_enhancement.invested =
                json.properties[property];
              break;
            case "246":
              store.state.build.character.augmentations.storms_enhancement.invested =
                json.properties[property];
              break;
            case "298":
              store.state.build.character.augmentations.eye_of_the_remorseless.invested =
                json.properties[property];
              break;
            case "299":
              store.state.build.character.augmentations.hand_of_the_remorseless.invested =
                json.properties[property];
              break;
            case "300":
              store.state.build.character.augmentations.master_of_the_steel_circle.invested =
                json.properties[property];
              break;
            case "301":
              store.state.build.character.augmentations.master_of_the_focused_eye.invested =
                json.properties[property];
              break;
            case "302":
              store.state.build.character.augmentations.master_of_the_five_fold_path.invested =
                json.properties[property];
              break;
            case "309":
              store.state.build.character.augmentations.frenzy_of_the_slayer.invested =
                json.properties[property];
              break;
            case "310":
              store.state.build.character.augmentations.iron_skin_of_the_invincible.invested =
                json.properties[property];
              break;
            case "326":
              store.state.build.character.augmentations.jack_of_all_trades.invested =
                json.properties[property];
              break;
            case "328":
              store.state.build.character.augmentations.infused_void_magic.invested =
                json.properties[property];
              break;
            case "294":
              store.state.build.character.augmentations.infused_creature_magic.invested =
                json.properties[property];
              break;
            case "295":
              store.state.build.character.augmentations.infused_item_magic.invested =
                json.properties[property];
              break;
            case "296":
              store.state.build.character.augmentations.infused_life_magic.invested =
                json.properties[property];
              break;
            case "297":
              store.state.build.character.augmentations.infused_war_magic.invested =
                json.properties[property];
              break;
            default:
              break;
          }
        });
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
            ") successfully imported. Note that Auras aren't imported due to limitations out of my control."
        });
      });
  }
}).$mount("#app");
