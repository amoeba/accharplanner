import Constants from "../constants";
import DefaultCharacter from "./DefaultCharacter";
import firebase from "../firebase";

export default {
  shareBuild(state: any) {
    const db = firebase.firestore();

    db.collection("builds")
      .add(state.character)
      .then(doc => {
        state.commit("addNotification", {
          type: "success",
          message: "Successfully shared build!"
        });

        state.sharedBuild = doc.id;
      })
      .catch(error => {
        state.commit("addNotification", {
          type: "error",
          message: "Failed to share build: " + error + "."
        });
      });
  },
  loadRemoteBuild(state: any, build_id: string) {
    state.commit("addNotification", {
      type: "info",
      message: "Loading build from share link.. *portal sounds*."
    });

    const db = firebase.firestore();

    db.collection("builds")
      .doc(build_id)
      .get()
      .then(doc => {
        state.character = doc.data();

        state.commit("addNotification", {
          type: "success",
          message: "Successfully loaded build!"
        });
      })
      .catch(error => {
        state.commit("addNotification", {
          type: "error",
          message: "Failed to load build: " + error + "."
        });
      });
  },
  loadBuild(state: any, buildJSON: string) {
    state.character = JSON.parse(buildJSON);
  },
  saveBuild(state: any) {
    // Store locally
    state.builds.push({
      key: new Date().toISOString(),
      build: JSON.stringify(state.character)
    });

    // Also store to firebase
    const db = firebase.firestore();
    db.collection("builds").add(state.character);
  },
  deleteBuild(state: any, key: string) {
    for (let i = 0; i < state.builds.length; i++) {
      if (state.builds[i].key === key) {
        state.builds.splice(i, 1);
      }
    }
  },
  deleteAllBuilds(state: any) {
    state.builds = [];
  },
  reset(state: any) {
    state.character = DefaultCharacter();
  },
  import(state: any, character: any) {
    state.character = character;

    state.commit("addNotification", {
      type: "success",
      message: "Successfully imported build."
    });
  },
  updateName(state: any, value: string) {
    state.character.name = value;
  },
  updateLevel(state: any, value: number) {
    state.character.level = value;
  },
  updateRace(state: any, value: string) {
    state.character.race = value;

    // Also update experience augmentations to match new race
    if (
      value === Constants.RACE.ALUVIAN ||
      value === Constants.RACE.GHARUNDIM ||
      value === Constants.RACE.SHO ||
      value === Constants.RACE.VIAMONTIAN
    ) {
      state.character.augmentations.jack_of_all_trades.invested = 1;
      state.character.augmentations.infused_life_magic.invested = 0;
      state.character.augmentations.eye_of_the_remorseless.invested = 0;
    } else if (value === Constants.RACE.EMPYREAN) {
      state.character.augmentations.jack_of_all_trades.invested = 0;
      state.character.augmentations.infused_life_magic.invested = 1;
      state.character.augmentations.eye_of_the_remorseless.invested = 0;
    } else if (
      value === Constants.RACE.UMBRAEN ||
      value === Constants.RACE.PENUMBRAEN
    ) {
      state.character.augmentations.jack_of_all_trades.invested = 0;
      state.character.augmentations.infused_life_magic.invested = 0;
      state.character.augmentations.eye_of_the_remorseless.invested = 1;
    }
  },
  updateGender(state: any, value: string) {
    state.character.gender = value;
  },

  updateTimesEnlightened(state: any, value: number) {
    let actual = Number(value);

    if (isNaN(actual)) {
      actual = 0;
    } else if (actual < 0) {
      actual = 0;
    } else if (actual > 5) {
      actual = 5;
    }

    state.character.timesEnlightened = actual;
  },

  updateExtraSkillCredit(state: any, payload: any) {
    state.character.extraSkillCredits[payload.name] = payload.value;

    // Set luminance aura skill points to match
    if (payload.name === "luminance1" || payload.name === "luminance2") {
      state.character.luminance_auras.skill.invested =
        state.character.extraSkillCredits["luminance1"] +
        state.character.extraSkillCredits["luminance2"];
    }
  },

  updateAttributeCreation(state: any, payload: any) {
    let newVal = Number(payload.value);

    // Clamp to be from 10-100
    if (newVal > 100) {
      newVal = 100;
    } else if (newVal < 10) {
      newVal = 10
    }

    // Ensure we haven't spent more than 330 points and adjust other
    // attributes if needed
    let newSpent = Constants.ATTRIBUTES.map(a => {
      // Don't count old value for the attribute we're changing, use the new
      // value
      if (a === payload.name) {
        return newVal;
      } else {
        return state.character.attributes[a].creation;
      }
    }).reduce((a, v) => {
      return a + v;
    });

    // Use this to iterate over the other attributes we're lowering by name
    let names = Constants.ATTRIBUTES.filter(v => v !== payload.name);

    if (newSpent > 330) {
      let extra = newSpent - 330;

      for (var i = 0; i < extra; i++) {
        // Don't reduce attributes below 10. Adding 1 to `extra` ensures
        // we iterate long enough to lower everything as much as is needed
        if (state.character.attributes[names[i % 4]].creation <= 10) {
          extra += 1;
          continue;
        }

        state.character.attributes[names[i % 4]].creation -= 1;
      }
    }

    state.character.attributes[payload.name].creation = newVal;
  },

  updateAttributeInvested(state: any, payload: any) {
    state.character.attributes[payload.name].invested = Number(payload.value);
  },

  updateAttributeBuff(state: any, payload: any) {
    state.character.attributes[payload.name].buff = Number(payload.value);
  },

  updateAttributeCantrip(state: any, payload: any) {
    state.character.attributes[payload.name].cantrip = Number(payload.value);
  },

  updateVitalInvested(state: any, payload: any) {
    state.character.vitals[payload.name].invested = Number(payload.value);
  },

  updateVitalBuff(state: any, payload: any) {
    state.character.vitals[payload.name].buff = Number(payload.value);
  },

  updateVitalCantrip(state: any, payload: any) {
    state.character.vitals[payload.name].cantrip = Number(payload.value);
  },

  updateSkillInvested(state: any, payload: any) {
    state.character.skills[payload.name].invested = Number(payload.value);
  },

  updateSkillBuff(state: any, payload: any) {
    state.character.skills[payload.name].buff = Number(payload.value);
  },

  updateSkillCantrip(state: any, payload: any) {
    state.character.skills[payload.name].cantrip = Number(payload.value);
  },

  increaseTraining(state: any, skill: any) {
    const currentTraining = state.character.skills[skill].training;
    var newTraining = null;

    switch (currentTraining) {
      case Constants.TRAINING.UNUSABLE:
        newTraining = Constants.TRAINING.TRAINED;
        break;
      case Constants.TRAINING.UNTRAINED:
        newTraining = Constants.TRAINING.TRAINED;
        break;
      case Constants.TRAINING.TRAINED:
        newTraining = Constants.TRAINING.SPECIALIZED;
        break;
      default:
        return;
    }

    state.character.skills[skill].training = newTraining;
  },

  decreaseTraining(state: any, skill: string) {
    const currentTraining = state.character.skills[skill].training;
    var newTraining = null;

    switch (currentTraining) {
      case Constants.TRAINING.SPECIALIZED:
        newTraining = Constants.TRAINING.TRAINED;

        // Reduce max skill invested to 208 (max for trained) if over
        if (state.character.skills[skill].invested > 208) {
          state.character.skills[skill].invested = 208;
        }

        break;
      case Constants.TRAINING.TRAINED:
        newTraining = Constants.UNTRAINED_STATE[skill];
        state.character.skills[skill].invested = 0;

        break;
      default:
        return;
    }

    state.character.skills[skill].training = newTraining;
  },

  // Augmentations
  updateAugmentationInvested(state: any, payload: any) {
    state.character.augmentations[payload.name].invested = Number(payload.value);

    /* Update skills */

    if (payload.name === "jibrils_essence") {
      state.character.skills.armor_tinkering.training = Constants.TRAINING.SPECIALIZED;
    } else if (payload.name === "yoshis_essence") {
      state.character.skills.item_tinkering.training = Constants.TRAINING.SPECIALIZED;
    } else if (payload.name === "celdiseths_essence") {
      state.character.skills.magic_item_tinkering.training = Constants.TRAINING.SPECIALIZED;
    } else if (payload.name === "kogas_essence") {
      state.character.skills.weapon_tinkering.training = Constants.TRAINING.SPECIALIZED;
    } else if (payload.name === "ciandras_essence") {
      state.character.skills.salvaging.training = Constants.TRAINING.SPECIALIZED;
    }
  },

  changeAllAugmentationInvestment(state: any, value: number) {
    Constants.AUGMENTATIONS.forEach((aug_name: string) => {
      state.character.augmentations[aug_name].invested = (value == 1 ? Constants.AUGMENTATION_MAX_USES[aug_name] : 0);
    });
  },

  // Luminance Auras
  updateLuminanceAuraInvested(state: any, payload: any) {
    state.character.luminance_auras[payload.name].invested = Number(payload.value);
  },

  changeAllLuminanceAuraInvestment(state: any, value: any) {
    Constants.LUMINANCE_AURAS.forEach(aura_name => {
      state.character.luminance_auras[aura_name].invested = (value == 1 ? Constants.LUMINANCE_AURA_MAX_USES[aura_name] : 0);
    });
  },

  changeAllInvestment(state: any, invested: string) {
    Constants.ATTRIBUTES.forEach(a => {
      let newval = Number(invested);
      newval = newval > 190 ? 190 : newval;

      state.character.attributes[a].invested = newval;
    });

    Constants.VITALS.forEach(a => {
      let newval = Number(invested);
      newval = newval > 196 ? 196 : newval;

      state.character.vitals[a].invested = newval;
    });

    Constants.SKILLS.forEach(skill => {
      let newval = Number(invested);

      if (
        state.character.skills[skill].training == Constants.TRAINING.SPECIALIZED
      ) {
        state.character.skills[skill].invested = newval > 226 ? 226 : newval;
      } else if (
        state.character.skills[skill].training == Constants.TRAINING.TRAINED
      ) {
        state.character.skills[skill].invested = newval > 208 ? 208 : newval;
      }
    });
  },

  changeAllAttributeInvestment(state: any, invested: string) {
    Constants.ATTRIBUTES.forEach(a => {
      let newval = Number(invested);

      state.character.attributes[a].invested = newval;
    });
  },

  changeAllVitalInvestment(state: any, invested: string) {
    Constants.VITALS.forEach(a => {
      let newval = Number(invested);

      state.character.vitals[a].invested = newval;
    });
  },

  changeAllSkillInvestment(state: any, invested: string) {
    Constants.SKILLS.forEach(skill => {
      let newval = Number(invested);

      if (
        state.character.skills[skill].training == Constants.TRAINING.TRAINED
      ) {
        newval = newval > 208 ? 208 : newval;
      }

      state.character.skills[skill].invested = newval;
    });
  },

  changeAllBuffs(state: any, buff: string) {
    Constants.ATTRIBUTES.forEach(attribute => {
      state.character.attributes[attribute].buff = Number(buff);
    });

    Constants.VITALS.forEach(vital => {
      state.character.vitals[vital].buff = Number(buff);
    });

    Constants.SKILLS.forEach(skill => {
      state.character.skills[skill].buff = Number(buff);
    });
  },

  changeAllAttributeBuffs(state: any, buff: string) {
    Constants.ATTRIBUTES.forEach(attribute => {
      state.character.attributes[attribute].buff = Number(buff);
    });
  },

  changeAllVitalBuffs(state: any, buff: string) {
    Constants.VITALS.forEach(vital => {
      state.character.vitals[vital].buff = Number(buff);
    });
  },

  changeAllSkillBuffs(state: any, buff: string) {
    Constants.SKILLS.forEach(skill => {
      state.character.skills[skill].buff = Number(buff);
    });
  },

  // Cantrips
  changeAllCantrips(state: any, cantrip: string) {
    Constants.ATTRIBUTES.forEach(attribute => {
      state.character.attributes[attribute].cantrip = Number(cantrip);
    });

    Constants.VITALS.forEach(vital => {
      state.character.vitals[vital].cantrip = Number(cantrip);
    });

    Constants.SKILLS.forEach(skill => {
      state.character.skills[skill].cantrip = Number(cantrip);
    });
  },

  changeAllAttributeCantrips(state: any, cantrip: string) {
    Constants.ATTRIBUTES.forEach(attribute => {
      state.character.attributes[attribute].cantrip = Number(cantrip);
    });
  },

  changeAllVitalCantrips(state: any, cantrip: string) {
    Constants.VITALS.forEach(vital => {
      state.character.vitals[vital].cantrip = Number(cantrip);
    });
  },

  changeAllSkillCantrips(state: any, cantrip: string) {
    Constants.SKILLS.forEach(skill => {
      state.character.skills[skill].cantrip = Number(cantrip);
    });
  },

  // Notifications
  clearAllNotifications(state: any) {
    state.notifications = [];
  },

  addNotification(state: any, payload: any) {
    let notification_id = Date.now();

    state.notifications.push({
      id: notification_id,
      type: payload.type,
      message: payload.message
    });

    setTimeout(() => {
      for (let i = 0; i < state.notifications.length; i++) {
        if (state.notifications[i].id === notification_id) {
          state.notifications.splice(i, 1);
        }
      }
    }, 3000);
  },

  removeNotification(state: any, id: number) {
    for (let i = 0; i < state.notifications.length; i++) {
      if (state.notifications[i].id === id) {
        state.notifications.splice(i, 1);
      }
    }
  }
};
