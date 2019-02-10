import Vue from "vue";
import Vuex from "vuex";
import Helpers from "./helpers";
import Constants from "./constants";

Vue.use(Vuex);

// Automatically persist state to localStorage
// import VuexPersistence from 'vuex-persist'
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// });

export default new Vuex.Store({
  state: {
    character: {
      level: 5,
      timesEnlightened: 0,
      extraSkillCredits: {
        railrea: false,
        oswald: false,
        luminance1: false,
        luminance2: false
      },
      attributes: {
        strength: {
          creation: 10,
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        endurance: {
          creation: 10,
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        coordination: {
          creation: 10,
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        quickness: {
          creation: 10,
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        focus: {
          creation: 10,
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        self: {
          creation: 10,
          invested: 0,
          buff: 0,
          cantrip: 0
        }
      },
      vitals: {
        health: {
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        stamina: {
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        mana: {
          invested: 0,
          buff: 0,
          cantrip: 0
        }
      },
      skills: {
        alchemy: {
          training: Constants.UNTRAINED_STATE["alchemy"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        arcane_lore: {
          training: Constants.UNTRAINED_STATE["arcane_lore"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        armor_tinkering: {
          training: Constants.UNTRAINED_STATE["armor_tinkering"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        assess_creature: {
          training: Constants.UNTRAINED_STATE["assess_creature"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        assess_person: {
          training: Constants.UNTRAINED_STATE["assess_person"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        cooking: {
          training: Constants.UNTRAINED_STATE["cooking"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        creature_enchantment: {
          training: Constants.UNTRAINED_STATE["creature_enchantment"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        deception: {
          training: Constants.UNTRAINED_STATE["deception"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        dual_wield: {
          training: Constants.UNTRAINED_STATE["dual_wield"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        dirty_fighting: {
          training: Constants.UNTRAINED_STATE["dirty_fighting"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        finesse_weapons: {
          training: Constants.UNTRAINED_STATE["finesse_weapons"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        fletching: {
          training: Constants.UNTRAINED_STATE["fletching"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        healing: {
          training: Constants.UNTRAINED_STATE["healing"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        heavy_weapons: {
          training: Constants.UNTRAINED_STATE["heavy_weapons"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        item_enchantment: {
          training: Constants.UNTRAINED_STATE["item_enchantment"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        item_tinkering: {
          training: Constants.UNTRAINED_STATE["item_tinkering"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        jump: {
          training: Constants.UNTRAINED_STATE["jump"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        leadership: {
          training: Constants.UNTRAINED_STATE["leadership"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        life_magic: {
          training: Constants.UNTRAINED_STATE["life_magic"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        light_weapons: {
          training: Constants.UNTRAINED_STATE["light_weapons"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        lockpick: {
          training: Constants.UNTRAINED_STATE["lockpick"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        loyalty: {
          training: Constants.UNTRAINED_STATE["loyalty"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        magic_defense: {
          training: Constants.UNTRAINED_STATE["magic_defense"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        magic_item_tinkering: {
          training: Constants.UNTRAINED_STATE["magic_item_tinkering"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        mana_conversion: {
          training: Constants.UNTRAINED_STATE["mana_conversion"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        melee_defense: {
          training: Constants.UNTRAINED_STATE["melee_defense"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        missile_defense: {
          training: Constants.UNTRAINED_STATE["missile_defense"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        missile_weapons: {
          training: Constants.UNTRAINED_STATE["missile_weapons"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        recklessness: {
          training: Constants.UNTRAINED_STATE["recklessness"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        run: {
          training: Constants.UNTRAINED_STATE["run"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        salvaging: {
          training: Constants.UNTRAINED_STATE["salvaging"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        shield: {
          training: Constants.UNTRAINED_STATE["shield"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        sneak_attack: {
          training: Constants.UNTRAINED_STATE["sneak_attack"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        summoning: {
          training: Constants.UNTRAINED_STATE["summoning"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        two_handed_combat: {
          training: Constants.UNTRAINED_STATE["two_handed_combat"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        void_magic: {
          training: Constants.UNTRAINED_STATE["void_magic"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        war_magic: {
          training: Constants.UNTRAINED_STATE["war_magic"],
          invested: 0,
          buff: 0,
          cantrip: 0
        },
        weapon_tinkering: {
          training: Constants.UNTRAINED_STATE["weapon_tinkering"],
          invested: 0,
          buff: 0,
          cantrip: 0
        }
      }
    }
  },
  getters: {
    // General
    exportedCharacter: state => {
      return JSON.stringify(state, null, 4);
    },

    totalXPEarned: (state, getters) => {
      let cost = 0;

      cost += Constants.COST_LEVEL[state.character.level];

      return cost;
    },

    totalXPEarned: (state, getters) => {
      let cost = 0;

      cost += Constants.COST_LEVEL[state.character.level];
      cost += state.character.timesEnlightened * Constants.COST_LEVEL["275"];

      return cost;
    },

    totalXPInvested: (state, getters) => {
      let cost = 0;

      Constants.ATTRIBUTES.forEach(a => {
        cost +=
          Constants.COST_ATTRIBUTE[state.character.attributes[a].invested];
      });

      Constants.VITALS.forEach(v => {
        cost += Constants.COST_VITAL[state.character.vitals[v].invested];
      });

      getters.specializedSkills.forEach(s => {
        cost +=
          Constants.COST_SKILL_SPECIALIZED[state.character.skills[s].invested];
      });

      getters.trainedSkills.forEach(s => {
        cost +=
          Constants.COST_SKILL_TRAINED[state.character.skills[s].invested];
      });

      cost += state.character.timesEnlightened * Constants.COST_LEVEL["275"];

      return cost;
    },

    requiredLevel: (state, getters) => {
      for (var e = 0; e < 6; e++) {
        for (var i = 1; i <= 275; i++) {
          if (
            getters.totalXPInvested <=
            Constants.COST_LEVEL[i] + e * Constants.COST_LEVEL[i]
          ) {
            return i;
          }
        }
      }

      // We didn't find a solution which means we've Enlightened
      return -1;
    },

    skillPointsAvailable: state => {
      return (
        Constants.SKILL_POINTS_AT_LEVEL[state.character.level] +
        (state.character.extraSkillCredits.railrea ? 1 : 0) +
        (state.character.extraSkillCredits.oswald ? 1 : 0) +
        (state.character.extraSkillCredits.luminance1 ? 1 : 0) +
        (state.character.extraSkillCredits.luminance2 ? 1 : 0)
      );
    },

    skillPointsSpent: state => {
      let cost = 0;

      Constants.SKILLS.forEach(skill => {
        let training = state.character.skills[skill].training;

        if (
          training == Constants.TRAINING.SPECIALIZED ||
          training == Constants.TRAINING.TRAINED
        ) {
          cost += Constants.COST_SKILL_POINTS[skill][training];
        }
      });

      return cost;
    },

    augmentationsSpent: state => {
      let cost = 0;

      Object.keys(Constants.SPEC_COSTS_AUG).forEach(skill => {
        if (
          state.character.skills[skill] &&
          state.character.skills[skill].training ==
            Constants.TRAINING.SPECIALIZED &&
          Constants.SPEC_COSTS_AUG[skill]
        ) {
          cost += 1;
        }
      });

      return cost;
    },

    totalLuminanceXPSpent: state => {
      let cost = 0;

      Object.keys(Constants.SPEC_COSTS_AUG).forEach(skill => {
        if (
          state.character.skills[skill] &&
          state.character.skills[skill].training ==
            Constants.TRAINING.SPECIALIZED &&
          Constants.SPEC_COSTS_AUG[skill]
        ) {
          cost += 1000000000;
        }
      });

      // Enlightenment requires you get all lum auras (20mil xp)
      // TODO: Track auras and this together
      if (state.character.timesEnlightened > 0) {
        cost += 20000000;
      }

      return cost;
    },

    specializedSkillPointsSpent: (state, getters) => {
      let cost = 0;

      getters.specializedSkills.forEach(skill => {
        cost +=
          Constants.COST_SKILL_POINTS[skill][
            state.character.skills[skill].training
          ];
      });

      return cost;
    },

    // Attributes
    attributePointsSpent: state => {
      let spent = 0;

      Constants.ATTRIBUTES.forEach(attribute => {
        spent += state.character.attributes[attribute].creation;
      });

      return spent;
    },
    strengthBase: state => {
      return (
        state.character.attributes.strength.creation +
        state.character.attributes.strength.invested
      );
    },
    strengthBuffed: (state, getters) => {
      return (
        getters.strengthBase +
        Helpers.buffBonus(state.character.attributes.strength.buff) +
        Helpers.cantripBonus(state.character.attributes.strength.cantrip)
      );
    },
    enduranceBase: state => {
      return (
        state.character.attributes.endurance.creation +
        state.character.attributes.endurance.invested
      );
    },
    enduranceBuffed: (state, getters) => {
      return (
        getters.enduranceBase +
        Helpers.buffBonus(state.character.attributes.endurance.buff) +
        Helpers.cantripBonus(state.character.attributes.endurance.cantrip)
      );
    },
    coordinationBase: state => {
      return (
        state.character.attributes.coordination.creation +
        state.character.attributes.coordination.invested
      );
    },
    coordinationBuffed: (state, getters) => {
      return (
        getters.coordinationBase +
        Helpers.buffBonus(state.character.attributes.coordination.buff) +
        Helpers.cantripBonus(state.character.attributes.coordination.cantrip)
      );
    },
    quicknessBase: state => {
      return (
        state.character.attributes.quickness.creation +
        state.character.attributes.quickness.invested
      );
    },
    quicknessBuffed: (state, getters) => {
      return (
        getters.quicknessBase +
        Helpers.buffBonus(state.character.attributes.quickness.buff) +
        Helpers.cantripBonus(state.character.attributes.quickness.cantrip)
      );
    },
    focusBase: state => {
      return (
        state.character.attributes.focus.creation +
        state.character.attributes.focus.invested
      );
    },
    focusBuffed: (state, getters) => {
      return (
        getters.focusBase +
        Helpers.buffBonus(state.character.attributes.focus.buff) +
        Helpers.cantripBonus(state.character.attributes.focus.cantrip)
      );
    },
    selfBase: state => {
      return (
        state.character.attributes.self.creation +
        state.character.attributes.self.invested
      );
    },
    selfBuffed: (state, getters) => {
      return (
        getters.selfBase +
        Helpers.buffBonus(state.character.attributes.self.buff) +
        Helpers.cantripBonus(state.character.attributes.self.cantrip)
      );
    },

    // Vitals
    healthCreation: state => {
      return Math.round(state.character.attributes.endurance.creation / 2);
    },
    healthBase: (state, getters) => {
      return (
        Math.round(getters.enduranceBase / 2) +
        state.character.vitals.health.invested +
        Helpers.cantripBonus(state.character.vitals.health.cantrip)
      );
    },
    healthBuffed: (state, getters) => {
      return (
        getters.healthBase +
        Math.round(Helpers.buffBonus(state.character.vitals.health.buff) / 2)
      );
    },
    staminaCreation: state => {
      return state.character.attributes.endurance.creation;
    },
    staminaBase: (state, getters) => {
      return (
        getters.enduranceBase +
        state.character.vitals.stamina.invested +
        Helpers.cantripBonus(state.character.vitals.stamina.cantrip)
      );
    },
    staminaBuffed: (state, getters) => {
      return (
        getters.staminaBase +
        Helpers.buffBonus(state.character.vitals.stamina.buff)
      );
    },
    manaCreation: state => {
      return state.character.attributes.self.creation;
    },
    manaBase: (state, getters) => {
      return getters.selfBase + state.character.vitals.mana.invested;
    },
    manaBuffed: (state, getters) => {
      return (
        getters.manaBase +
        Helpers.buffBonus(state.character.vitals.mana.buff) +
        Helpers.cantripBonus(state.character.vitals.mana.cantrip)
      );
    },

    // Skills
    alchemyBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.focusBase) / 3) +
        Helpers.trainingBonus(state.character.skills.alchemy.training) +
        state.character.timesEnlightened +
        state.character.skills.alchemy.invested
      );
    },
    alchemyBuffed: (state, getters) => {
      return (
        getters.alchemyBase +
        Helpers.buffBonus(state.character.skills.alchemy.buff) +
        Helpers.cantripBonus(state.character.skills.alchemy.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.focus.buff)) /
            3
        )
      );
    },
    arcane_loreBase: (state, getters) => {
      return (
        Math.round(getters.focusBase / 3) +
        Helpers.trainingBonus(state.character.skills.arcane_lore.training) +
        state.character.timesEnlightened +
        state.character.skills.arcane_lore.invested
      );
    },
    arcane_loreBuffed: (state, getters) => {
      return (
        getters.arcane_loreBase +
        Helpers.buffBonus(state.character.skills.arcane_lore.buff) +
        Helpers.cantripBonus(state.character.skills.arcane_lore.cantrip) +
        Math.round(Helpers.buffBonus(state.character.attributes.focus.buff) / 3)
      );
    },
    armor_tinkeringBase: (state, getters) => {
      return (
        Math.round((getters.enduranceBase + getters.focusBase) / 2) +
        Helpers.trainingBonus(state.character.skills.armor_tinkering.training) +
        state.character.timesEnlightened +
        state.character.skills.armor_tinkering.invested
      );
    },
    armor_tinkeringBuffed: (state, getters) => {
      return (
        getters.armor_tinkeringBase +
        Helpers.buffBonus(state.character.skills.armor_tinkering.buff) +
        Helpers.cantripBonus(state.character.skills.armor_tinkering.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.endurance.buff) +
            Helpers.buffBonus(state.character.attributes.focus.buff)) /
            2
        )
      );
    },
    assess_creatureBase: (state, getters) => {
      return (
        Helpers.trainingBonus(state.character.skills.assess_creature.training) +
        state.character.timesEnlightened +
        state.character.skills.assess_creature.invested
      );
    },
    assess_creatureBuffed: (state, getters) => {
      return (
        getters.assess_creatureBase +
        Helpers.buffBonus(state.character.skills.assess_creature.buff) +
        Helpers.cantripBonus(state.character.skills.assess_creature.cantrip)
      );
    },
    assess_personBase: (state, getters) => {
      return (
        Helpers.trainingBonus(state.character.skills.assess_person.training) +
        state.character.timesEnlightened +
        state.character.skills.assess_person.invested
      );
    },
    assess_personBuffed: (state, getters) => {
      return (
        getters.assess_personBase +
        Helpers.buffBonus(state.character.skills.assess_person.buff) +
        Helpers.cantripBonus(state.character.skills.assess_person.cantrip)
      );
    },
    cookingBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.focusBase) / 3) +
        Helpers.trainingBonus(state.character.skills.cooking.training) +
        state.character.timesEnlightened +
        state.character.skills.cooking.invested
      );
    },
    cookingBuffed: (state, getters) => {
      return (
        getters.cookingBase +
        Helpers.buffBonus(state.character.skills.cooking.buff) +
        Helpers.cantripBonus(state.character.skills.cooking.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.focus.buff)) /
            3
        )
      );
    },
    creature_enchantmentBase: (state, getters) => {
      return (
        Math.round((getters.focusBase + getters.selfBase) / 4) +
        Helpers.trainingBonus(
          state.character.skills.creature_enchantment.training
        ) +
        state.character.timesEnlightened +
        state.character.skills.creature_enchantment.invested
      );
    },
    creature_enchantmentBuffed: (state, getters) => {
      return (
        getters.creature_enchantmentBase +
        Helpers.buffBonus(state.character.skills.creature_enchantment.buff) +
        Helpers.cantripBonus(
          state.character.skills.creature_enchantment.cantrip
        ) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.focus.buff) +
            Helpers.buffBonus(state.character.attributes.self.buff)) /
            4
        )
      );
    },
    deceptionBase: (state, getters) => {
      return (
        Helpers.trainingBonus(state.character.skills.deception.training) +
        state.character.timesEnlightened +
        state.character.skills.deception.invested
      );
    },
    deceptionBuffed: (state, getters) => {
      return (
        getters.deceptionBase +
        Helpers.buffBonus(state.character.skills.deception.buff) +
        Helpers.cantripBonus(state.character.skills.deception.cantrip)
      );
    },
    dirty_fightingBase: (state, getters) => {
      return (
        Math.round((getters.strengthBase + getters.coordinationBase) / 3) +
        Helpers.trainingBonus(state.character.skills.dirty_fighting.training) +
        state.character.timesEnlightened +
        state.character.skills.dirty_fighting.invested
      );
    },
    dirty_fightingBuffed: (state, getters) => {
      return (
        getters.dirty_fightingBase +
        Helpers.buffBonus(state.character.skills.dirty_fighting.buff) +
        Helpers.cantripBonus(state.character.skills.dirty_fighting.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.strength.buff) +
            Helpers.buffBonus(state.character.attributes.coordination.buff)) /
            3
        )
      );
    },
    dual_wieldBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.coordinationBase) / 3) +
        Helpers.trainingBonus(state.character.skills.dual_wield.training) +
        state.character.timesEnlightened +
        state.character.skills.dual_wield.invested
      );
    },
    dual_wieldBuffed: (state, getters) => {
      return (
        getters.dual_wieldBase +
        Helpers.buffBonus(state.character.skills.dual_wield.buff) +
        Helpers.cantripBonus(state.character.skills.dual_wield.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.focus.buff)) /
            3
        )
      );
    },
    finesse_weaponsBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.quicknessBase) / 3) +
        Helpers.trainingBonus(state.character.skills.finesse_weapons.training) +
        state.character.timesEnlightened +
        state.character.skills.finesse_weapons.invested
      );
    },
    finesse_weaponsBuffed: (state, getters) => {
      return (
        getters.finesse_weaponsBase +
        Helpers.buffBonus(state.character.skills.finesse_weapons.buff) +
        Helpers.cantripBonus(state.character.skills.finesse_weapons.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.quickness.buff)) /
            3
        )
      );
    },
    fletchingBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.focusBase) / 3) +
        Helpers.trainingBonus(state.character.skills.fletching.training) +
        state.character.timesEnlightened +
        state.character.skills.fletching.invested
      );
    },
    fletchingBuffed: (state, getters) => {
      return (
        getters.fletchingBase +
        Helpers.buffBonus(state.character.skills.fletching.buff) +
        Helpers.cantripBonus(state.character.skills.fletching.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.focus.buff)) /
            3
        )
      );
    },
    healingBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.focusBase) / 3) +
        Helpers.trainingBonus(state.character.skills.healing.training) +
        state.character.timesEnlightened +
        state.character.skills.healing.invested
      );
    },
    healingBuffed: (state, getters) => {
      return (
        getters.healingBase +
        Helpers.buffBonus(state.character.skills.healing.buff) +
        Helpers.cantripBonus(state.character.skills.healing.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.focus.buff)) /
            3
        )
      );
    },
    heavy_weaponsBase: (state, getters) => {
      return (
        Math.round((getters.strengthBase + getters.coordinationBase) / 3) +
        Helpers.trainingBonus(state.character.skills.heavy_weapons.training) +
        state.character.timesEnlightened +
        state.character.skills.heavy_weapons.invested
      );
    },
    heavy_weaponsBuffed: (state, getters) => {
      return (
        getters.heavy_weaponsBase +
        Helpers.buffBonus(state.character.skills.heavy_weapons.buff) +
        Helpers.cantripBonus(state.character.skills.heavy_weapons.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.strength.buff) +
            Helpers.buffBonus(state.character.attributes.coordination.buff)) /
            3
        )
      );
    },
    item_enchantmentBase: (state, getters) => {
      return (
        Math.round((getters.focusBase + getters.selfBase) / 4) +
        Helpers.trainingBonus(
          state.character.skills.item_enchantment.training
        ) +
        state.character.timesEnlightened +
        state.character.skills.item_enchantment.invested
      );
    },
    item_enchantmentBuffed: (state, getters) => {
      return (
        getters.item_enchantmentBase +
        Helpers.buffBonus(state.character.skills.item_enchantment.buff) +
        Helpers.cantripBonus(state.character.skills.item_enchantment.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.focus.buff) +
            Helpers.buffBonus(state.character.attributes.self.buff)) /
            4
        )
      );
    },
    item_tinkeringBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.focusBase) / 2) +
        Helpers.trainingBonus(state.character.skills.item_tinkering.training) +
        state.character.timesEnlightened +
        state.character.skills.item_tinkering.invested
      );
    },
    item_tinkeringBuffed: (state, getters) => {
      return (
        getters.item_tinkeringBase +
        Helpers.buffBonus(state.character.skills.item_tinkering.buff) +
        Helpers.cantripBonus(state.character.skills.item_tinkering.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.focus.buff)) /
            2
        )
      );
    },
    jumpBase: (state, getters) => {
      return (
        Math.round((getters.strengthBase + getters.coordinationBase) / 2) +
        Helpers.trainingBonus(state.character.skills.jump.training) +
        state.character.timesEnlightened +
        state.character.skills.jump.invested
      );
    },
    jumpBuffed: (state, getters) => {
      return (
        getters.jumpBase +
        Helpers.buffBonus(state.character.skills.jump.buff) +
        Helpers.cantripBonus(state.character.skills.jump.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.strength.buff) +
            Helpers.buffBonus(state.character.attributes.coordination.buff)) /
            2
        )
      );
    },
    leadershipBase: (state, getters) => {
      return (
        Helpers.trainingBonus(state.character.skills.leadership.training) +
        state.character.timesEnlightened +
        state.character.skills.leadership.invested
      );
    },
    leadershipBuffed: (state, getters) => {
      return (
        getters.leadershipBase +
        Helpers.buffBonus(state.character.skills.leadership.buff) +
        Helpers.cantripBonus(state.character.skills.leadership.cantrip)
      );
    },
    life_magicBase: (state, getters) => {
      return (
        Math.round((getters.focusBase + getters.selfBase) / 4) +
        Helpers.trainingBonus(state.character.skills.life_magic.training) +
        state.character.timesEnlightened +
        state.character.skills.life_magic.invested
      );
    },
    life_magicBuffed: (state, getters) => {
      return (
        getters.life_magicBase +
        Helpers.buffBonus(state.character.skills.life_magic.buff) +
        Helpers.cantripBonus(state.character.skills.life_magic.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.focus.buff) +
            Helpers.buffBonus(state.character.attributes.self.buff)) /
            4
        )
      );
    },
    light_weaponsBase: (state, getters) => {
      return (
        Math.round((getters.strengthBase + getters.coordinationBase) / 3) +
        Helpers.trainingBonus(state.character.skills.light_weapons.training) +
        state.character.timesEnlightened +
        state.character.skills.light_weapons.invested
      );
    },
    light_weaponsBuffed: (state, getters) => {
      return (
        getters.light_weaponsBase +
        Helpers.buffBonus(state.character.skills.light_weapons.buff) +
        Helpers.cantripBonus(state.character.skills.light_weapons.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.strength.buff) +
            Helpers.buffBonus(state.character.attributes.coordination.buff)) /
            3
        )
      );
    },
    lockpickBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.focusBase) / 3) +
        Helpers.trainingBonus(state.character.skills.lockpick.training) +
        state.character.timesEnlightened +
        state.character.skills.lockpick.invested
      );
    },
    lockpickBuffed: (state, getters) => {
      return (
        getters.lockpickBase +
        Helpers.buffBonus(state.character.skills.lockpick.buff) +
        Helpers.cantripBonus(state.character.skills.lockpick.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.focus.buff)) /
            3
        )
      );
    },
    loyaltyBase: (state, getters) => {
      return (
        Helpers.trainingBonus(state.character.skills.loyalty.training) +
        state.character.timesEnlightened +
        state.character.skills.loyalty.invested
      );
    },
    loyaltyBuffed: (state, getters) => {
      return (
        getters.loyaltyBase +
        Helpers.buffBonus(state.character.skills.loyalty.buff) +
        Helpers.cantripBonus(state.character.skills.loyalty.cantrip)
      );
    },
    magic_defenseBase: (state, getters) => {
      return (
        Math.round((getters.focusBase + getters.selfBase) / 7) +
        Helpers.trainingBonus(state.character.skills.magic_defense.training) +
        state.character.timesEnlightened +
        state.character.skills.magic_defense.invested
      );
    },
    magic_defenseBuffed: (state, getters) => {
      return (
        getters.magic_defenseBase +
        Helpers.buffBonus(state.character.skills.magic_defense.buff) +
        Helpers.cantripBonus(state.character.skills.magic_defense.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.focus.buff) +
            Helpers.buffBonus(state.character.attributes.self.buff)) /
            7
        )
      );
    },
    magic_item_tinkeringBase: (state, getters) => {
      return (
        getters.focusBase +
        Helpers.trainingBonus(
          state.character.skills.magic_item_tinkering.training
        ) +
        state.character.timesEnlightened +
        state.character.skills.magic_item_tinkering.invested
      );
    },
    magic_item_tinkeringBuffed: (state, getters) => {
      return (
        getters.magic_item_tinkeringBase +
        Helpers.buffBonus(state.character.skills.magic_item_tinkering.buff) +
        Helpers.cantripBonus(
          state.character.skills.magic_item_tinkering.cantrip
        ) +
        Helpers.buffBonus(state.character.attributes.focus.buff)
      );
    },
    mana_conversionBase: (state, getters) => {
      return (
        Math.round((getters.focusBase + getters.selfBase) / 6) +
        Helpers.trainingBonus(state.character.skills.mana_conversion.training) +
        state.character.timesEnlightened +
        state.character.skills.mana_conversion.invested
      );
    },
    mana_conversionBuffed: (state, getters) => {
      return (
        getters.mana_conversionBase +
        Helpers.buffBonus(state.character.skills.mana_conversion.buff) +
        Helpers.cantripBonus(state.character.skills.mana_conversion.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.focus.buff) +
            Helpers.buffBonus(state.character.attributes.self.buff)) /
            6
        )
      );
    },
    melee_defenseBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.quicknessBase) / 3) +
        Helpers.trainingBonus(state.character.skills.melee_defense.training) +
        state.character.timesEnlightened +
        state.character.skills.melee_defense.invested
      );
    },
    melee_defenseBuffed: (state, getters) => {
      return (
        getters.melee_defenseBase +
        Helpers.buffBonus(state.character.skills.melee_defense.buff) +
        Helpers.cantripBonus(state.character.skills.melee_defense.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.quickness.buff)) /
            3
        )
      );
    },
    missile_defenseBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.quicknessBase) / 5) +
        Helpers.trainingBonus(state.character.skills.missile_defense.training) +
        state.character.timesEnlightened +
        state.character.skills.missile_defense.invested
      );
    },
    missile_defenseBuffed: (state, getters) => {
      return (
        getters.missile_defenseBase +
        Helpers.buffBonus(state.character.skills.missile_defense.buff) +
        Helpers.cantripBonus(state.character.skills.missile_defense.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.quickness.buff)) /
            5
        )
      );
    },
    missile_weaponsBase: (state, getters) => {
      return (
        Math.round(getters.coordinationBase / 2) +
        Helpers.trainingBonus(state.character.skills.missile_weapons.training) +
        state.character.timesEnlightened +
        state.character.skills.missile_weapons.invested
      );
    },
    missile_weaponsBuffed: (state, getters) => {
      return (
        getters.missile_weaponsBase +
        Helpers.buffBonus(state.character.skills.missile_weapons.buff) +
        Helpers.cantripBonus(state.character.skills.missile_weapons.cantrip) +
        Math.round(
          Helpers.buffBonus(state.character.attributes.coordination.buff) / 2
        )
      );
    },
    recklessnessBase: (state, getters) => {
      return (
        Math.round((getters.strengthBase + getters.quicknessBase) / 3) +
        Helpers.trainingBonus(state.character.skills.recklessness.training) +
        state.character.timesEnlightened +
        state.character.skills.recklessness.invested
      );
    },
    recklessnessBuffed: (state, getters) => {
      return (
        getters.recklessnessBase +
        Helpers.buffBonus(state.character.skills.recklessness.buff) +
        Helpers.cantripBonus(state.character.skills.recklessness.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.strength.buff) +
            Helpers.buffBonus(state.character.attributes.quickness.buff)) /
            3
        )
      );
    },
    runBase: (state, getters) => {
      return (
        getters.quicknessBase +
        Helpers.trainingBonus(state.character.skills.run.training) +
        state.character.timesEnlightened +
        state.character.skills.run.invested
      );
    },
    runBuffed: (state, getters) => {
      return (
        getters.runBase +
        Helpers.buffBonus(state.character.skills.run.buff) +
        Helpers.cantripBonus(state.character.skills.run.cantrip) +
        Helpers.buffBonus(state.character.attributes.quickness.buff)
      );
    },
    salvagingBase: (state, getters) => {
      return (
        Helpers.trainingBonus(state.character.skills.salvaging.training) +
        state.character.timesEnlightened +
        state.character.skills.salvaging.invested
      );
    },
    salvagingBuffed: (state, getters) => {
      return (
        getters.salvagingBase +
        Helpers.buffBonus(state.character.skills.salvaging.buff) +
        Helpers.cantripBonus(state.character.skills.salvaging.cantrip)
      );
    },
    shieldBase: (state, getters) => {
      return (
        Math.round((getters.strengthBase + getters.coordinationBase) / 2) +
        Helpers.trainingBonus(state.character.skills.shield.training) +
        state.character.timesEnlightened +
        state.character.skills.shield.invested
      );
    },
    shieldBuffed: (state, getters) => {
      return (
        getters.shieldBase +
        Helpers.buffBonus(state.character.skills.shield.buff) +
        Helpers.cantripBonus(state.character.skills.shield.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.strength.buff) +
            Helpers.buffBonus(state.character.attributes.coordination.buff)) /
            2
        )
      );
    },
    sneak_attackBase: (state, getters) => {
      return (
        Math.round((getters.coordinationBase + getters.quicknessBase) / 3) +
        Helpers.trainingBonus(state.character.skills.sneak_attack.training) +
        state.character.timesEnlightened +
        state.character.skills.sneak_attack.invested
      );
    },
    sneak_attackBuffed: (state, getters) => {
      return (
        getters.sneak_attackBase +
        Helpers.buffBonus(state.character.skills.sneak_attack.buff) +
        Helpers.cantripBonus(state.character.skills.sneak_attack.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.coordination.buff) +
            Helpers.buffBonus(state.character.attributes.quickness.buff)) /
            3
        )
      );
    },
    summoningBase: (state, getters) => {
      return (
        Math.round((getters.enduranceBase + getters.selfBase) / 3) +
        Helpers.trainingBonus(state.character.skills.summoning.training) +
        state.character.timesEnlightened +
        state.character.skills.summoning.invested
      );
    },
    summoningBuffed: (state, getters) => {
      return (
        getters.summoningBase +
        Helpers.buffBonus(state.character.skills.summoning.buff) +
        Helpers.cantripBonus(state.character.skills.summoning.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.endurance.buff) +
            Helpers.buffBonus(state.character.attributes.self.buff)) /
            3
        )
      );
    },
    two_handed_combatBase: (state, getters) => {
      return (
        Math.round((getters.strengthBase + getters.coordinationBase) / 3) +
        Helpers.trainingBonus(
          state.character.skills.two_handed_combat.training
        ) +
        state.character.timesEnlightened +
        state.character.skills.two_handed_combat.invested
      );
    },
    two_handed_combatBuffed: (state, getters) => {
      return (
        getters.two_handed_combatBase +
        Helpers.buffBonus(state.character.skills.two_handed_combat.buff) +
        Helpers.cantripBonus(state.character.skills.two_handed_combat.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.strength.buff) +
            Helpers.buffBonus(state.character.attributes.coordination.buff)) /
            3
        )
      );
    },
    void_magicBase: (state, getters) => {
      return (
        Math.round((getters.focusBase + getters.selfBase) / 4) +
        Helpers.trainingBonus(state.character.skills.void_magic.training) +
        state.character.timesEnlightened +
        state.character.skills.void_magic.invested
      );
    },
    void_magicBuffed: (state, getters) => {
      return (
        getters.void_magicBase +
        Helpers.buffBonus(state.character.skills.void_magic.buff) +
        Helpers.cantripBonus(state.character.skills.void_magic.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.focus.buff) +
            Helpers.buffBonus(state.character.attributes.self.buff)) /
            4
        )
      );
    },
    war_magicBase: (state, getters) => {
      return (
        Math.round((getters.focusBase + getters.selfBase) / 4) +
        Helpers.trainingBonus(state.character.skills.war_magic.training) +
        state.character.timesEnlightened +
        state.character.skills.war_magic.invested
      );
    },
    war_magicBuffed: (state, getters) => {
      return (
        getters.war_magicBase +
        Helpers.buffBonus(state.character.skills.war_magic.buff) +
        Helpers.cantripBonus(state.character.skills.war_magic.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.focus.buff) +
            Helpers.buffBonus(state.character.attributes.self.buff)) /
            4
        )
      );
    },
    weapon_tinkeringBase: (state, getters) => {
      return (
        Math.round((getters.focusBase + getters.selfBase) / 2) +
        Helpers.trainingBonus(
          state.character.skills.weapon_tinkering.training
        ) +
        state.character.timesEnlightened +
        state.character.skills.weapon_tinkering.invested
      );
    },
    weapon_tinkeringBuffed: (state, getters) => {
      return (
        getters.weapon_tinkeringBase +
        Helpers.buffBonus(state.character.skills.weapon_tinkering.buff) +
        Helpers.cantripBonus(state.character.skills.weapon_tinkering.cantrip) +
        Math.round(
          (Helpers.buffBonus(state.character.attributes.focus.buff) +
            Helpers.buffBonus(state.character.attributes.self.buff)) /
            2
        )
      );
    },

    specializedSkills: state => {
      return Object.keys(state.character.skills).filter(
        key =>
          state.character.skills[key].training ===
          Constants.TRAINING.SPECIALIZED
      );
    },
    trainedSkills: state => {
      return Object.keys(state.character.skills).filter(
        key =>
          state.character.skills[key].training === Constants.TRAINING.TRAINED
      );
    },
    untrainedSkills: state => {
      return Object.keys(state.character.skills).filter(
        key =>
          state.character.skills[key].training === Constants.TRAINING.UNTRAINED
      );
    },
    unusableSkills: state => {
      return Object.keys(state.character.skills).filter(
        key =>
          state.character.skills[key].training === Constants.TRAINING.UNUSABLE
      );
    }
  },
  mutations: {
    updateLevel(state, value) {
      state.character.level = Number(value);
    },

    updateTimesEnlightened(state, value) {
      state.character.timesEnlightened = Number(value);
    },

    updateExtraSkillCredit(state, payload) {
      state.character.extraSkillCredits[payload.name] = payload.value;
    },

    updateAttributeCreation(state, payload) {
      let newVal = Number(payload.value);

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

    updateSkillInvestment(state, payload) {
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
          break;
        default:
          return;
      }

      state.character.skills[skill].training = newTraining;
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
          state.character.skills[skill].training == Constants.TRAINING.TRAINED
        ) {
          newval = newval > 208 ? 208 : newval;
        }

        state.character.skills[skill].invested = newval;
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
    }
  }
});
