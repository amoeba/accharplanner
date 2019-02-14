import Vue from "vue";
import Planner from "./Planner.vue";
import store from "./store";
import Constants from "./constants";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(Planner),
  created: function () {
    // Clear any notifications stored in localStorage
    this.$store.commit('clearAllNotifications');

    // Decide if we should do things
    const params = (new URL(document.location)).searchParams;

    if (!params.get('action') || !params.get('server') || !params.get('character')) {
      return;
    }

    if (params.get('action') != "import") {
      return;
    }

    // Start doing things
    var store = this.$store;
    const url = 'https://treestats.net/' + params.get("server") + '/' + params.get("character") + '.json';
    let errorEncountered = false;

    fetch(url)
    .then(function (response) {
      return response.json();
    }).then(json => {
      store.state.character.name = json.name;
      store.state.character.level = json.level;
      store.state.character.race = json.race;
      store.state.character.gender = json.gender;
    
      // Attributes
      Object.keys(json.attribs).forEach(a => {
        store.state.character.attributes[a].creation = json.attribs[a].creation;
        store.state.character.attributes[a].invested = json.attribs[a].base - json.attribs[a].creation;
      });
    
      // Vitals
      Object.keys(json.vitals).forEach(a => {
        store.state.character.vitals[a].indvested = 0;
        store.state.character.vitals[a].invested = json.vitals[a].base - store.getters[a + 'Base'];
      });
    
      // Skills
      Object.keys(json.skills).forEach(s => {
        store.state.character.skills[s].training = json.skills[s].training.toLowerCase();
    
        if (store.state.character.skills[s].training === Constants.TRAINING.SPECIALIZED ||
          store.state.character.skills[s].training === Constants.TRAINING.TRAINED) {
          store.state.character.skills[s].invested = 0;
          store.state.character.skills[s].invested = json.skills[s].base - store.getters[s + 'Base'];
        }
      });
    }).catch(error => {
      errorEncountered = true;

      store.commit('addNotification', {
        type: 'failure',
        message: 'Failed to import ' + params.get('character') + ' (' + params.get('server') + '): ' + error
      });

      return;
    }).then(() => {
      if (errorEncountered) {
        return;
      }

      store.commit('addNotification', {
        type: 'success',
        message: params.get('character') + ' (' + params.get('server') + ') successfully imported.'
      })
    });
  }
}).$mount("#planner");
