import Constants from "../constants";
import DefaultCharacter from "./DefaultCharacter";

export default {
  loadBuild(state, build) {
    state.character = JSON.parse(build);
  },
  saveBuild(state) {
    state.builds.push({
      key: new Date().toISOString(),
      build: JSON.stringify(state.character)
    });
  },
  deleteBuild(state, build) {
    for (let i = 0; i < state.builds.length; i++) {
      if (state.builds[i].key === build) {
        state.builds.splice(i, 1);
      }
    }
  },
  deleteAllBuilds(state) {
    state.builds = [];
  },
  reset(state) {
    state.character = DefaultCharacter();
  },
  updateName(state, value) {
    state.character.name = value;
  },
  updateLevel(state, value) {
    state.character.level = value;
  },
  updateRace(state, value) {
    state.character.race = value;

    // Also update experience augmentations to match new race
    if (
      value === Constants.RACE.ALUVIAN ||
      value === Constants.RACE.GHARUNDIM ||
      value === Constants.RACE.SHO||
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
  updateGender(state, value) {
    state.character.gender = value;
  },

  updateTimesEnlightened(state, value) {
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

  updateExtraSkillCredit(state, payload) {
    state.character.extraSkillCredits[payload.name] = payload.value;

    // Set luminance aura skill points to match
    if (payload.name === "luminance1" || payload.name === "luminance2") {
      state.character.luminance_auras.skill.invested =
        state.character.extraSkillCredits["luminance1"] +
        state.character.extraSkillCredits["luminance2"];
    }
  },

  updateAttributeCreation(state, payload) {
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

  updateAttributeInvested(state, payload) {
    state.character.attributes[payload.name].invested = Number(payload.value);
  },

  updateAttributeBuff(state, payload) {
    state.character.attributes[payload.name].buff = Number(payload.value);
  },

  updateAttributeCantrip(state, payload) {
    state.character.attributes[payload.name].cantrip = Number(payload.value);
  },

  updateVitalInvested(state, payload) {
    state.character.vitals[payload.name].invested = Number(payload.value);
  },

  updateVitalBuff(state, payload) {
    state.character.vitals[payload.name].buff = Number(payload.value);
  },

  updateVitalCantrip(state, payload) {
    state.character.vitals[payload.name].cantrip = Number(payload.value);
  },

  updateSkillInvested(state, payload) {
    state.character.skills[payload.name].invested = Number(payload.value);
  },

  updateSkillBuff(state, payload) {
    state.character.skills[payload.name].buff = Number(payload.value);
  },

  updateSkillCantrip(state, payload) {
    state.character.skills[payload.name].cantrip = Number(payload.value);
  },

  increaseTraining(state, skill) {
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

  decreaseTraining(state, skill) {
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
  updateAugmentationInvested(state, payload) {
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

  changeAllAugmentationInvestment(state, value) {
    Constants.AUGMENTATIONS.forEach(aug_name => {
      state.character.augmentations[aug_name].invested = (value == 1 ? Constants.AUGMENTATION_MAX_USES[aug_name] : 0);
    });
  },

  // Luminance Auras
  updateLuminanceAuraInvested(state, payload) {
    state.character.luminance_auras[payload.name].invested = Number(payload.value);
  },

  changeAllLuminanceAuraInvestment(state, value) {
    Constants.LUMINANCE_AURAS.forEach(aura_name => {
      state.character.luminance_auras[aura_name].invested = (value == 1 ? Constants.LUMINANCE_AURA_MAX_USES[aura_name] : 0);
    });
  },

  changeAllInvestment(state, invested) {
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

  changeAllAttributeInvestment(state, invested) {
    Constants.ATTRIBUTES.forEach(a => {
      let newval = Number(invested);

      state.character.attributes[a].invested = newval;
    });
  },

  changeAllVitalInvestment(state, invested) {
    Constants.VITALS.forEach(a => {
      let newval = Number(invested);

      state.character.vitals[a].invested = newval;
    });
  },

  changeAllSkillInvestment(state, invested) {
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

  changeAllBuffs(state, buff) {
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

  changeAllAttributeBuffs(state, buff) {
    Constants.ATTRIBUTES.forEach(attribute => {
      state.character.attributes[attribute].buff = Number(buff);
    });
  },

  changeAllVitalBuffs(state, buff) {
    Constants.VITALS.forEach(vital => {
      state.character.vitals[vital].buff = Number(buff);
    });
  },

  changeAllSkillBuffs(state, buff) {
    Constants.SKILLS.forEach(skill => {
      state.character.skills[skill].buff = Number(buff);
    });
  },

  // Cantrips
  changeAllCantrips(state, cantrip) {
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

  changeAllAttributeCantrips(state, cantrip) {
    Constants.ATTRIBUTES.forEach(attribute => {
      state.character.attributes[attribute].cantrip = Number(cantrip);
    });
  },

  changeAllVitalCantrips(state, cantrip) {
    Constants.VITALS.forEach(vital => {
      state.character.vitals[vital].cantrip = Number(cantrip);
    });
  },

  changeAllSkillCantrips(state, cantrip) {
    Constants.SKILLS.forEach(skill => {
      state.character.skills[skill].cantrip = Number(cantrip);
    });
  },

  // Notifications
  clearAllNotifications(state) {
    state.notifications = [];
  },

  addNotification(state, payload) {
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

  removeNotification(state, id) {
    for (let i = 0; i < state.notifications.length; i++) {
      if (state.notifications[i].id === id) {
        state.notifications.splice(i, 1);
      }
    }
  }
};
