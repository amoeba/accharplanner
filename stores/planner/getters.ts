export default {
  // UI stuff
  attributesPaneVisible: (state: State) => {
    return state.ui.paneVisibility.attributes
  },
  skillsPaneVisible: (state: State) => {
    return state.ui.paneVisibility.skills
  },
  augmentationsPaneVisible: (state: State) => {
    return state.ui.paneVisibility.augmentations
  },
  aurasPaneVisible: (state: State) => {
    return state.ui.paneVisibility.auras
  },
  itemsPaneVisible: (state: State) => {
    return state.ui.paneVisibility.items
  },
  armorSetsPaneVisible: (state: State) => {
    return state.ui.paneVisibility.armor_sets
  },
  buildStagesPaneVisible: (state: State) => {
    return state.ui.paneVisibility.buildStages
  },
  characterPaneVisible: (state: State) => {
    return state.ui.paneVisibility.character
  },
  xpAndLuminancePaneVisible: (state: State) => {
    return state.ui.paneVisibility.xpAndLuminance
  },
  knobsAndDialsPaneVisible: (state: State) => {
    return state.ui.paneVisibility.knobsAndDials
  },
  extraSkillCreditsPaneVisible: (state: State) => {
    return state.ui.paneVisibility.extraSkillCredits
  },
  // General
  shareStatus: (state: State) => {
    return state.ui.shareStatus
  },
  sharedBuild: (state: State) => {
    return state.ui.sharedBuild
  },
  exportedCharacter: (state: State) => {
    return JSON.stringify(state.build.character, null, 4)
  },

  totalXPEarned: (state: State) => {
    let cost: number = 0

    if (state.settings.infiniteMode && state.build.character.level > 275) {
      cost = Math.round(
        (1 / 9)
        * ((state.build.character.level + 5) ** 5 - 6 ** 5),
      )
    }
    else {
      cost += COST_LEVEL[state.build.character.level]
      cost += state.build.character.timesEnlightened * COST_LEVEL[MAX_LEVEL]
    }

    return cost
  },

  totalXPInvested: (state: State) => {
    let cost = 0

    ATTRIBUTES.forEach((a: string) => {
      cost += COST_ATTRIBUTE[state.build.character.attributes[a].invested]
    })

    VITALS.forEach((v) => {
      cost += COST_VITAL[state.build.character.vitals[v].invested]
    })

    state.specializedSkills.forEach((s: string) => {
      cost += COST_SKILL_SPECIALIZED[state.build.character.skills[s].invested]
    })

    state.trainedSkills.forEach((s: string) => {
      cost += COST_SKILL_TRAINED[state.build.character.skills[s].invested]
    })

    AUGMENTATIONS.forEach((aug: string) => {
      cost
        += AUGMENTATION_COST[aug][
          state.build.character.augmentations[aug].invested
        ]
    })

    // Adjust for free stuff, like racial experience augmentations
    if (
      (state.build.character.race === Race.Aluvian
      || state.build.character.race === Race['Gharu\'ndim']
      || state.build.character.race === Race.Sho
      || state.build.character.race === Race.Viamontian)
      && state.build.character.augmentations.jack_of_all_trades.invested === 1
    ) {
      cost
        -= AUGMENTATION_COST[Augmentation.jack_of_all_trades][
          state.build.character.augmentations.jack_of_all_trades.invested
        ]
    }
    else if (
      state.build.character.race === Race.Empyrean
      && state.build.character.augmentations.infused_life_magic.invested === 1
    ) {
      cost
        -= AUGMENTATION_COST[Augmentation.infused_life_magic][
          state.build.character.augmentations.infused_life_magic.invested
        ]
    }
    else if (
      (state.build.character.race === Race.Umbraen
      || state.build.character.race === Race.Penumbraen)
      && state.build.character.augmentations.eye_of_the_remorseless.invested === 1
    ) {
      cost
        -= AUGMENTATION_COST[Augmentation.eye_of_the_remorseless][
          state.build.character.augmentations.eye_of_the_remorseless.invested
        ]
    }
    else if (
      state.build.character.race === Race.Lugian
      && state.build.character.augmentations.might_of_the_seventh_mule.invested
      === 1
    ) {
      cost
        -= AUGMENTATION_COST[Augmentation.might_of_the_seventh_mule][
          state.build.character.augmentations.might_of_the_seventh_mule.invested
        ]
    }
    else if (
      state.build.character.race === Race.Tumerok
      && state.build.character.augmentations.hand_of_the_remorseless.invested === 1
    ) {
      cost
        -= AUGMENTATION_COST[Augmentation.hand_of_the_remorseless][
          state.build.character.augmentations.hand_of_the_remorseless.invested
        ]
    }

    return cost
  },

  totalXPInvestedError: (state: State) => {
    if (Number.isNaN(state.totalXPInvested)) {
      if (state.settings.infiniteMode)
        return 'XP calculations in Infinite Mode may not work because I haven\'t brough in the formulas. If you have good ones, let me know.'
      else return 'Calculating total invested experience failed for an unknown reason. Please file a bug report.'
    }
    else {
      return false
    }
  },

  unassignedXP: (state: State) => {
    const diff = state.totalXPEarned - state.totalXPInvested

    if (diff < 0)
      return 0

    return diff
  },

  unassignedXPError: (state: State) => {
    if (Number.isNaN(state.totalXPInvested)) {
      if (state.settings.infiniteMode)
        return 'XP calculations in Infinite Mode may not work because I haven\'t brough in the formulas. If you have good ones, let me know.'
      else return 'Calculating unassigned experience failed for an unknown reason. Please file a bug report.'
    }
    else {
      return false
    }
  },

  requiredLevel: (state: State) => {
    let by_cost = 1
    let by_skill_points = 1

    for (let i: number = 1; i <= MAX_LEVEL; i++) {
      if (state.totalXPInvested <= COST_LEVEL[i]) {
        by_cost = i
        break
      }
    }

    if (state.skillPointsSpent > state.skillPointsAvailable) {
      for (let j: number = 1; j <= MAX_LEVEL; j++) {
        if (SKILL_POINTS_AT_LEVEL[j] >= state.skillPointsSpent) {
          by_skill_points = j
          break
        }
      }
    }

    if (by_cost < by_skill_points)
      return by_skill_points
    else return by_cost
  },

  skillPointsAvailable: (state: State) => {
    return (
      SKILL_POINTS_AT_LEVEL[state.build.character.level]
      + (state.build.character.extraSkillCredits.railrea ? 1 : 0)
      + (state.build.character.extraSkillCredits.oswald ? 1 : 0)
      + state.build.character.luminance_auras.skill.invested
    )
  },

  skillPointsSpent(state: State): number {
    let cost: number = 0

    Object.keys(Skill).forEach((skillName: string): void => {
      const training: string = state.build.character.skills[skillName].training

      if (training === Training.SPECIALIZED || training === Training.TRAINED)
        cost += SKILL_COST_AT_TRAINING[skillName][training]
    })

    return cost
  },

  augmentationsSpent: (state: State) => {
    let cost = 0

    Object.keys(SPEC_COSTS_AUG).forEach((skill: string) => {
      if (
        state.build.character.skills[skill]
        && state.build.character.skills[skill].training === Training.SPECIALIZED
        && SPEC_COSTS_AUG[skill]
      ) cost += 1
    })

    return cost
  },

  totalLuminanceXPSpent: (state: State) => {
    let cost = 0

    Object.keys(SPEC_COSTS_AUG).forEach((skill) => {
      if (
        state.build.character.skills[skill]
        && state.build.character.skills[skill].training === Training.SPECIALIZED
        && SPEC_COSTS_AUG[skill]
      ) cost += 1000000000
    })

    // Add in cost of the auras that are selected
    Object.keys(LUMINANCE_AURA_COST).forEach((aura) => {
      cost
        += LUMINANCE_AURA_COST[aura][
          state.build.character.luminance_auras[aura].invested
        ]
    })

    // Enlightenment requires you get all lum auras (20mil xp)
    // TODO: Track auras and this together
    if (state.build.character.timesEnlightened > 0)
      cost += 20000000 * state.build.character.timesEnlightened

    return cost
  },

  specializedSkillPointsSpent: (state: State) => {
    let cost = 0

    state.specializedSkills.forEach((skill: string) => {
      if (SPEC_COSTS_AUG[skill])
        return

      cost += SKILL_COST_AT_TRAINING[skill][Training.SPECIALIZED]
    })

    return cost
  },

  // Attributes
  attributePointsSpent: (state: State) => {
    let spent = 0

    Object.keys(Attribute).forEach((attribute) => {
      spent += state.build.character.attributes[attribute].creation
    })

    return spent
  },
  attributePointsAvailable: (state: State) => {
    return (
      MAX_CREATION_ATTRIBUTE_TOTAL_POINTS
      + state.build.character.augmentations.reinforcement_of_the_lugians
        .invested
        * 5
        + state.build.character.augmentations.bleearghs_fortitude.invested * 5
        + state.build.character.augmentations.oswalds_enhancement.invested * 5
        + state.build.character.augmentations.siraluuns_blessing.invested * 5
        + state.build.character.augmentations.enduring_calm.invested * 5
        + state.build.character.augmentations.steadfast_will.invested * 5
    )
  },
  attributesAndVitalsErrors: (state: State) => {
    const totalAttributeBonus
      = state.build.character.augmentations.reinforcement_of_the_lugians
        .invested
        * 5
        + state.build.character.augmentations.bleearghs_fortitude.invested * 5
        + state.build.character.augmentations.oswalds_enhancement.invested * 5
        + state.build.character.augmentations.siraluuns_blessing.invested * 5
        + state.build.character.augmentations.enduring_calm.invested * 5
        + state.build.character.augmentations.steadfast_will.invested * 5

    if (totalAttributeBonus > 50)
      return 'Cannot raise innate attributes above 380 total!'

    // Check we haven't spent too many attribute points
    if (state.attributePointsSpent > state.attributePointsAvailable)
      return 'You have overspent on attribute points!'
  },
  strengthInnate: (state: State) => {
    const value = state.build.character.attributes.strength.creation

    if (value > 100)
      return 100
    else return value
  },
  strengthBase: (state: State) => {
    return (
      state.strengthInnate + state.build.character.attributes.strength.invested
    )
  },
  strengthBuffed: (state: State) => {
    return (
      state.strengthBase
      + buffBonus(state.build.character.attributes.strength.buff)
      + cantripBonus(state.build.character.attributes.strength.cantrip)
      + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
      + dedicationSetBonus(state.build.character.armor_sets.dedication.equipped)
      + (state.build.character.items.font_of_joji ? 2 : 0) // Power of the Dragon
    )
  },
  enduranceInnate: (state: State) => {
    const value = state.build.character.attributes.endurance.creation

    if (value > 100)
      return 100
    else return value
  },
  enduranceBase: (state: State) => {
    return (
      state.enduranceInnate
      + state.build.character.attributes.endurance.invested
    )
  },
  enduranceBuffed: (state: State) => {
    return (
      state.enduranceBase
      + buffBonus(state.build.character.attributes.endurance.buff)
      + cantripBonus(state.build.character.attributes.endurance.cantrip)
      + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
      + dedicationSetBonus(state.build.character.armor_sets.dedication.equipped)
    )
  },
  coordinationInnate: (state: State) => {
    const value = state.build.character.attributes.coordination.creation

    if (value > 100)
      return 100
    else return value
  },
  coordinationBase: (state: State) => {
    return (
      state.coordinationInnate
      + state.build.character.attributes.coordination.invested
    )
  },
  coordinationBuffed: (state: State) => {
    return (
      state.coordinationBase
      + buffBonus(state.build.character.attributes.coordination.buff)
      + cantripBonus(state.build.character.attributes.coordination.cantrip)
      + (state.build.character.items.font_of_joji ? 2 : 0) // Grace of the Unicorn
      + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
      + standardSecondarySetBonus(
        state.build.character.armor_sets.swift.equipped,
      )
      + dedicationSetBonus(state.build.character.armor_sets.dedication.equipped)
    )
  },
  quicknessInnate: (state: State) => {
    const value = state.build.character.attributes.quickness.creation

    if (value > 100)
      return 100
    else return value
  },
  quicknessBase: (state: State) => {
    return (
      state.quicknessInnate
      + state.build.character.attributes.quickness.invested
    )
  },
  quicknessBuffed: (state: State) => {
    return (
      state.quicknessBase
      + buffBonus(state.build.character.attributes.quickness.buff)
      + cantripBonus(state.build.character.attributes.quickness.cantrip)
      + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
      + dedicationSetBonus(state.build.character.armor_sets.dedication.equipped)
    )
  },
  focusInnate: (state: State) => {
    const value = state.build.character.attributes.focus.creation

    if (value > 100)
      return 100
    else return value
  },
  focusBase: (state: State) => {
    return state.focusInnate + state.build.character.attributes.focus.invested
  },
  focusBuffed: (state: State) => {
    return (
      state.focusBase
      + buffBonus(state.build.character.attributes.focus.buff)
      + cantripBonus(state.build.character.attributes.focus.cantrip)
      + standardSetBonus(state.build.character.armor_sets.wise.equipped)
      + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
      + (state.build.character.items.font_of_joji ? 2 : 0) // Splendor of the Firebird
      + dedicationSetBonus(state.build.character.armor_sets.dedication.equipped)
    )
  },
  selfInnate: (state: State) => {
    const value = state.build.character.attributes.self.creation

    if (value > 100)
      return 100
    else return value
  },
  selfBase: (state: State) => {
    return state.selfInnate + state.build.character.attributes.self.invested
  },
  selfBuffed: (state: State) => {
    return (
      state.selfBase
      + buffBonus(state.build.character.attributes.self.buff)
      + cantripBonus(state.build.character.attributes.self.cantrip)
      + standardSetBonus(state.build.character.armor_sets.wise.equipped)
      + dedicationSetBonus(state.build.character.armor_sets.dedication.equipped)
    )
  },

  // Vitals
  healthBase: (state: State) => {
    return (
      Math.round(state.enduranceBase / 2)
      + state.build.character.vitals.health.invested
    )
  },
  healthBuffed: (state: State) => {
    const benediction_bonus
      = state.build.character.augmentations.asherons_lesser_benediction
        .invested === 1
        || state.build.character.augmentations.asherons_benediction.invested === 1
        ? 1.1
        : 1

    return (
      (state.healthBase
      + state.build.character.timesEnlightened * 2
      + buffBonus(state.build.character.vitals.health.buff)
      + buffBonus(state.build.character.attributes.endurance.buff) / 2
      + cantripBonus(state.build.character.vitals.health.cantrip)
      + cantripBonus(state.build.character.attributes.endurance.cantrip) / 2
      + standardSetBonus(state.build.character.armor_sets.hearty.equipped) / 2
      + standardSecondarySetBonus(
        state.build.character.armor_sets.hearty.equipped,
      )
      + dedicationSetBonus(
        state.build.character.armor_sets.dedication.equipped,
      )
      / 2)
      * benediction_bonus
    )
  },
  staminaCreation: (state: State) => {
    return state.build.character.attributes.endurance.creation
  },
  staminaBase: (state: State) => {
    return state.enduranceBase + state.build.character.vitals.stamina.invested
  },
  staminaBuffed: (state: State) => {
    return (
      state.staminaBase
      + buffBonus(state.build.character.vitals.stamina.buff)
      + buffBonus(state.build.character.attributes.endurance.buff)
      + cantripBonus(state.build.character.vitals.stamina.cantrip)
      + cantripBonus(state.build.character.attributes.endurance.cantrip)
      + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
      + standardSecondarySetBonus(
        state.build.character.armor_sets.dextrous.equipped,
      )
      + dedicationSetBonus(state.build.character.armor_sets.dedication.equipped)
    )
  },
  manaCreation: (state: State) => {
    return state.build.character.attributes.self.creation
  },
  manaBase: (state: State) => {
    return state.selfBase + state.build.character.vitals.mana.invested
  },
  manaBuffed: (state: State) => {
    return clamp(
      state.manaBase
      + buffBonus(state.build.character.vitals.mana.buff)
      + buffBonus(state.build.character.attributes.self.buff)
      + cantripBonus(state.build.character.vitals.mana.cantrip)
      + cantripBonus(state.build.character.attributes.self.cantrip)
      + standardSetBonus(state.build.character.armor_sets.wise.equipped)
      + wiseSetManaBonus(state.build.character.armor_sets.wise.equipped)
      + dedicationSetBonus(
        state.build.character.armor_sets.dedication.equipped,
      )
      + (state.build.character.items.focusing_stone ? -50 : 0), // Malediction
      0,
    )
  },

  // Skills
  alchemyBase: (state: State) => {
    if (state.build.character.skills.alchemy.training === Training.UNUSABLE)
      return 0

    return (
      Math.round((state.coordinationBase + state.focusBase) / 3)
      + trainingBonus(state.build.character.skills.alchemy.training)
      + state.build.character.skills.alchemy.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  alchemyBuffed: (state: State) => {
    return (
      (state.build.character.skills.alchemy.training !== Training.UNUSABLE
        ? state.alchemyBase
        : 0)
        + buffBonus(state.build.character.skills.alchemy.buff)
        + cantripBonus(state.build.character.skills.alchemy.cantrip)
        + standardSetBonus(state.build.character.armor_sets.crafters.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          )
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.alchemy.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  arcane_loreBase: (state: State) => {
    if (
      state.build.character.skills.arcane_lore.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round(state.focusBase / 3)
      + trainingBonus(state.build.character.skills.arcane_lore.training)
      + state.build.character.skills.arcane_lore.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  arcane_loreBuffed: (state: State) => {
    return (
      (state.build.character.skills.arcane_lore.training !== Training.UNUSABLE
        ? state.arcane_loreBase
        : 0)
        + buffBonus(state.build.character.skills.arcane_lore.buff)
        + cantripBonus(state.build.character.skills.arcane_lore.cantrip)
        + Math.round(
          (buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.arcane_lore.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  armor_tinkeringBase: (state: State) => {
    if (
      state.build.character.skills.armor_tinkering.training
      === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.enduranceBase + state.focusBase) / 2)
      + trainingBonus(state.build.character.skills.armor_tinkering.training)
      + state.build.character.skills.armor_tinkering.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  armor_tinkeringBuffed: (state: State) => {
    return (
      (state.build.character.skills.armor_tinkering.training
      !== Training.UNUSABLE
        ? state.armor_tinkeringBase
        : 0)
        + buffBonus(state.build.character.skills.armor_tinkering.buff)
        + cantripBonus(state.build.character.skills.armor_tinkering.cantrip)
        + standardSetBonus(state.build.character.armor_sets.tinkers.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.endurance.buff)
          + cantripBonus(state.build.character.attributes.endurance.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0))
          / 2,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.armor_tinkering.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  assess_creatureBase: (state: State) => {
    if (
      state.build.character.skills.assess_creature.training
      === Training.UNUSABLE
    ) return 0

    return (
      trainingBonus(state.build.character.skills.assess_creature.training)
      + state.build.character.skills.assess_creature.invested
      + state.build.character.timesEnlightened
    )
  },
  assess_creatureBuffed: (state: State) => {
    return (
      (state.build.character.skills.assess_creature.training
      !== Training.UNUSABLE
        ? state.assess_creatureBase
        : 0)
        + buffBonus(state.build.character.skills.assess_creature.buff)
        + cantripBonus(state.build.character.skills.assess_creature.cantrip)
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.assess_creature.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  assess_personBase: (state: State) => {
    if (
      state.build.character.skills.assess_person.training === Training.UNUSABLE
    ) return 0

    return (
      trainingBonus(state.build.character.skills.assess_person.training)
      + state.build.character.skills.assess_person.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  assess_personBuffed: (state: State) => {
    return (
      (state.build.character.skills.assess_person.training !== Training.UNUSABLE
        ? state.assess_personBase
        : 0)
        + buffBonus(state.build.character.skills.assess_person.buff)
        + cantripBonus(state.build.character.skills.assess_person.cantrip)
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.assess_person.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  cookingBase: (state: State) => {
    if (state.build.character.skills.cooking.training === Training.UNUSABLE)
      return 0

    return (
      Math.round((state.coordinationBase + state.focusBase) / 3)
      + trainingBonus(state.build.character.skills.cooking.training)
      + state.build.character.skills.cooking.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  cookingBuffed: (state: State) => {
    return (
      (state.build.character.skills.cooking.training !== Training.UNUSABLE
        ? state.cookingBase
        : 0)
        + buffBonus(state.build.character.skills.cooking.buff)
        + cantripBonus(state.build.character.skills.cooking.cantrip)
        + standardSetBonus(state.build.character.armor_sets.crafters.equipped)
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.cooking.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
            + Math.round(
              (buffBonus(state.build.character.attributes.coordination.buff)
              + cantripBonus(state.build.character.attributes.coordination.cantrip)
              + dedicationSetBonus(
                state.build.character.armor_sets.dedication.equipped,
              )
              + standardSecondarySetBonus(
                state.build.character.armor_sets.swift.equipped,
              )
              + (state.build.character.items.font_of_joji ? 2 : 0)
              + buffBonus(state.build.character.attributes.focus.buff)
              + cantripBonus(state.build.character.attributes.focus.cantrip)
              + dedicationSetBonus(
                state.build.character.armor_sets.dedication.equipped,
              )
              + standardSetBonus(state.build.character.armor_sets.wise.equipped)
              + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
              + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
              + (state.build.character.items.font_of_joji ? 2 : 0))
              / 3,
            )
    )
  },
  creature_enchantmentBase: (state: State) => {
    if (
      state.build.character.skills.creature_enchantment.training
      === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.focusBase + state.selfBase) / 4)
      + trainingBonus(
        state.build.character.skills.creature_enchantment.training,
      )
      + state.build.character.skills.creature_enchantment.invested
      + (state.build.character.augmentations.master_of_the_five_fold_path
        .invested === 1
        ? 10
        : 0)
        + state.build.character.luminance_auras.world.invested
        + state.build.character.timesEnlightened
    )
  },
  creature_enchantmentBuffed: (state: State) => {
    return (
      (state.build.character.skills.creature_enchantment.training
      !== Training.UNUSABLE
        ? state.creature_enchantmentBase
        : 0)
        + buffBonus(state.build.character.skills.creature_enchantment.buff)
        + cantripBonus(state.build.character.skills.creature_enchantment.cantrip)
        + standardSetBonus(state.build.character.armor_sets.adepts.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.self.buff)
          + cantripBonus(state.build.character.attributes.self.cantrip)
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          ))
          / 4,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.creature_enchantment.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  deceptionBase: (state: State) => {
    if (state.build.character.skills.deception.training === Training.UNUSABLE)
      return 0

    return (
      trainingBonus(state.build.character.skills.deception.training)
      + state.build.character.skills.deception.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  deceptionBuffed: (state: State) => {
    return (
      (state.build.character.skills.deception.training !== Training.UNUSABLE
        ? state.deceptionBase
        : 0)
        + buffBonus(state.build.character.skills.deception.buff)
        + cantripBonus(state.build.character.skills.deception.cantrip)
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.deception.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  dirty_fightingBase: (state: State) => {
    if (
      state.build.character.skills.dirty_fighting.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.strengthBase + state.coordinationBase) / 3)
      + trainingBonus(state.build.character.skills.dirty_fighting.training)
      + state.build.character.skills.dirty_fighting.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  dirty_fightingBuffed: (state: State) => {
    return (
      (state.build.character.skills.dirty_fighting.training
      !== Training.UNUSABLE
        ? state.dirty_fightingBase
        : 0)
        + buffBonus(state.build.character.skills.dirty_fighting.buff)
        + cantripBonus(state.build.character.skills.dirty_fighting.cantrip)
        + standardSetBonus(state.build.character.armor_sets.soldiers.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.strength.buff)
          + cantripBonus(state.build.character.attributes.strength.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.dirty_fighting.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  dual_wieldBase: (state: State) => {
    if (
      state.build.character.skills.dual_wield.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.coordinationBase + state.coordinationBase) / 3)
      + trainingBonus(state.build.character.skills.dual_wield.training)
      + state.build.character.skills.dual_wield.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  dual_wieldBuffed: (state: State) => {
    return (
      (state.build.character.skills.dual_wield.training !== Training.UNUSABLE
        ? state.dual_wieldBase
        : 0)
        + buffBonus(state.build.character.skills.dual_wield.buff)
        + cantripBonus(state.build.character.skills.dual_wield.cantrip)
        + standardSetBonus(state.build.character.armor_sets.swift.equipped)
        + Math.round(
          (2 * buffBonus(state.build.character.attributes.coordination.buff)
          + 2
          * cantripBonus(
            state.build.character.attributes.coordination.cantrip,
          )
          + 2 * (state.build.character.items.font_of_joji ? 2 : 0)
          + 2
          * standardSetBonus(
            state.build.character.armor_sets.dextrous.equipped,
          )
          + 2
          * standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          )
          + 2
          * dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          ))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.dual_wield.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  finesse_weaponsBase: (state: State) => {
    if (
      state.build.character.skills.finesse_weapons.training
      === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.coordinationBase + state.quicknessBase) / 3)
      + trainingBonus(state.build.character.skills.finesse_weapons.training)
      + state.build.character.skills.finesse_weapons.invested
      + (state.build.character.augmentations.master_of_the_steel_circle
        .invested === 1
        ? 10
        : 0)
        + state.build.character.luminance_auras.world.invested
        + state.build.character.timesEnlightened
    )
  },
  finesse_weaponsBuffed: (state: State) => {
    return (
      (state.build.character.skills.finesse_weapons.training
      !== Training.UNUSABLE
        ? state.finesse_weaponsBase
        : 0)
        + buffBonus(state.build.character.skills.finesse_weapons.buff)
        + cantripBonus(state.build.character.skills.finesse_weapons.cantrip)
        + standardSetBonus(state.build.character.armor_sets.swift.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.quickness.buff)
          + cantripBonus(state.build.character.attributes.quickness.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + 2
          * standardSetBonus(
            state.build.character.armor_sets.dextrous.equipped,
          )
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.finesse_weapons.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  fletchingBase: (state: State) => {
    if (state.build.character.skills.fletching.training === Training.UNUSABLE)
      return 0

    return (
      Math.round((state.coordinationBase + state.focusBase) / 3)
      + trainingBonus(state.build.character.skills.fletching.training)
      + state.build.character.skills.fletching.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  fletchingBuffed: (state: State) => {
    return (
      (state.build.character.skills.fletching.training !== Training.UNUSABLE
        ? state.fletchingBase
        : 0)
        + buffBonus(state.build.character.skills.fletching.buff)
        + cantripBonus(state.build.character.skills.fletching.cantrip)
        + standardSetBonus(state.build.character.armor_sets.crafters.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.fletching.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  healingBase: (state: State) => {
    if (state.build.character.skills.healing.training === Training.UNUSABLE)
      return 0

    return (
      Math.round((state.coordinationBase + state.focusBase) / 3)
      + trainingBonus(state.build.character.skills.healing.training)
      + state.build.character.skills.healing.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  healingBuffed: (state: State) => {
    return (
      (state.build.character.skills.healing.training !== Training.UNUSABLE
        ? state.healingBase
        : 0)
        + buffBonus(state.build.character.skills.healing.buff)
        + cantripBonus(state.build.character.skills.healing.cantrip)
        + Math.round(
          (buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          )
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.healing.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  heavy_weaponsBase: (state: State) => {
    if (
      state.build.character.skills.heavy_weapons.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.strengthBase + state.coordinationBase) / 3)
      + trainingBonus(state.build.character.skills.heavy_weapons.training)
      + state.build.character.skills.heavy_weapons.invested
      + (state.build.character.augmentations.master_of_the_steel_circle
        .invested === 1
        ? 10
        : 0)
        + state.build.character.luminance_auras.world.invested
        + state.build.character.timesEnlightened
    )
  },
  heavy_weaponsBuffed: (state: State) => {
    return (
      (state.build.character.skills.heavy_weapons.training !== Training.UNUSABLE
        ? state.heavy_weaponsBase
        : 0)
        + buffBonus(state.build.character.skills.heavy_weapons.buff)
        + cantripBonus(state.build.character.skills.heavy_weapons.cantrip)
        + standardSetBonus(state.build.character.armor_sets.soldiers.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.strength.buff)
          + cantripBonus(state.build.character.attributes.strength.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.heavy_weapons.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  item_enchantmentBase: (state: State) => {
    if (
      state.build.character.skills.item_enchantment.training
      === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.focusBase + state.selfBase) / 4)
      + trainingBonus(state.build.character.skills.item_enchantment.training)
      + state.build.character.skills.item_enchantment.invested
      + (state.build.character.augmentations.master_of_the_five_fold_path
        .invested === 1
        ? 10
        : 0)
        + state.build.character.luminance_auras.world.invested
        + state.build.character.timesEnlightened
    )
  },
  item_enchantmentBuffed: (state: State) => {
    return (
      (state.build.character.skills.item_enchantment.training
      !== Training.UNUSABLE
        ? state.item_enchantmentBase
        : 0)
        + buffBonus(state.build.character.skills.item_enchantment.buff)
        + cantripBonus(state.build.character.skills.item_enchantment.cantrip)
        + standardSetBonus(state.build.character.armor_sets.adepts.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.self.buff)
          + cantripBonus(state.build.character.attributes.self.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped))
          / 4,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.item_enchantment.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  item_tinkeringBase: (state: State) => {
    if (
      state.build.character.skills.item_tinkering.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.coordinationBase + state.focusBase) / 2)
      + trainingBonus(state.build.character.skills.item_tinkering.training)
      + state.build.character.skills.item_tinkering.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  item_tinkeringBuffed: (state: State) => {
    return (
      (state.build.character.skills.item_tinkering.training
      !== Training.UNUSABLE
        ? state.item_tinkeringBase
        : 0)
        + buffBonus(state.build.character.skills.item_tinkering.buff)
        + cantripBonus(state.build.character.skills.item_tinkering.cantrip)
        + standardSetBonus(state.build.character.armor_sets.tinkers.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 2,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.item_tinkering.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  jumpBase: (state: State) => {
    if (state.build.character.skills.jump.training === Training.UNUSABLE)
      return 0

    return (
      Math.round((state.strengthBase + state.coordinationBase) / 2)
      + trainingBonus(state.build.character.skills.jump.training)
      + state.build.character.skills.jump.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  jumpBuffed: (state: State) => {
    return (
      (state.build.character.skills.jump.training !== Training.UNUSABLE
        ? state.jumpBase
        : 0)
        + buffBonus(state.build.character.skills.jump.buff)
        + cantripBonus(state.build.character.skills.jump.cantrip)
        + standardSetBonus(state.build.character.armor_sets.swift.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.strength.buff)
          + cantripBonus(state.build.character.attributes.strength.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 2,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.jump.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  leadershipBase: (state: State) => {
    if (
      state.build.character.skills.leadership.training === Training.UNUSABLE
    ) return 0

    return (
      trainingBonus(state.build.character.skills.leadership.training)
      + state.build.character.skills.leadership.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  leadershipBuffed: (state: State) => {
    return (
      (state.build.character.skills.leadership.training !== Training.UNUSABLE
        ? state.leadershipBase
        : 0)
        + buffBonus(state.build.character.skills.leadership.buff)
        + cantripBonus(state.build.character.skills.leadership.cantrip)
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.leadership.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  life_magicBase: (state: State) => {
    if (
      state.build.character.skills.life_magic.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.focusBase + state.selfBase) / 4)
      + trainingBonus(state.build.character.skills.life_magic.training)
      + state.build.character.skills.life_magic.invested
      + (state.build.character.augmentations.master_of_the_five_fold_path
        .invested === 1
        ? 10
        : 0)
        + state.build.character.luminance_auras.world.invested
        + state.build.character.timesEnlightened
    )
  },
  life_magicBuffed: (state: State) => {
    return (
      (state.build.character.skills.life_magic.training !== Training.UNUSABLE
        ? state.life_magicBase
        : 0)
        + buffBonus(state.build.character.skills.life_magic.buff)
        + cantripBonus(state.build.character.skills.life_magic.cantrip)
        + standardSetBonus(state.build.character.armor_sets.adepts.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.self.buff)
          + cantripBonus(state.build.character.attributes.self.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped))
          / 4,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.life_magic.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  light_weaponsBase: (state: State) => {
    if (
      state.build.character.skills.light_weapons.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.strengthBase + state.coordinationBase) / 3)
      + trainingBonus(state.build.character.skills.light_weapons.training)
      + state.build.character.skills.light_weapons.invested
      + (state.build.character.augmentations.master_of_the_steel_circle
        .invested === 1
        ? 10
        : 0)
        + state.build.character.luminance_auras.world.invested
        + state.build.character.timesEnlightened
    )
  },
  light_weaponsBuffed: (state: State) => {
    return (
      (state.build.character.skills.light_weapons.training !== Training.UNUSABLE
        ? state.light_weaponsBase
        : 0)
        + buffBonus(state.build.character.skills.light_weapons.buff)
        + cantripBonus(state.build.character.skills.light_weapons.cantrip)
        + standardSetBonus(state.build.character.armor_sets.soldiers.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.strength.buff)
          + cantripBonus(state.build.character.attributes.strength.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.light_weapons.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  lockpickBase: (state: State) => {
    if (state.build.character.skills.lockpick.training === Training.UNUSABLE)
      return 0

    return (
      Math.round((state.coordinationBase + state.focusBase) / 3)
      + trainingBonus(state.build.character.skills.lockpick.training)
      + state.build.character.skills.lockpick.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  lockpickBuffed: (state: State) => {
    return (
      (state.build.character.skills.lockpick.training !== Training.UNUSABLE
        ? state.lockpickBase
        : 0)
        + buffBonus(state.build.character.skills.lockpick.buff)
        + cantripBonus(state.build.character.skills.lockpick.cantrip)
        + standardSetBonus(state.build.character.armor_sets.crafters.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.lockpick.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  loyaltyBase: (state: State) => {
    if (state.build.character.skills.loyalty.training === Training.UNUSABLE)
      return 0

    return (
      trainingBonus(state.build.character.skills.loyalty.training)
      + state.build.character.skills.loyalty.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  loyaltyBuffed: (state: State) => {
    return (
      (state.build.character.skills.loyalty.training !== Training.UNUSABLE
        ? state.loyaltyBase
        : 0)
        + buffBonus(state.build.character.skills.loyalty.buff)
        + cantripBonus(state.build.character.skills.loyalty.cantrip)
        + standardSecondarySetBonus(
          state.build.character.armor_sets.crafters.equipped,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.loyalty.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  magic_defenseBase: (state: State) => {
    if (
      state.build.character.skills.magic_defense.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.focusBase + state.selfBase) / 7)
      + trainingBonus(state.build.character.skills.magic_defense.training)
      + state.build.character.skills.magic_defense.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  magic_defenseBuffed: (state: State) => {
    return (
      (state.build.character.skills.magic_defense.training !== Training.UNUSABLE
        ? state.magic_defenseBase
        : 0)
        + buffBonus(state.build.character.skills.magic_defense.buff)
        + cantripBonus(state.build.character.skills.magic_defense.cantrip)
        + standardSecondarySetBonus(
          state.build.character.armor_sets.adepts.equipped,
        )
        + standardSetBonus(state.build.character.armor_sets.defenders.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.self.buff)
          + cantripBonus(state.build.character.attributes.self.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped))
          / 7,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.magic_defense.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  magic_item_tinkeringBase: (state: State) => {
    if (
      state.build.character.skills.magic_item_tinkering.training
      === Training.UNUSABLE
    ) return 0

    return (
      state.focusBase
      + trainingBonus(
        state.build.character.skills.magic_item_tinkering.training,
      )
      + state.build.character.skills.magic_item_tinkering.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  magic_item_tinkeringBuffed: (state: State) => {
    return (
      (state.build.character.skills.magic_item_tinkering.training
      !== Training.UNUSABLE
        ? state.magic_item_tinkeringBase
        : 0)
        + buffBonus(state.build.character.skills.magic_item_tinkering.buff)
        + cantripBonus(state.build.character.skills.magic_item_tinkering.cantrip)
        + dedicationSetBonus(state.build.character.armor_sets.dedication.equipped)
        + standardSetBonus(state.build.character.armor_sets.tinkers.equipped)
        + buffBonus(state.build.character.attributes.focus.buff)
        + cantripBonus(state.build.character.attributes.focus.cantrip)
        + standardSetBonus(state.build.character.armor_sets.wise.equipped)
        + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
        + (state.build.character.items.font_of_joji ? 2 : 0)
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.magic_item_tinkering.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  mana_conversionBase: (state: State) => {
    if (
      state.build.character.skills.mana_conversion.training
      === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.focusBase + state.selfBase) / 6)
      + trainingBonus(state.build.character.skills.mana_conversion.training)
      + state.build.character.skills.mana_conversion.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  mana_conversionBuffed: (state: State) => {
    return (
      (state.build.character.skills.mana_conversion.training
      !== Training.UNUSABLE
        ? state.mana_conversionBase
        : 0)
        + buffBonus(state.build.character.skills.mana_conversion.buff)
        + cantripBonus(state.build.character.skills.mana_conversion.cantrip)
        + Math.round(
          (buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.self.buff)
          + cantripBonus(state.build.character.attributes.self.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped))
          / 6,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.mana_conversion.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  melee_defenseBase: (state: State) => {
    if (
      state.build.character.skills.melee_defense.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.coordinationBase + state.quicknessBase) / 3)
      + trainingBonus(state.build.character.skills.melee_defense.training)
      + state.build.character.skills.melee_defense.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  melee_defenseBuffed: (state: State) => {
    return (
      (state.build.character.skills.melee_defense.training !== Training.UNUSABLE
        ? state.melee_defenseBase
        : 0)
        + buffBonus(state.build.character.skills.melee_defense.buff)
        + cantripBonus(state.build.character.skills.melee_defense.cantrip)
        + standardSetBonus(state.build.character.armor_sets.defenders.equipped)
        + standardSecondarySetBonus(
          state.build.character.armor_sets.soldiers.equipped,
        )
        + Math.round(
          (buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.quickness.buff)
          + cantripBonus(state.build.character.attributes.quickness.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + 2
          * standardSetBonus(
            state.build.character.armor_sets.dextrous.equipped,
          )
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.melee_defense.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  missile_defenseBase: (state: State) => {
    if (
      state.build.character.skills.missile_defense.training
      === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.coordinationBase + state.quicknessBase) / 5)
      + trainingBonus(state.build.character.skills.missile_defense.training)
      + state.build.character.skills.missile_defense.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  missile_defenseBuffed: (state: State) => {
    return (
      (state.build.character.skills.missile_defense.training
      !== Training.UNUSABLE
        ? state.missile_defenseBase
        : 0)
        + buffBonus(state.build.character.skills.missile_defense.buff)
        + cantripBonus(state.build.character.skills.missile_defense.cantrip)
        + standardSetBonus(state.build.character.armor_sets.defenders.equipped)
        + standardSecondarySetBonus(
          state.build.character.armor_sets.archers.equipped,
        )
        + Math.round(
          (buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.quickness.buff)
          + cantripBonus(state.build.character.attributes.quickness.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + 2
          * standardSetBonus(
            state.build.character.armor_sets.dextrous.equipped,
          )
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 5,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.missile_defense.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  missile_weaponsBase: (state: State) => {
    if (
      state.build.character.skills.missile_weapons.training
      === Training.UNUSABLE
    ) return 0

    return (
      Math.round(state.coordinationBase / 2)
      + trainingBonus(state.build.character.skills.missile_weapons.training)
      + state.build.character.skills.missile_weapons.invested
      + (state.build.character.augmentations.master_of_the_focused_eye
        .invested === 1
        ? 10
        : 0)
        + state.build.character.luminance_auras.world.invested
        + state.build.character.timesEnlightened
    )
  },
  missile_weaponsBuffed: (state: State) => {
    return (
      (state.build.character.skills.missile_weapons.training
      !== Training.UNUSABLE
        ? state.missile_weaponsBase
        : 0)
        + buffBonus(state.build.character.skills.missile_weapons.buff)
        + cantripBonus(state.build.character.skills.missile_weapons.cantrip)
        + standardSetBonus(state.build.character.armor_sets.archers.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 2,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.missile_weapons.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  recklessnessBase: (state: State) => {
    if (
      state.build.character.skills.recklessness.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.strengthBase + state.quicknessBase) / 3)
      + trainingBonus(state.build.character.skills.recklessness.training)
      + state.build.character.skills.recklessness.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  recklessnessBuffed: (state: State) => {
    return (
      (state.build.character.skills.recklessness.training !== Training.UNUSABLE
        ? state.recklessnessBase
        : 0)
        + buffBonus(state.build.character.skills.recklessness.buff)
        + cantripBonus(state.build.character.skills.recklessness.cantrip)
        + standardSetBonus(state.build.character.armor_sets.soldiers.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.strength.buff)
          + cantripBonus(state.build.character.attributes.strength.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.quickness.buff)
          + cantripBonus(state.build.character.attributes.quickness.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.hearty.equipped))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.recklessness.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  runBase: (state: State) => {
    if (state.build.character.skills.run.training === Training.UNUSABLE)
      return 0

    return (
      state.quicknessBase
      + trainingBonus(state.build.character.skills.run.training)
      + state.build.character.skills.run.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  runBuffed: (state: State) => {
    return (
      (state.build.character.skills.run.training !== Training.UNUSABLE
        ? state.runBase
        : 0)
        + buffBonus(state.build.character.skills.run.buff)
        + cantripBonus(state.build.character.skills.run.cantrip)
        + dedicationSetBonus(state.build.character.armor_sets.dedication.equipped)
        + standardSetBonus(state.build.character.armor_sets.swift.equipped)
        + buffBonus(state.build.character.attributes.quickness.buff)
        + cantripBonus(state.build.character.attributes.quickness.cantrip)
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.run.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  salvagingBase: (state: State) => {
    if (state.build.character.skills.salvaging.training === Training.UNUSABLE)
      return 0

    return (
      trainingBonus(state.build.character.skills.salvaging.training)
      + state.build.character.skills.salvaging.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  salvagingBuffed: (state: State) => {
    return (
      (state.build.character.skills.salvaging.training !== Training.UNUSABLE
        ? state.salvagingBase
        : 0)
        + buffBonus(state.build.character.skills.salvaging.buff)
        + cantripBonus(state.build.character.skills.salvaging.cantrip)
        + standardSecondarySetBonus(
          state.build.character.armor_sets.tinkers.equipped,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.salvaging.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  shieldBase: (state: State) => {
    if (state.build.character.skills.shield.training === Training.UNUSABLE)
      return 0

    return (
      Math.round((state.strengthBase + state.coordinationBase) / 2)
      + trainingBonus(state.build.character.skills.shield.training)
      + state.build.character.skills.shield.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  shieldBuffed: (state: State) => {
    return (
      (state.build.character.skills.shield.training !== Training.UNUSABLE
        ? state.shieldBase
        : 0)
        + buffBonus(state.build.character.skills.shield.buff)
        + cantripBonus(state.build.character.skills.shield.cantrip)
        + Math.round(
          (buffBonus(state.build.character.attributes.strength.buff)
          + cantripBonus(state.build.character.attributes.strength.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 2,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.shield.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  sneak_attackBase: (state: State) => {
    if (
      state.build.character.skills.sneak_attack.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.coordinationBase + state.quicknessBase) / 3)
      + trainingBonus(state.build.character.skills.sneak_attack.training)
      + state.build.character.skills.sneak_attack.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  sneak_attackBuffed: (state: State) => {
    return (
      (state.build.character.skills.sneak_attack.training !== Training.UNUSABLE
        ? state.sneak_attackBase
        : 0)
        + buffBonus(state.build.character.skills.sneak_attack.buff)
        + cantripBonus(state.build.character.skills.sneak_attack.cantrip)
        + standardSetBonus(state.build.character.armor_sets.swift.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.quickness.buff)
          + cantripBonus(state.build.character.attributes.quickness.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + 2
          * standardSetBonus(
            state.build.character.armor_sets.dextrous.equipped,
          )
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.sneak_attack.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  summoningBase: (state: State) => {
    if (state.build.character.skills.summoning.training === Training.UNUSABLE)
      return 0

    return (
      Math.round((state.enduranceBase + state.selfBase) / 3)
      + trainingBonus(state.build.character.skills.summoning.training)
      + state.build.character.skills.summoning.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  summoningBuffed: (state: State) => {
    return (
      (state.build.character.skills.summoning.training !== Training.UNUSABLE
        ? state.summoningBase
        : 0)
        + buffBonus(state.build.character.skills.summoning.buff)
        + cantripBonus(state.build.character.skills.summoning.cantrip)
        + standardSetBonus(state.build.character.armor_sets.wise.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.endurance.buff)
          + cantripBonus(state.build.character.attributes.endurance.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + buffBonus(state.build.character.attributes.self.buff)
          + cantripBonus(state.build.character.attributes.self.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + standardSetBonus(state.build.character.armor_sets.hearty.equipped))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.summoning.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  two_handed_combatBase: (state: State) => {
    if (
      state.build.character.skills.two_handed_combat.training
      === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.strengthBase + state.coordinationBase) / 3)
      + trainingBonus(state.build.character.skills.two_handed_combat.training)
      + state.build.character.skills.two_handed_combat.invested
      + (state.build.character.augmentations.master_of_the_steel_circle
        .invested === 1
        ? 10
        : 0)
        + state.build.character.luminance_auras.world.invested
        + state.build.character.timesEnlightened
    )
  },
  two_handed_combatBuffed: (state: State) => {
    return (
      (state.build.character.skills.two_handed_combat.training
      !== Training.UNUSABLE
        ? state.two_handed_combatBase
        : 0)
        + buffBonus(state.build.character.skills.two_handed_combat.buff)
        + cantripBonus(state.build.character.skills.two_handed_combat.cantrip)
        + standardSetBonus(state.build.character.armor_sets.soldiers.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.strength.buff)
          + cantripBonus(state.build.character.attributes.strength.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.coordination.buff)
          + cantripBonus(state.build.character.attributes.coordination.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + standardSetBonus(state.build.character.armor_sets.dextrous.equipped)
          + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
          + standardSecondarySetBonus(
            state.build.character.armor_sets.swift.equipped,
          ))
          / 3,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.two_handed_combat.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  void_magicBase: (state: State) => {
    if (
      state.build.character.skills.void_magic.training === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.focusBase + state.selfBase) / 4)
      + trainingBonus(state.build.character.skills.void_magic.training)
      + state.build.character.skills.void_magic.invested
      + (state.build.character.augmentations.master_of_the_five_fold_path
        .invested === 1
        ? 10
        : 0)
        + state.build.character.luminance_auras.world.invested
        + state.build.character.timesEnlightened
    )
  },
  void_magicBuffed: (state: State) => {
    return (
      (state.build.character.skills.void_magic.training !== Training.UNUSABLE
        ? state.void_magicBase
        : 0)
        + buffBonus(state.build.character.skills.void_magic.buff)
        + cantripBonus(state.build.character.skills.void_magic.cantrip)
        + standardSetBonus(state.build.character.armor_sets.adepts.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.self.buff)
          + cantripBonus(state.build.character.attributes.self.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped))
          / 4,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.void_magic.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  war_magicBase: (state: State) => {
    if (state.build.character.skills.war_magic.training === Training.UNUSABLE)
      return 0

    return (
      Math.round((state.focusBase + state.selfBase) / 4)
      + trainingBonus(state.build.character.skills.war_magic.training)
      + state.build.character.skills.war_magic.invested
      + (state.build.character.augmentations.master_of_the_five_fold_path
        .invested === 1
        ? 10
        : 0)
        + state.build.character.luminance_auras.world.invested
        + state.build.character.timesEnlightened
    )
  },
  war_magicBuffed: (state: State) => {
    return (
      (state.build.character.skills.war_magic.training !== Training.UNUSABLE
        ? state.war_magicBase
        : 0)
        + buffBonus(state.build.character.skills.war_magic.buff)
        + cantripBonus(state.build.character.skills.war_magic.cantrip)
        + standardSetBonus(state.build.character.armor_sets.adepts.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.self.buff)
          + cantripBonus(state.build.character.attributes.self.cantrip)
          + dedicationSetBonus(
            state.build.character.armor_sets.dedication.equipped,
          )
          + standardSetBonus(state.build.character.armor_sets.wise.equipped))
          / 4,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.war_magic.training === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },
  weapon_tinkeringBase: (state: State) => {
    if (
      state.build.character.skills.weapon_tinkering.training
      === Training.UNUSABLE
    ) return 0

    return (
      Math.round((state.strengthBase + state.focusBase) / 2)
      + trainingBonus(state.build.character.skills.weapon_tinkering.training)
      + state.build.character.skills.weapon_tinkering.invested
      + state.build.character.luminance_auras.world.invested
      + state.build.character.timesEnlightened
    )
  },
  weapon_tinkeringBuffed: (state: State) => {
    return (
      (state.build.character.skills.weapon_tinkering.training
      !== Training.UNUSABLE
        ? state.weapon_tinkeringBase
        : 0)
        + buffBonus(state.build.character.skills.weapon_tinkering.buff)
        + cantripBonus(state.build.character.skills.weapon_tinkering.cantrip)
        + standardSetBonus(state.build.character.armor_sets.tinkers.equipped)
        + Math.round(
          (buffBonus(state.build.character.attributes.strength.buff)
          + cantripBonus(state.build.character.attributes.strength.cantrip)
          + (state.build.character.items.font_of_joji ? 2 : 0)
          + buffBonus(state.build.character.attributes.focus.buff)
          + cantripBonus(state.build.character.attributes.focus.cantrip)
          + standardSetBonus(state.build.character.armor_sets.wise.equipped)
          + standardSetBonus(state.build.character.armor_sets.hearty.equipped)
          + (state.build.character.items.focusing_stone ? 50 : 0) // Brilliance
          + (state.build.character.items.font_of_joji ? 2 : 0))
          / 2,
        )
        + (state.build.character.augmentations.jack_of_all_trades.invested === 1
          ? 5
          : 0)
          + (state.build.character.skills.weapon_tinkering.training
          === Training.SPECIALIZED
            ? state.build.character.luminance_auras.specialization.invested * 2
            : 0)
    )
  },

  specializedSkills: (state: State) => {
    return Object.keys(state.build.character.skills).filter(
      key =>
        state.build.character.skills[key].training === Training.SPECIALIZED,
    )
  },
  trainedSkills: (state: State) => {
    return Object.keys(state.build.character.skills).filter(
      key => state.build.character.skills[key].training === Training.TRAINED,
    )
  },
  untrainedSkills: (state: State) => {
    return Object.keys(state.build.character.skills).filter(
      key => state.build.character.skills[key].training === Training.UNTRAINED,
    )
  },
  unusableSkills: (state: State) => {
    return Object.keys(state.build.character.skills).filter(
      key => state.build.character.skills[key].training === Training.UNUSABLE,
    )
  },
  augmentationErrors: (state: State) => {
    const totalAttributeBonus
      = state.build.character.augmentations.reinforcement_of_the_lugians
        .invested
        * 5
        + state.build.character.augmentations.bleearghs_fortitude.invested * 5
        + state.build.character.augmentations.oswalds_enhancement.invested * 5
        + state.build.character.augmentations.siraluuns_blessing.invested * 5
        + state.build.character.augmentations.enduring_calm.invested * 5
        + state.build.character.augmentations.steadfast_will.invested * 5

    if (totalAttributeBonus > 50)
      return 'Cannot augment attributes more than ten times!'
  },
  auraErrors: (state: State) => {
    const msg = 'Using too many Seers. You may only choose one.'

    // If you have Specialization, you can't have Retribution, Hardening
    if (
      state.build.character.luminance_auras.specialization.invested > 0
      && (state.build.character.luminance_auras.hardening.invested > 0
      || state.build.character.luminance_auras.retribution.invested > 0)
    ) return msg

    // If you have Destruction, you can't have Invulnerability, Hardening
    if (
      state.build.character.luminance_auras.destruction.invested > 0
      && (state.build.character.luminance_auras.invulnerability.invested > 0
      || state.build.character.luminance_auras.hardening.invested > 0)
    ) return msg

    // If you have Invulnerability, you can't have Destruction, Retribution
    if (
      state.build.character.luminance_auras.invulnerability.invested > 0
      && (state.build.character.luminance_auras.retribution.invested > 0
      || state.build.character.luminance_auras.destruction.invested > 0)
    ) return msg

    // If you have Retribution, you can't have Specialization, Invulnerability, Hardening
    if (
      state.build.character.luminance_auras.retribution.invested > 0
      && (state.build.character.luminance_auras.specialization.invested > 0
      || state.build.character.luminance_auras.invulnerability.invested > 0
      || state.build.character.luminance_auras.hardening.invested > 0)
    ) return msg

    // If you have Hardening, you can't have Specialization, Destruction, Retribution
    if (
      state.build.character.luminance_auras.hardening.invested > 0
      && (state.build.character.luminance_auras.specialization.invested > 0
      || state.build.character.luminance_auras.destruction.invested > 0
      || state.build.character.luminance_auras.retribution.invested > 0)
    ) return msg

    return null
  },

  armorSetNumEquippedErrors: (state: State) => {
    const numEquipped = Object.keys(state.build.character.armor_sets)
      .map((set) => {
        return state.build.character.armor_sets[set].equipped
      })
      .reduce((p, c) => {
        return p + c
      }, 0)

    if (numEquipped > 10)
      return 'Do you really have more than 10 armor set items equipped?'

    return null
  },

  // Modals
  shareModalVisible(state: State) {
    return state.ui.modalVisibility.share
  },
  settingsModalVisible(state: State) {
    return state.ui.modalVisibility.settings
  },

  // Setttings
  settingsInfiniteMode: (state: State) => {
    return state.settings.infiniteMode
  },
}
