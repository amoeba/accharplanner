import {
  AUGMENTATIONS,
  AUGMENTATION_MAX_USES,
  LUMINANCE_AURA_MAX_USES,
  LUMINANCE_AURAS,
  UNTRAINED_STATE } from "../constants";
import {
  State,
  Race,
  Gender,
  Attribute,
  Vital,
  Skill,
  Training,
  LuminanceAura,
  Augmentation
} from "../types";
import DefaultCharacter from "./DefaultCharacter";
import firebase from "../firebase";
import "firebase/firestore";

export default {
  loadBuild(state: State, buildJSON: string) {
    state.character = JSON.parse(buildJSON);
  },
  saveBuild(state: State) {
    // Store locally
    state.savedBuilds.push({
      key: new Date().toISOString(),
      character: JSON.stringify(state.character)
    });

    // Also store to firebase
    const db = firebase.firestore();
    db.collection("builds").add(state.character);
  },
  deleteBuild(state: State, key: string) {
    for (let i = 0; i < state.savedBuilds.length; i++) {
      if (state.savedBuilds[i].key === key) {
        state.savedBuilds.splice(i, 1);
      }
    }
  },
  deleteAllBuilds(state: State) {
    state.savedBuilds = [];
  },
  reset(state: State) {
    state.character = DefaultCharacter();
  },
  updateName(state: State, value: string) {
    state.character.name = value;
  },
  updateLevel(state: State, value: number) {
    state.character.level = value;
  },
  updateRace(state: State, value: Race) {
    state.character.race = value;

    // Also update experience augmentations to match new race
    if (
      value === Race.Aluvian ||
      value === Race["Gharu'ndim"] ||
      value === Race.Sho ||
      value === Race.Viamontian
    ) {
      state.character.augmentations.jack_of_all_trades.invested = 1;
      state.character.augmentations.infused_life_magic.invested = 0;
      state.character.augmentations.eye_of_the_remorseless.invested = 0;
      state.character.augmentations.might_of_the_seventh_mule.invested = 0;
      state.character.augmentations.hand_of_the_remorseless.invested = 1;
    } else if (value === Race.Empyrean) {
      state.character.augmentations.jack_of_all_trades.invested = 0;
      state.character.augmentations.infused_life_magic.invested = 1;
      state.character.augmentations.eye_of_the_remorseless.invested = 0;
      state.character.augmentations.might_of_the_seventh_mule.invested = 0;
      state.character.augmentations.hand_of_the_remorseless.invested = 1;
    } else if (
      value === Race.Umbraen ||
      value === Race.Penumbraen
    ) {
      state.character.augmentations.jack_of_all_trades.invested = 0;
      state.character.augmentations.infused_life_magic.invested = 0;
      state.character.augmentations.eye_of_the_remorseless.invested = 1;
      state.character.augmentations.might_of_the_seventh_mule.invested = 0;
      state.character.augmentations.hand_of_the_remorseless.invested = 1;
    } else if (
      value === Race.Lugian
    ) {
      state.character.augmentations.jack_of_all_trades.invested = 0;
      state.character.augmentations.infused_life_magic.invested = 0;
      state.character.augmentations.eye_of_the_remorseless.invested = 0;
      state.character.augmentations.might_of_the_seventh_mule.invested = 1;
      state.character.augmentations.hand_of_the_remorseless.invested = 0;
    } else if (
      value === Race.Tumerok
    ) {
      state.character.augmentations.jack_of_all_trades.invested = 0;
      state.character.augmentations.infused_life_magic.invested = 0;
      state.character.augmentations.eye_of_the_remorseless.invested = 0;
      state.character.augmentations.might_of_the_seventh_mule.invested = 0;
      state.character.augmentations.hand_of_the_remorseless.invested = 1;
    }
  },
  updateGender(state: State, value: Gender) {
    state.character.gender = value;
  },

  updateTimesEnlightened(state: State, value: number) {
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

  updateExtraSkillCredit(state: State, payload: any) {
    state.character.extraSkillCredits[payload.name] = payload.value;

    // Set luminance aura skill points to match
    if (payload.name === "luminance1" || payload.name === "luminance2") {
      state.character.luminance_auras.skill.invested =
        state.character.extraSkillCredits["luminance1"] +
        state.character.extraSkillCredits["luminance2"];
    }
  },

  updateAttributeCreation(state: State, payload: any) {
    let newVal = Number(payload.value);

    // Clamp to be from 10-100
    if (newVal > 100) {
      newVal = 100;
    } else if (newVal < 10) {
      newVal = 10
    }

    // Ensure we haven't spent more than 330 points and adjust other
    // attributes if needed
    let newSpent = Object.keys(Attribute).map(a => {
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
    let names = Object.keys(Attribute).filter(v => v !== payload.name);

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

  updateAttributeInvested(state: State, payload: any) {
    state.character.attributes[payload.name].invested = Number(payload.value);
  },

  updateAttributeBuff(state: State, payload: any) {
    state.character.attributes[payload.name].buff = Number(payload.value);
  },

  updateAttributeCantrip(state: State, payload: any) {
    state.character.attributes[payload.name].cantrip = Number(payload.value);
  },

  updateVitalInvested(state: State, payload: any) {
    state.character.vitals[payload.name].invested = Number(payload.value);
  },

  updateVitalBuff(state: State, payload: any) {
    state.character.vitals[payload.name].buff = Number(payload.value);
  },

  updateVitalCantrip(state: State, payload: any) {
    state.character.vitals[payload.name].cantrip = Number(payload.value);
  },

  updateSkillInvested(state: State, payload: { name: string, value: number}) {
    state.character.skills[payload.name].invested = payload.value;
  },

  updateSkillBuff(state: State, payload: any) {
    state.character.skills[payload.name].buff = Number(payload.value);
  },

  updateSkillCantrip(state: State, payload: any) {
    state.character.skills[payload.name].cantrip = Number(payload.value);
  },

  increaseTraining(state: State, skill: Skill) {
    const currentTraining = state.character.skills[skill].training;
    var newTraining = null;

    switch (currentTraining) {
      case Training.UNUSABLE:
        newTraining = Training.TRAINED;
        break;
      case Training.UNTRAINED:
        newTraining = Training.TRAINED;
        break;
      case Training.TRAINED:
        newTraining = Training.SPECIALIZED;
        break;
      default:
        return;
    }

    state.character.skills[skill].training = newTraining;
  },

  decreaseTraining(state: State, skill: Skill) {
    const currentTraining = state.character.skills[skill].training;
    var newTraining = null;

    switch (currentTraining) {
      case Training.SPECIALIZED:
        newTraining = Training.TRAINED;

        // Reduce max skill invested to 208 (max for trained) if over
        if (state.character.skills[skill].invested > 208) {
          state.character.skills[skill].invested = 208;
        }

        break;
      case Training.TRAINED:
        newTraining = UNTRAINED_STATE[skill];
        state.character.skills[skill].invested = 0;

        break;
      default:
        return;
    }

    state.character.skills[skill].training = newTraining;
  },

  // Augmentations
  updateAugmentationInvested(state: State, payload: any) {
    state.character.augmentations[payload.name].invested = Number(payload.value);

    /* Update skills */

    if (payload.name === "jibrils_essence") {
      state.character.skills.armor_tinkering.training = Training.SPECIALIZED;
    } else if (payload.name === "yoshis_essence") {
      state.character.skills.item_tinkering.training = Training.SPECIALIZED;
    } else if (payload.name === "celdiseths_essence") {
      state.character.skills.magic_item_tinkering.training = Training.SPECIALIZED;
    } else if (payload.name === "kogas_essence") {
      state.character.skills.weapon_tinkering.training = Training.SPECIALIZED;
    } else if (payload.name === "ciandras_essence") {
      state.character.skills.salvaging.training = Training.SPECIALIZED;
    }
  },

  changeAllAugmentationInvestment(state: State, value: number) {
    AUGMENTATIONS.forEach((aug_name: string) => {
      state.character.augmentations[aug_name].invested = (value == 1 ? AUGMENTATION_MAX_USES[aug_name] : 0);
    });
  },

  // Luminance Auras
  updateLuminanceAuraInvested(state: State, payload: any) {
    state.character.luminance_auras[payload.name].invested = Number(payload.value);
  },

  changeAllLuminanceAuraInvestment(state: State, value: any) {
    LUMINANCE_AURAS.forEach((aura_name: string) => {
      state.character.luminance_auras[aura_name].invested = (value == 1 ? LUMINANCE_AURA_MAX_USES[aura_name] : 0);
    });
  },

  changeAllInvestment(state: State, invested: string) {
    Object.keys(Attribute).forEach(a => {
      let newval = Number(invested);
      newval = newval > 190 ? 190 : newval;

      state.character.attributes[a].invested = newval;
    });

    Object.keys(Vital).forEach(a => {
      let newval = Number(invested);
      newval = newval > 196 ? 196 : newval;

      state.character.vitals[a].invested = newval;
    });

    Object.keys(Skill).forEach(skill => {
      let newval = Number(invested);

      if (
        state.character.skills[skill].training == Training.SPECIALIZED
      ) {
        state.character.skills[skill].invested = newval > 226 ? 226 : newval;
      } else if (
        state.character.skills[skill].training == Training.TRAINED
      ) {
        state.character.skills[skill].invested = newval > 208 ? 208 : newval;
      }
    });
  },

  changeAllAttributeInvestment(state: State, invested: string) {
    Object.keys(Attribute).forEach(a => {
      let newval = Number(invested);

      state.character.attributes[a].invested = newval;
    });
  },

  changeAllVitalInvestment(state: State, invested: string) {
    Object.keys(Vital).forEach(a => {
      let newval = Number(invested);

      state.character.vitals[a].invested = newval;
    });
  },

  changeAllSkillInvestment(state: State, invested: string) {
    Object.keys(Skill).forEach(skill => {
      let newval = Number(invested);

      if (
        state.character.skills[skill].training == Training.TRAINED
      ) {
        newval = newval > 208 ? 208 : newval;
      }

      state.character.skills[skill].invested = newval;
    });
  },

  changeAllBuffs(state: State, buff: string) {
    Object.keys(Attribute).forEach(attribute => {
      state.character.attributes[attribute].buff = Number(buff);
    });

    Object.keys(Vital).forEach(vital => {
      state.character.vitals[vital].buff = Number(buff);
    });

    Object.keys(Skill).forEach(skill => {
      state.character.skills[skill].buff = Number(buff);
    });
  },

  changeAllAttributeBuffs(state: State, buff: string) {
    Object.keys(Attribute).forEach(attribute => {
      state.character.attributes[attribute].buff = Number(buff);
    });
  },

  changeAllVitalBuffs(state: State, buff: string) {
    Object.keys(Vital).forEach(vital => {
      state.character.vitals[vital].buff = Number(buff);
    });
  },

  changeAllSkillBuffs(state: State, buff: string) {
    Object.keys(Skill).forEach(skill => {
      state.character.skills[skill].buff = Number(buff);
    });
  },

  // Cantrips
  changeAllCantrips(state: State, cantrip: string) {
    Object.keys(Attribute).forEach(attribute => {
      state.character.attributes[attribute].cantrip = Number(cantrip);
    });

    Object.keys(Vital).forEach(vital => {
      state.character.vitals[vital].cantrip = Number(cantrip);
    });

    Object.keys(Skill).forEach(skill => {
      state.character.skills[skill].cantrip = Number(cantrip);
    });
  },

  changeAllAttributeCantrips(state: State, cantrip: string) {
    Object.keys(Attribute).forEach(attribute => {
      state.character.attributes[attribute].cantrip = Number(cantrip);
    });
  },

  changeAllVitalCantrips(state: State, cantrip: string) {
    Object.keys(Vital).forEach(vital => {
      state.character.vitals[vital].cantrip = Number(cantrip);
    });
  },

  changeAllSkillCantrips(state: State, cantrip: string) {
    Object.keys(Skill).forEach(skill => {
      state.character.skills[skill].cantrip = Number(cantrip);
    });
  },

  // Notifications
  clearAllNotifications(state: State) {
    state.notifications = [];
  },

  addNotification(state: State, payload: any) {
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

  removeNotification(state: State, id: number) {
    for (let i = 0; i < state.notifications.length; i++) {
      if (state.notifications[i].id === id) {
        state.notifications.splice(i, 1);
      }
    }
  }
};
