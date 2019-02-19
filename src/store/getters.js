import Constants from "../constants";
import Helpers from "../helpers";

export default {
  // General
  exportedCharacter: state => {
    return JSON.stringify(state, null, 4);
  },

  totalXPEarned: (state) => {
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
          Constants.COST_LEVEL[i] + e * Constants.COST_LEVEL[275]
        ) {
          return "Requires >= level " + i + (e > 0 ? " and " + e + " time(s) Enlightened": "");
        }
      }
    }

    // We didn't find a solution which means we've Enlightened
    return "LOL";
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
      cost += 20000000 * state.character.timesEnlightened;
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
}
