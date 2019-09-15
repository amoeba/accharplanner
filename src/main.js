import Vue from "vue";
import VueRouter from "vue-router";
import App from "./components/App.vue";
import Planner from "./Planner";
import Builds from "./components/Builds";
import Import from "./components/Import";
import store from "./store";
import Constants from "./constants";
import "./registerServiceWorker";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    { path: "/", component: Planner },
    { path: "/builds", component: Builds },
    { path: "/import", component: Import }
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
    const params = new URL(document.location).searchParams;

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
      .then(json => {
        store.state.character.name = json.name;
        store.state.character.level = json.level;
        store.state.character.race = json.race;
        store.state.character.gender = json.gender;

        // Attributes
        Object.keys(json.attribs).forEach(a => {
          store.state.character.attributes[a].creation =
            json.attribs[a].creation;
          store.state.character.attributes[a].invested =
            json.attribs[a].base - json.attribs[a].creation;
        });

        // Vitals
        Object.keys(json.vitals).forEach(a => {
          store.state.character.vitals[a].indvested = 0;
          store.state.character.vitals[a].invested =
            json.vitals[a].base - store.getters[a + "Base"];
        });

        // Skills
        Object.keys(json.skills).forEach(s => {
          store.state.character.skills[s].training = json.skills[
            s
          ].training.toLowerCase();

          if (
            store.state.character.skills[s].training ===
            Constants.TRAINING.SPECIALIZED ||
            store.state.character.skills[s].training ===
            Constants.TRAINING.TRAINED
          ) {
            store.state.character.skills[s].invested = 0;
            store.state.character.skills[s].invested =
              json.skills[s].base - store.getters[s + "Base"];
          }
        });

        // Experience Augmentations and Luminance Auras
        Object.keys(json.properties).forEach(property => {
          switch (property) {
            case "218":
              store.state.character.augmentations.reinforcement_of_the_lugians.invested = json.properties[property];
              break;
            case "219":
              store.state.character.augmentations.bleearghs_fortitude.invested = json.properties[property];
              break;
            case "220":
              store.state.character.augmentations.oswalds_enhancement.invested = json.properties[property];
              break;
            case "221":
              store.state.character.augmentations.siraluuns_blessing.invested = json.properties[property];
              break;
            case "222":
              store.state.character.augmentations.enduring_enchantment.invested = json.properties[property];
              break;
            case "223":
              store.state.character.augmentations.steadfast_will.invested = json.properties[property];
              break;
            case "224":
              store.state.character.augmentations.ciandras_essence.invested = json.properties[property];
              break;
            case "225":
              store.state.character.augmentations.yoshis_essence.invested = json.properties[property];
              break;
            case "226":
              store.state.character.augmentations.jibrils_essence.invested = json.properties[property];
              break;
            case "227":
              store.state.character.augmentations.celdiseths_essence.invested = json.properties[property];
              break;
            case "228":
              store.state.character.augmentations.kogas_essence.invested = json.properties[property];
              break;
            case "229":
              store.state.character.augmentations.shadow_of_the_seventh_mule.invested = json.properties[property];
              break;
            case "230":
              store.state.character.augmentations.might_of_the_seventh_mule.invested = json.properties[property];
              break;
            case "231":
              store.state.character.augmentations.clutch_of_the_miser.invested = json.properties[property];
              break;
            case "232":
              store.state.character.augmentations.enduring_enchantment.invested = json.properties[property];
              break;
            case "233":
              store.state.character.augmentations.critical_protection.invested = json.properties[property];
              break;
            case "234":
              store.state.character.augmentations.quick_learner.invested = json.properties[property];
              break;
            case "235":
              store.state.character.augmentations.ciandras_fortune.invested = json.properties[property];
              break;
            case "236":
              store.state.character.augmentations.charmed_smith.invested = json.properties[property];
              break;
            case "237":
              store.state.character.augmentations.innate_renewal.invested = json.properties[property];
              break;
            case "238":
              store.state.character.augmentations.archmages_endurance.invested = json.properties[property];
              break;
            case "240":
              store.state.character.augmentations.enhancement_of_the_blade_turner.invested = json.properties[property];
              break;
            case "241":
              store.state.character.augmentations.enhancement_of_the_arrow_turner.invested = json.properties[property];
              break;
            case "242":
              store.state.character.augmentations.enhancement_of_the_mace_turner.invested = json.properties[property];
              break;
            case "243":
              store.state.character.augmentations.caustic_enhancement.invested = json.properties[property];
              break;
            case "244":
              store.state.character.augmentations.fiery_enhancement.invested = json.properties[property];
              break;
            case "245":
              store.state.character.augmentations.icy_enhancement.invested = json.properties[property];
              break;
            case "246":
              store.state.character.augmentations.storms_enhancement.invested = json.properties[property];
              break;
            case "298":
              store.state.character.augmentations.eye_of_the_remorseless.invested = json.properties[property];
              break;
            case "299":
              store.state.character.augmentations.hand_of_the_remorseless.invested = json.properties[property];
              break;
            case "300":
              store.state.character.augmentations.master_of_the_steel_circle.invested = json.properties[property];
              break;
            case "301":
              store.state.character.augmentations.master_of_the_focused_eye.invested = json.properties[property];
              break;
            case "302":
              store.state.character.augmentations.master_of_the_five_fold_path.invested = json.properties[property];
              break;
            case "309":
              store.state.character.augmentations.frenzy_of_the_slayer.invested = json.properties[property];
              break;
            case "310":
              store.state.character.augmentations.iron_skin_of_the_invincible.invested = json.properties[property];
              break;
            case "326":
              store.state.character.augmentations.jack_of_all_trades.invested = json.properties[property];
              break;
            case "328":
              store.state.character.augmentations.infused_void_magic.invested = json.properties[property];
              break;
            case "294":
              store.state.character.augmentations.infused_creature_magic.invested = json.properties[property];
              break;
            case "295":
              store.state.character.augmentations.infused_item_magic.invested = json.properties[property];
              break;
            case "296":
              store.state.character.augmentations.infused_life_magic.invested = json.properties[property];
              break;
            case "297":
              store.state.character.augmentations.infused_war_magic.invested = json.properties[property];
              break;
            case "333":
              store.state.character.luminance_auras.valor.invested = json.properties[property];
              break;
            case "334":
              store.state.character.luminance_auras.protection.invested = json.properties[property];
              break;
            case "335":
              store.state.character.luminance_auras.glory.invested = json.properties[property];
              break;
            case "336":
              store.state.character.luminance_auras.temperance.invested = json.properties[property];
              break;
            case "338":
              store.state.character.luminance_auras.aetheric_vision.invested = json.properties[property];
              break;
            case "339":
              store.state.character.luminance_auras.mana_flow.invested = json.properties[property];
              break;
            case "340":
              store.state.character.luminance_auras.mana_infusion.invested = json.properties[property];
              break;
            case "342":
              store.state.character.luminance_auras.purity.invested = json.properties[property];
              break;
            case "343":
              store.state.character.luminance_auras.craftsman.invested = json.properties[property];
              break;
            case "344":
              store.state.character.luminance_auras.specialization.invested = json.properties[property];
              break;
            case "365":
              store.state.character.luminance_auras.world.invested = json.properties[property];
              break;
            default:
              break;
          }
        });
      })
      .catch(error => {
        errorEncountered = true;

        store.commit("addNotification", {
          type: "failure",
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
