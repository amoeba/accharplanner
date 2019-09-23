import {
  ATTRIBUTES,
  VITALS,
  AUGMENTATIONS,
  COST_SKILL_SPECIALIZED,
  COST_SKILL_TRAINED,
  AUGMENTATION_COST,
  COST_VITAL,
  COST_ATTRIBUTE,
  COST_LEVEL,
  SKILL_POINTS_AT_LEVEL,
  COST_SKILL_POINTS,
  SPEC_COSTS_AUG } from "../constants";
import Helpers from "../helpers";
import { State } from "../types";
import { Attribute, Skill, Training, Race, Augmentation } from '@/types';

export default {
  // General
  sharedBuild: (state: State) => {
    return state.sharedBuild;
  },
  exportedCharacter: (state: State) => {
    return JSON.stringify(state.character, null, 4);
  },

  totalXPEarned: (state: State) => {
    let cost: number = 0;

    cost += COST_LEVEL[state.character.level];
    cost += state.character.timesEnlightened * COST_LEVEL[275];

    return cost;
  },

  totalXPInvested: (state: State, getters: any) => {
    let cost = 0;

    ATTRIBUTES.forEach(function(a: string) {
      cost += COST_ATTRIBUTE[state.character.attributes[a].invested];
    });

    VITALS.forEach(v => {
      cost += COST_VITAL[state.character.vitals[v].invested];
    });

    getters.specializedSkills.forEach(function(s: string) {
      cost +=
        COST_SKILL_SPECIALIZED[state.character.skills[s].invested];
    });

    getters.trainedSkills.forEach(function(s: string) {
      cost += COST_SKILL_TRAINED[state.character.skills[s].invested];
    });

    AUGMENTATIONS.forEach(function(aug: string) {
      cost +=
        AUGMENTATION_COST[aug][
        state.character.augmentations[aug].invested
        ];
    });

    // Adjust for free stuff, like racial experience augmentations
    if ((
      state.character.race === Race.Aluvian ||
      state.character.race === Race["Gharu'ndim"] ||
      state.character.race === Race.Sho ||
      state.character.race === Race.Viamontian) &&
      state.character.augmentations.jack_of_all_trades.invested == 1) {
      cost -= AUGMENTATION_COST[Augmentation.jack_of_all_trades][state.character.augmentations.jack_of_all_trades.invested];
    } else if ((
      state.character.race === Race.Empyrean) &&
      state.character.augmentations.infused_life_magic.invested == 1) {
      cost -= AUGMENTATION_COST[Augmentation.infused_life_magic][state.character.augmentations.infused_life_magic.invested];
    } else if ((
      state.character.race === Race.Umbraen ||
      state.character.race === Race.Penumbraen) &&
      state.character.augmentations.eye_of_the_remorseless.invested == 1) {
      cost -= AUGMENTATION_COST[Augmentation.eye_of_the_remorseless][state.character.augmentations.eye_of_the_remorseless.invested];
    }

    return cost;
  },

  requiredLevel: (state: State, getters: any) => {
    for (let i: number = 1; i <= 275; i++) {
      if (
        getters.totalXPInvested <= COST_LEVEL[i]
      ) {
        return "Requires >= level " + i;
      }
    }

    // We didn't find a solution which means we've Enlightened
    return "Oops, something went wrong!";
  },

  skillPointsAvailable: (state: State) => {
    return (
      SKILL_POINTS_AT_LEVEL[state.character.level] +
      (state.character.extraSkillCredits.railrea ? 1 : 0) +
      (state.character.extraSkillCredits.oswald ? 1 : 0) +
      state.character.luminance_auras.skill.invested
    );
  },

  skillPointsSpent: function (state: State): number {
    let cost: number = 0;

    Object.keys(Skill).forEach(function(skillName: string): void {
      let training: string = state.character.skills[skillName].training;

      if (
        training == Training.SPECIALIZED ||
        training == Training.TRAINED
      ) {
        cost += COST_SKILL_POINTS[skillName][training];
      }
    });

    return cost;
  },

  augmentationsSpent: (state: State) => {
    let cost = 0;

    Object.keys(SPEC_COSTS_AUG).forEach(function (skill: string) {
      if (
        state.character.skills[skill] &&
        state.character.skills[skill].training ==
        Training.SPECIALIZED &&
        SPEC_COSTS_AUG[skill]
      ) {
        cost += 1;
      }
    });

    return cost;
  },

  totalLuminanceXPSpent: (state: State) => {
    let cost = 0;

    Object.keys(SPEC_COSTS_AUG).forEach(skill => {
      if (
        state.character.skills[skill] &&
        state.character.skills[skill].training ==
        Training.SPECIALIZED &&
        SPEC_COSTS_AUG[skill]
      ) {
        cost += 1000000000;
      }
    });

    // Enlightenment requires you get all lum auras (20mil xp)
    // TODO: Track auras and this together
    if (state.character.timesEnlightened > 0) {
      cost += 20000000 * state.character.timesEnlightened;
    }

    return cost;
  },

  specializedSkillPointsSpent: (state: State, getters: any) => {
    let cost = 0;

    getters.specializedSkills.forEach((skill: string) => {
      cost += COST_SKILL_POINTS[skill][Training.SPECIALIZED] - COST_SKILL_POINTS[skill][Training.TRAINED];
    });

    return cost;
  },

  // Attributes
  attributePointsSpent: (state: State) => {
    let spent = 0;

    Object.keys(Attribute).forEach(attribute => {
      spent += state.character.attributes[attribute].creation;
    });

    return spent;
  },

  strengthBase: (state: State) => {
    return (
      state.character.attributes.strength.creation +
      state.character.attributes.strength.invested +
      state.character.augmentations.reinforcement_of_the_lugians.invested * 5
    );
  },
  strengthBuffed: (state: State, getters: any) => {
    return (
      getters.strengthBase +
      Helpers.buffBonus(state.character.attributes.strength.buff) +
      Helpers.cantripBonus(state.character.attributes.strength.cantrip)
    );
  },
  enduranceBase: (state: State) => {
    return (
      state.character.attributes.endurance.creation +
      state.character.attributes.endurance.invested +
      state.character.augmentations.bleearghs_fortitude.invested * 5
    );
  },
  enduranceBuffed: (state: State, getters: any) => {
    return (
      getters.enduranceBase +
      Helpers.buffBonus(state.character.attributes.endurance.buff) +
      Helpers.cantripBonus(state.character.attributes.endurance.cantrip)
    );
  },
  coordinationBase: (state: State) => {
    return (
      state.character.attributes.coordination.creation +
      state.character.attributes.coordination.invested +
      state.character.augmentations.oswalds_enhancement.invested * 5
    );
  },
  coordinationBuffed: (state: State, getters: any) => {
    return (
      getters.coordinationBase +
      Helpers.buffBonus(state.character.attributes.coordination.buff) +
      Helpers.cantripBonus(state.character.attributes.coordination.cantrip)
    );
  },
  quicknessBase: (state: State) => {
    return (
      state.character.attributes.quickness.creation +
      state.character.attributes.quickness.invested +
      state.character.augmentations.siraluuns_blessing.invested * 5
    );
  },
  quicknessBuffed: (state: State, getters: any) => {
    return (
      getters.quicknessBase +
      Helpers.buffBonus(state.character.attributes.quickness.buff) +
      Helpers.cantripBonus(state.character.attributes.quickness.cantrip)
    );
  },
  focusBase: (state: State) => {
    return (
      state.character.attributes.focus.creation +
      state.character.attributes.focus.invested +
      state.character.augmentations.enduring_calm.invested * 5
    );
  },
  focusBuffed: (state: State, getters: any) => {
    return (
      getters.focusBase +
      Helpers.buffBonus(state.character.attributes.focus.buff) +
      Helpers.cantripBonus(state.character.attributes.focus.cantrip)
    );
  },
  selfBase: (state: State) => {
    return (
      state.character.attributes.self.creation +
      state.character.attributes.self.invested +
      state.character.augmentations.steadfast_will.invested * 5
    );
  },
  selfBuffed: (state: State, getters: any) => {
    return (
      getters.selfBase +
      Helpers.buffBonus(state.character.attributes.self.buff) +
      Helpers.cantripBonus(state.character.attributes.self.cantrip)
    );
  },

  // Vitals
  healthCreation: (state: State) => {
    return Math.round(state.character.attributes.endurance.creation / 2);
  },
  healthBase: (state: State, getters: any) => {
    const benediction_bonus =
      state.character.augmentations.asherons_lesser_benediction.invested ===
        1 || state.character.augmentations.asherons_benediction.invested === 1
        ? 1.1
        : 1;

    return (
      (Math.round(getters.enduranceBase / 2) +
        state.character.vitals.health.invested +
        Helpers.cantripBonus(state.character.vitals.health.cantrip)) * benediction_bonus
    );
  },
  healthBuffed: (state: State, getters: any) => {
    return (
      getters.healthBase +
      Math.round(Helpers.buffBonus(state.character.vitals.health.buff) / 2)
    );
  },
  staminaCreation: (state: State) => {
    return state.character.attributes.endurance.creation;
  },
  staminaBase: (state: State, getters: any) => {
    return (
      getters.enduranceBase +
      state.character.vitals.stamina.invested +
      Helpers.cantripBonus(state.character.vitals.stamina.cantrip)
    );
  },
  staminaBuffed: (state: State, getters: any) => {
    return (
      getters.staminaBase +
      Helpers.buffBonus(state.character.vitals.stamina.buff)
    );
  },
  manaCreation: (state: State) => {
    return state.character.attributes.self.creation;
  },
  manaBase: (state: State, getters: any) => {
    return getters.selfBase + state.character.vitals.mana.invested;
  },
  manaBuffed: (state: State, getters: any) => {
    return (
      getters.manaBase +
      Helpers.buffBonus(state.character.vitals.mana.buff) +
      Helpers.cantripBonus(state.character.vitals.mana.cantrip)
    );
  },

  // Skills
  alchemyBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.focusBase) / 3) +
      Helpers.trainingBonus(state.character.skills.alchemy.training) +
      state.character.skills.alchemy.invested
    );
  },
  alchemyBuffed: (state: State, getters: any) => {
    return (
      getters.alchemyBase +
      Helpers.buffBonus(state.character.skills.alchemy.buff) +
      Helpers.cantripBonus(state.character.skills.alchemy.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.craftsman.invested +
      state.character.luminance_auras.world.invested +
      (state.character.skills.alchemy.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  arcane_loreBase: (state: State, getters: any) => {
    return (
      Math.round(getters.focusBase / 3) +
      Helpers.trainingBonus(state.character.skills.arcane_lore.training) +
      state.character.skills.arcane_lore.invested
    );
  },
  arcane_loreBuffed: (state: State, getters: any) => {
    return (
      getters.arcane_loreBase +
      Helpers.buffBonus(state.character.skills.arcane_lore.buff) +
      Helpers.cantripBonus(state.character.skills.arcane_lore.cantrip) +
      Math.round(Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip) / 3) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.arcane_lore.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  armor_tinkeringBase: (state: State, getters: any) => {
    return (
      Math.round((getters.enduranceBase + getters.focusBase) / 2) +
      Helpers.trainingBonus(state.character.skills.armor_tinkering.training) +
      state.character.skills.armor_tinkering.invested
    );
  },
  armor_tinkeringBuffed: (state: State, getters: any) => {
    return (
      getters.armor_tinkeringBase +
      Helpers.buffBonus(state.character.skills.armor_tinkering.buff) +
      Helpers.cantripBonus(state.character.skills.armor_tinkering.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.endurance.buff) + Helpers.cantripBonus(state.character.attributes.endurance.cantrip) +
          Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip)) /
        2
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.craftsman.invested +
      state.character.luminance_auras.world.invested +
      (state.character.skills.armor_tinkering.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  assess_creatureBase: (state: State) => {
    return (
      Helpers.trainingBonus(state.character.skills.assess_creature.training) +
      state.character.skills.assess_creature.invested
    );
  },
  assess_creatureBuffed: (state: State, getters: any) => {
    return (
      getters.assess_creatureBase +
      Helpers.buffBonus(state.character.skills.assess_creature.buff) +
      Helpers.cantripBonus(state.character.skills.assess_creature.cantrip) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.assess_creature.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  assess_personBase: (state: State) => {
    return (
      Helpers.trainingBonus(state.character.skills.assess_person.training) +
      state.character.skills.assess_person.invested
    );
  },
  assess_personBuffed: (state: State, getters: any) => {
    return (
      getters.assess_personBase +
      Helpers.buffBonus(state.character.skills.assess_person.buff) +
      Helpers.cantripBonus(state.character.skills.assess_person.cantrip) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.assess_person.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  cookingBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.focusBase) / 3) +
      Helpers.trainingBonus(state.character.skills.cooking.training) +
      state.character.skills.cooking.invested +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.craftsman.invested +
      state.character.luminance_auras.world.invested +
      (state.character.skills.cooking.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  cookingBuffed: (state: State, getters: any) => {
    return (
      getters.cookingBase +
      Helpers.buffBonus(state.character.skills.cooking.buff) +
      Helpers.cantripBonus(state.character.skills.cooking.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip)) /
        3
      )
    );
  },
  creature_enchantmentBase: (state: State, getters: any) => {
    return (
      Math.round((getters.focusBase + getters.selfBase) / 4) +
      Helpers.trainingBonus(
        state.character.skills.creature_enchantment.training
      ) +
      state.character.skills.creature_enchantment.invested
    );
  },
  creature_enchantmentBuffed: (state: State, getters: any) => {
    return (
      getters.creature_enchantmentBase +
      Helpers.buffBonus(state.character.skills.creature_enchantment.buff) +
      Helpers.cantripBonus(
        state.character.skills.creature_enchantment.cantrip
      ) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip) +
          Helpers.buffBonus(state.character.attributes.self.buff) + Helpers.cantripBonus(state.character.attributes.self.cantrip)) /
        4
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.creature_enchantment.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  deceptionBase: (state: State) => {
    return (
      Helpers.trainingBonus(state.character.skills.deception.training) +
      state.character.skills.deception.invested
    );
  },
  deceptionBuffed: (state: State, getters: any) => {
    return (
      getters.deceptionBase +
      Helpers.buffBonus(state.character.skills.deception.buff) +
      Helpers.cantripBonus(state.character.skills.deception.cantrip) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.deception.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  dirty_fightingBase: (state: State, getters: any) => {
    return (
      Math.round((getters.strengthBase + getters.coordinationBase) / 3) +
      Helpers.trainingBonus(state.character.skills.dirty_fighting.training) +
      state.character.skills.dirty_fighting.invested
    );
  },
  dirty_fightingBuffed: (state: State, getters: any) => {
    return (
      getters.dirty_fightingBase +
      Helpers.buffBonus(state.character.skills.dirty_fighting.buff) +
      Helpers.cantripBonus(state.character.skills.dirty_fighting.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.strength.buff) + Helpers.cantripBonus(state.character.attributes.strength.cantrip) +
          Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.dirty_fighting.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  dual_wieldBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.coordinationBase) / 3) +
      Helpers.trainingBonus(state.character.skills.dual_wield.training) +
      state.character.skills.dual_wield.invested
    );
  },
  dual_wieldBuffed: (state: State, getters: any) => {
    return (
      getters.dual_wieldBase +
      Helpers.buffBonus(state.character.skills.dual_wield.buff) +
      Helpers.cantripBonus(state.character.skills.dual_wield.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.dual_wield.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  finesse_weaponsBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.quicknessBase) / 3) +
      Helpers.trainingBonus(state.character.skills.finesse_weapons.training) +
      state.character.skills.finesse_weapons.invested
    );
  },
  finesse_weaponsBuffed: (state: State, getters: any) => {
    return (
      getters.finesse_weaponsBase +
      Helpers.buffBonus(state.character.skills.finesse_weapons.buff) +
      Helpers.cantripBonus(state.character.skills.finesse_weapons.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.quickness.buff) + Helpers.cantripBonus(state.character.attributes.quickness.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.finesse_weapons.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  fletchingBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.focusBase) / 3) +
      Helpers.trainingBonus(state.character.skills.fletching.training) +
      state.character.skills.fletching.invested
    );
  },
  fletchingBuffed: (state: State, getters: any) => {
    return (
      getters.fletchingBase +
      Helpers.buffBonus(state.character.skills.fletching.buff) +
      Helpers.cantripBonus(state.character.skills.fletching.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.craftsman.invested +
      state.character.luminance_auras.world.invested +
      (state.character.skills.fletching.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  healingBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.focusBase) / 3) +
      Helpers.trainingBonus(state.character.skills.healing.training) +
      state.character.skills.healing.invested
    );
  },
  healingBuffed: (state: State, getters: any) => {
    return (
      getters.healingBase +
      Helpers.buffBonus(state.character.skills.healing.buff) +
      Helpers.cantripBonus(state.character.skills.healing.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.healing.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  heavy_weaponsBase: (state: State, getters: any) => {
    return (
      Math.round((getters.strengthBase + getters.coordinationBase) / 3) +
      Helpers.trainingBonus(state.character.skills.heavy_weapons.training) +
      state.character.skills.heavy_weapons.invested
    );
  },
  heavy_weaponsBuffed: (state: State, getters: any) => {
    return (
      getters.heavy_weaponsBase +
      Helpers.buffBonus(state.character.skills.heavy_weapons.buff) +
      Helpers.cantripBonus(state.character.skills.heavy_weapons.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.strength.buff) + Helpers.cantripBonus(state.character.attributes.strength.cantrip) +
          Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.heavy_weapons.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  item_enchantmentBase: (state: State, getters: any) => {
    return (
      Math.round((getters.focusBase + getters.selfBase) / 4) +
      Helpers.trainingBonus(state.character.skills.item_enchantment.training) +
      state.character.skills.item_enchantment.invested
    );
  },
  item_enchantmentBuffed: (state: State, getters: any) => {
    return (
      getters.item_enchantmentBase +
      Helpers.buffBonus(state.character.skills.item_enchantment.buff) +
      Helpers.cantripBonus(state.character.skills.item_enchantment.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip) +
          Helpers.buffBonus(state.character.attributes.self.buff) + Helpers.cantripBonus(state.character.attributes.self.cantrip)) /
        4
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.item_enchantment.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  item_tinkeringBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.focusBase) / 2) +
      Helpers.trainingBonus(state.character.skills.item_tinkering.training) +
      state.character.skills.item_tinkering.invested
    );
  },
  item_tinkeringBuffed: (state: State, getters: any) => {
    return (
      getters.item_tinkeringBase +
      Helpers.buffBonus(state.character.skills.item_tinkering.buff) +
      Helpers.cantripBonus(state.character.skills.item_tinkering.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip)) /
        2
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.craftsman.invested +
      state.character.luminance_auras.world.invested +
      (state.character.skills.item_tinkering.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  jumpBase: (state: State, getters: any) => {
    return (
      Math.round((getters.strengthBase + getters.coordinationBase) / 2) +
      Helpers.trainingBonus(state.character.skills.jump.training) +
      state.character.skills.jump.invested
    );
  },
  jumpBuffed: (state: State, getters: any) => {
    return (
      getters.jumpBase +
      Helpers.buffBonus(state.character.skills.jump.buff) +
      Helpers.cantripBonus(state.character.skills.jump.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.strength.buff) + Helpers.cantripBonus(state.character.attributes.strength.cantrip) +
          Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip)) /
        2
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.jump.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  leadershipBase: (state: State) => {
    return (
      Helpers.trainingBonus(state.character.skills.leadership.training) +
      state.character.skills.leadership.invested
    );
  },
  leadershipBuffed: (state: State, getters: any) => {
    return (
      getters.leadershipBase +
      Helpers.buffBonus(state.character.skills.leadership.buff) +
      Helpers.cantripBonus(state.character.skills.leadership.cantrip) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.leadership.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  life_magicBase: (state: State, getters: any) => {
    return (
      Math.round((getters.focusBase + getters.selfBase) / 4) +
      Helpers.trainingBonus(state.character.skills.life_magic.training) +
      state.character.skills.life_magic.invested
    );
  },
  life_magicBuffed: (state: State, getters: any) => {
    return (
      getters.life_magicBase +
      Helpers.buffBonus(state.character.skills.life_magic.buff) +
      Helpers.cantripBonus(state.character.skills.life_magic.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip) +
          Helpers.buffBonus(state.character.attributes.self.buff) + Helpers.cantripBonus(state.character.attributes.self.cantrip)) /
        4
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.life_magic.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  light_weaponsBase: (state: State, getters: any) => {
    return (
      Math.round((getters.strengthBase + getters.coordinationBase) / 3) +
      Helpers.trainingBonus(state.character.skills.light_weapons.training) +
      state.character.skills.light_weapons.invested
    );
  },
  light_weaponsBuffed: (state: State, getters: any) => {
    return (
      getters.light_weaponsBase +
      Helpers.buffBonus(state.character.skills.light_weapons.buff) +
      Helpers.cantripBonus(state.character.skills.light_weapons.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.strength.buff) + Helpers.cantripBonus(state.character.attributes.strength.cantrip) +
          Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.light_weapons.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  lockpickBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.focusBase) / 3) +
      Helpers.trainingBonus(state.character.skills.lockpick.training) +
      state.character.skills.lockpick.invested
    );
  },
  lockpickBuffed: (state: State, getters: any) => {
    return (
      getters.lockpickBase +
      Helpers.buffBonus(state.character.skills.lockpick.buff) +
      Helpers.cantripBonus(state.character.skills.lockpick.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.craftsman.invested +
      state.character.luminance_auras.world.invested +
      (state.character.skills.lockpick.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  loyaltyBase: (state: State) => {
    return (
      Helpers.trainingBonus(state.character.skills.loyalty.training) +
      state.character.skills.loyalty.invested
    );
  },
  loyaltyBuffed: (state: State, getters: any) => {
    return (
      getters.loyaltyBase +
      Helpers.buffBonus(state.character.skills.loyalty.buff) +
      Helpers.cantripBonus(state.character.skills.loyalty.cantrip) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.loyalty.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  magic_defenseBase: (state: State, getters: any) => {
    return (
      Math.round((getters.focusBase + getters.selfBase) / 7) +
      Helpers.trainingBonus(state.character.skills.magic_defense.training) +
      state.character.skills.magic_defense.invested
    );
  },
  magic_defenseBuffed: (state: State, getters: any) => {
    return (
      getters.magic_defenseBase +
      Helpers.buffBonus(state.character.skills.magic_defense.buff) +
      Helpers.cantripBonus(state.character.skills.magic_defense.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip) +
          Helpers.buffBonus(state.character.attributes.self.buff) + Helpers.cantripBonus(state.character.attributes.self.cantrip)) /
        7
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.magic_defense.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  magic_item_tinkeringBase: (state: State, getters: any) => {
    return (
      getters.focusBase +
      Helpers.trainingBonus(
        state.character.skills.magic_item_tinkering.training
      ) +
      state.character.skills.magic_item_tinkering.invested
    );
  },
  magic_item_tinkeringBuffed: (state: State, getters: any) => {
    return (
      getters.magic_item_tinkeringBase +
      Helpers.buffBonus(state.character.skills.magic_item_tinkering.buff) +
      Helpers.cantripBonus(
        state.character.skills.magic_item_tinkering.cantrip
      ) +
      Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.craftsman.invested +
      state.character.luminance_auras.world.invested +
      (state.character.skills.magic_item_tinkering.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  mana_conversionBase: (state: State, getters: any) => {
    return (
      Math.round((getters.focusBase + getters.selfBase) / 6) +
      Helpers.trainingBonus(state.character.skills.mana_conversion.training) +
      state.character.skills.mana_conversion.invested
    );
  },
  mana_conversionBuffed: (state: State, getters: any) => {
    return (
      getters.mana_conversionBase +
      Helpers.buffBonus(state.character.skills.mana_conversion.buff) +
      Helpers.cantripBonus(state.character.skills.mana_conversion.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip) +
          Helpers.buffBonus(state.character.attributes.self.buff) + Helpers.cantripBonus(state.character.attributes.self.cantrip)) /
        6
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.mana_conversion.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  melee_defenseBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.quicknessBase) / 3) +
      Helpers.trainingBonus(state.character.skills.melee_defense.training) +
      state.character.skills.melee_defense.invested
    );
  },
  melee_defenseBuffed: (state: State, getters: any) => {
    return (
      getters.melee_defenseBase +
      Helpers.buffBonus(state.character.skills.melee_defense.buff) +
      Helpers.cantripBonus(state.character.skills.melee_defense.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.quickness.buff) + Helpers.cantripBonus(state.character.attributes.quickness.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.melee_defense.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  missile_defenseBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.quicknessBase) / 5) +
      Helpers.trainingBonus(state.character.skills.missile_defense.training) +
      state.character.skills.missile_defense.invested
    );
  },
  missile_defenseBuffed: (state: State, getters: any) => {
    return (
      getters.missile_defenseBase +
      Helpers.buffBonus(state.character.skills.missile_defense.buff) +
      Helpers.cantripBonus(state.character.skills.missile_defense.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.quickness.buff) + Helpers.cantripBonus(state.character.attributes.quickness.cantrip)) /
        5
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.missile_defense.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  missile_weaponsBase: (state: State, getters: any) => {
    return (
      Math.round(getters.coordinationBase / 2) +
      Helpers.trainingBonus(state.character.skills.missile_weapons.training) +
      state.character.skills.missile_weapons.invested
    );
  },
  missile_weaponsBuffed: (state: State, getters: any) => {
    return (
      getters.missile_weaponsBase +
      Helpers.buffBonus(state.character.skills.missile_weapons.buff) +
      Helpers.cantripBonus(state.character.skills.missile_weapons.cantrip) +
      Math.round(
        Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) / 2
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.missile_weapons.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  recklessnessBase: (state: State, getters: any) => {
    return (
      Math.round((getters.strengthBase + getters.quicknessBase) / 3) +
      Helpers.trainingBonus(state.character.skills.recklessness.training) +
      state.character.skills.recklessness.invested
    );
  },
  recklessnessBuffed: (state: State, getters: any) => {
    return (
      getters.recklessnessBase +
      Helpers.buffBonus(state.character.skills.recklessness.buff) +
      Helpers.cantripBonus(state.character.skills.recklessness.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.strength.buff) + Helpers.cantripBonus(state.character.attributes.strength.cantrip) +
          Helpers.buffBonus(state.character.attributes.quickness.buff) + Helpers.cantripBonus(state.character.attributes.quickness.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.recklessness.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  runBase: (state: State, getters: any) => {
    return (
      getters.quicknessBase +
      Helpers.trainingBonus(state.character.skills.run.training) +
      state.character.skills.run.invested
    );
  },
  runBuffed: (state: State, getters: any) => {
    return (
      getters.runBase +
      Helpers.buffBonus(state.character.skills.run.buff) +
      Helpers.cantripBonus(state.character.skills.run.cantrip) +
      Helpers.buffBonus(state.character.attributes.quickness.buff) +
      Helpers.cantripBonus(state.character.attributes.quickness.cantrip) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.run.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  salvagingBase: (state: State) => {
    return (
      Helpers.trainingBonus(state.character.skills.salvaging.training) +
      state.character.skills.salvaging.invested
    );
  },
  salvagingBuffed: (state: State, getters: any) => {
    return (
      getters.salvagingBase +
      Helpers.buffBonus(state.character.skills.salvaging.buff) +
      Helpers.cantripBonus(state.character.skills.salvaging.cantrip) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.craftsman.invested +
      state.character.luminance_auras.world.invested +
      (state.character.skills.salvaging.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  shieldBase: (state: State, getters: any) => {
    return (
      Math.round((getters.strengthBase + getters.coordinationBase) / 2) +
      Helpers.trainingBonus(state.character.skills.shield.training) +
      state.character.skills.shield.invested
    );
  },
  shieldBuffed: (state: State, getters: any) => {
    return (
      getters.shieldBase +
      Helpers.buffBonus(state.character.skills.shield.buff) +
      Helpers.cantripBonus(state.character.skills.shield.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.strength.buff) + Helpers.cantripBonus(state.character.attributes.strength.cantrip) +
          Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip)) /
        2
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.shield.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  sneak_attackBase: (state: State, getters: any) => {
    return (
      Math.round((getters.coordinationBase + getters.quicknessBase) / 3) +
      Helpers.trainingBonus(state.character.skills.sneak_attack.training) +
      state.character.skills.sneak_attack.invested
    );
  },
  sneak_attackBuffed: (state: State, getters: any) => {
    return (
      getters.sneak_attackBase +
      Helpers.buffBonus(state.character.skills.sneak_attack.buff) +
      Helpers.cantripBonus(state.character.skills.sneak_attack.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip) +
          Helpers.buffBonus(state.character.attributes.quickness.buff) + Helpers.cantripBonus(state.character.attributes.quickness.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.sneak_attack.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  summoningBase: (state: State, getters: any) => {
    return (
      Math.round((getters.enduranceBase + getters.selfBase) / 3) +
      Helpers.trainingBonus(state.character.skills.summoning.training) +
      state.character.skills.summoning.invested
    );
  },
  summoningBuffed: (state: State, getters: any) => {
    return (
      getters.summoningBase +
      Helpers.buffBonus(state.character.skills.summoning.buff) +
      Helpers.cantripBonus(state.character.skills.summoning.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.endurance.buff) + Helpers.cantripBonus(state.character.attributes.endurance.cantrip) +
          Helpers.buffBonus(state.character.attributes.self.buff) + Helpers.cantripBonus(state.character.attributes.self.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.summoning.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  two_handed_combatBase: (state: State, getters: any) => {
    return (
      Math.round((getters.strengthBase + getters.coordinationBase) / 3) +
      Helpers.trainingBonus(state.character.skills.two_handed_combat.training) +
      state.character.skills.two_handed_combat.invested
    );
  },
  two_handed_combatBuffed: (state: State, getters: any) => {
    return (
      getters.two_handed_combatBase +
      Helpers.buffBonus(state.character.skills.two_handed_combat.buff) +
      Helpers.cantripBonus(state.character.skills.two_handed_combat.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.strength.buff) + Helpers.cantripBonus(state.character.attributes.strength.cantrip) +
          Helpers.buffBonus(state.character.attributes.coordination.buff) + Helpers.cantripBonus(state.character.attributes.coordination.cantrip)) /
        3
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.two_handed_combat.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  void_magicBase: (state: State, getters: any) => {
    return (
      Math.round((getters.focusBase + getters.selfBase) / 4) +
      Helpers.trainingBonus(state.character.skills.void_magic.training) +
      state.character.skills.void_magic.invested
    );
  },
  void_magicBuffed: (state: State, getters: any) => {
    return (
      getters.void_magicBase +
      Helpers.buffBonus(state.character.skills.void_magic.buff) +
      Helpers.cantripBonus(state.character.skills.void_magic.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip) +
          Helpers.buffBonus(state.character.attributes.self.buff) + Helpers.cantripBonus(state.character.attributes.self.cantrip)) /
        4
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.void_magic.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  war_magicBase: (state: State, getters: any) => {
    return (
      Math.round((getters.focusBase + getters.selfBase) / 4) +
      Helpers.trainingBonus(state.character.skills.war_magic.training) +
      state.character.skills.war_magic.invested
    );
  },
  war_magicBuffed: (state: State, getters: any) => {
    return (
      getters.war_magicBase +
      Helpers.buffBonus(state.character.skills.war_magic.buff) +
      Helpers.cantripBonus(state.character.skills.war_magic.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip) +
          Helpers.buffBonus(state.character.attributes.self.buff) + Helpers.cantripBonus(state.character.attributes.self.cantrip)) /
        4
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.world.invested +
      (state.character.skills.war_magic.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },
  weapon_tinkeringBase: (state: State, getters: any) => {
    return (
      Math.round((getters.focusBase + getters.selfBase) / 2) +
      Helpers.trainingBonus(state.character.skills.weapon_tinkering.training) +
      state.character.skills.weapon_tinkering.invested
    );
  },
  weapon_tinkeringBuffed: (state: State, getters: any) => {
    return (
      getters.weapon_tinkeringBase +
      Helpers.buffBonus(state.character.skills.weapon_tinkering.buff) +
      Helpers.cantripBonus(state.character.skills.weapon_tinkering.cantrip) +
      Math.round(
        (Helpers.buffBonus(state.character.attributes.focus.buff) + Helpers.cantripBonus(state.character.attributes.focus.cantrip) +
          Helpers.buffBonus(state.character.attributes.self.buff) + Helpers.cantripBonus(state.character.attributes.self.cantrip)) /
        2
      ) +
      (state.character.augmentations.jack_of_all_trades.invested === 1 ? 5 : 0) +
      state.character.luminance_auras.craftsman.invested +
      state.character.luminance_auras.world.invested +
      (state.character.skills.weapon_tinkering.training === Training.SPECIALIZED ? state.character.luminance_auras.specialization.invested * 2 : 0)
    );
  },

  specializedSkills: (state: State) => {
    return Object.keys(state.character.skills).filter(
      key =>
        state.character.skills[key].training === Training.SPECIALIZED
    );
  },
  trainedSkills: (state: State) => {
    return Object.keys(state.character.skills).filter(
      key => state.character.skills[key].training === Training.TRAINED
    );
  },
  untrainedSkills: (state: State) => {
    return Object.keys(state.character.skills).filter(
      key =>
        state.character.skills[key].training === Training.UNTRAINED
    );
  },
  unusableSkills: (state: State) => {
    return Object.keys(state.character.skills).filter(
      key =>
        state.character.skills[key].training === Training.UNUSABLE
    );
  }
};
