import type { Store } from 'vuex'
import type { State } from './types'
import { PropertyInt, Training } from './types'
import {
  MAX_SKILL_INVESTED_SPECIALIZED,
  MAX_SKILL_INVESTED_TRAINED,
} from './constants'
import DefaultCharacter from '~/utils/DefaultCharacter'

export const importCharacter = function (store: Store<State>, json: any) {
  // Re-set to blank state prior to import
  store.state.build.character = JSON.parse(JSON.stringify(DefaultCharacter()))
  store.state.build.stages = []

  // Set Jack of All Trades invested to zero in case this character isn't
  // one of the original heritage groups
  store.state.build.character.augmentations.jack_of_all_trades.invested = 0

  store.state.build.character.name = json.name
  store.state.build.character.level = json.level
  store.state.build.character.race = json.race
  store.state.build.character.gender = json.gender

  // Attributes
  Object.keys(json.attribs).forEach((a) => {
    store.state.build.character.attributes[a].creation
      = json.attribs[a].creation
    store.state.build.character.attributes[a].invested
      = json.attribs[a].base - json.attribs[a].creation
  })

  // Vitals
  Object.keys(json.vitals).forEach((a) => {
    store.state.build.character.vitals[a].indvested = 0
    store.state.build.character.vitals[a].invested
      = json.vitals[a].base - store.getters[`${a}Base`]
  })

  // Skills
  Object.keys(json.skills).forEach((s) => {
    store.state.build.character.skills[s].training
      = json.skills[s].training.toLowerCase()

    if (
      store.state.build.character.skills[s].training === Training.SPECIALIZED
      || store.state.build.character.skills[s].training === Training.TRAINED
    ) {
      store.state.build.character.skills[s].invested = 0
      store.state.build.character.skills[s].invested
        = json.skills[s].base - store.getters[`${s}Base`]

      // Cap invested at the appropriate value
      if (
        store.state.build.character.skills[s].training
        === Training.SPECIALIZED
        && store.state.build.character.skills[s].invested
        > MAX_SKILL_INVESTED_SPECIALIZED
      ) {
        store.state.build.character.skills[s].invested
          = MAX_SKILL_INVESTED_SPECIALIZED
      }
      else if (
        store.state.build.character.skills[s].training === Training.TRAINED
        && store.state.build.character.skills[s].invested
        > MAX_SKILL_INVESTED_TRAINED
      ) {
        store.state.build.character.skills[s].invested
          = MAX_SKILL_INVESTED_TRAINED
      }
    }
  })

  // Experience Augmentations and Luminance Auras
  Object.keys(json.properties).forEach((property) => {
    switch (property) {
      case '218':
        store.state.build.character.augmentations.reinforcement_of_the_lugians.invested
          = json.properties[property]
        break
      case '219':
        store.state.build.character.augmentations.bleearghs_fortitude.invested
          = json.properties[property]
        break
      case '220':
        store.state.build.character.augmentations.oswalds_enhancement.invested
          = json.properties[property]
        break
      case '221':
        store.state.build.character.augmentations.siraluuns_blessing.invested
          = json.properties[property]
        break
      case '222':
        store.state.build.character.augmentations.enduring_enchantment.invested
          = json.properties[property]
        break
      case '223':
        store.state.build.character.augmentations.steadfast_will.invested
          = json.properties[property]
        break
      case '224':
        store.state.build.character.augmentations.ciandras_essence.invested
          = json.properties[property]
        break
      case '225':
        store.state.build.character.augmentations.yoshis_essence.invested
          = json.properties[property]
        break
      case '226':
        store.state.build.character.augmentations.jibrils_essence.invested
          = json.properties[property]
        break
      case '227':
        store.state.build.character.augmentations.celdiseths_essence.invested
          = json.properties[property]
        break
      case '228':
        store.state.build.character.augmentations.kogas_essence.invested
          = json.properties[property]
        break
      case '229':
        store.state.build.character.augmentations.shadow_of_the_seventh_mule.invested
          = json.properties[property]
        break
      case '230':
        store.state.build.character.augmentations.might_of_the_seventh_mule.invested
          = json.properties[property]
        break
      case '231':
        store.state.build.character.augmentations.clutch_of_the_miser.invested
          = json.properties[property]
        break
      case '232':
        store.state.build.character.augmentations.enduring_enchantment.invested
          = json.properties[property]
        break
      case '233':
        store.state.build.character.augmentations.critical_protection.invested
          = json.properties[property]
        break
      case '234':
        store.state.build.character.augmentations.quick_learner.invested
          = json.properties[property]
        break
      case '235':
        store.state.build.character.augmentations.ciandras_fortune.invested
          = json.properties[property]
        break
      case '236':
        store.state.build.character.augmentations.charmed_smith.invested
          = json.properties[property]
        break
      case '237':
        store.state.build.character.augmentations.innate_renewal.invested
          = json.properties[property]
        break
      case '238':
        store.state.build.character.augmentations.archmages_endurance.invested
          = json.properties[property]
        break
      case '240':
        store.state.build.character.augmentations.enhancement_of_the_blade_turner.invested
          = json.properties[property]
        break
      case '241':
        store.state.build.character.augmentations.enhancement_of_the_arrow_turner.invested
          = json.properties[property]
        break
      case '242':
        store.state.build.character.augmentations.enhancement_of_the_mace_turner.invested
          = json.properties[property]
        break
      case '243':
        store.state.build.character.augmentations.caustic_enhancement.invested
          = json.properties[property]
        break
      case '244':
        store.state.build.character.augmentations.fiery_enhancement.invested
          = json.properties[property]
        break
      case '245':
        store.state.build.character.augmentations.icy_enhancement.invested
          = json.properties[property]
        break
      case '246':
        store.state.build.character.augmentations.storms_enhancement.invested
          = json.properties[property]
        break
      case '298':
        store.state.build.character.augmentations.eye_of_the_remorseless.invested
          = json.properties[property]
        break
      case '299':
        store.state.build.character.augmentations.hand_of_the_remorseless.invested
          = json.properties[property]
        break
      case '300':
        store.state.build.character.augmentations.master_of_the_steel_circle.invested
          = json.properties[property]
        break
      case '301':
        store.state.build.character.augmentations.master_of_the_focused_eye.invested
          = json.properties[property]
        break
      case '302':
        store.state.build.character.augmentations.master_of_the_five_fold_path.invested
          = json.properties[property]
        break
      case '309':
        store.state.build.character.augmentations.frenzy_of_the_slayer.invested
          = json.properties[property]
        break
      case '310':
        store.state.build.character.augmentations.iron_skin_of_the_invincible.invested
          = json.properties[property]
        break
      case '326':
        store.state.build.character.augmentations.jack_of_all_trades.invested
          = json.properties[property]
        break
      case '328':
        store.state.build.character.augmentations.infused_void_magic.invested
          = json.properties[property]
        break
      case '294':
        store.state.build.character.augmentations.infused_creature_magic.invested
          = json.properties[property]
        break
      case '295':
        store.state.build.character.augmentations.infused_item_magic.invested
          = json.properties[property]
        break
      case '296':
        store.state.build.character.augmentations.infused_life_magic.invested
          = json.properties[property]
        break
      case '297':
        store.state.build.character.augmentations.infused_war_magic.invested
          = json.properties[property]
        break
      case PropertyInt.LumAugDamageRating:
        if (json.properties[property] >= 0 && json.properties[property] <= 5) {
          store.state.build.character.luminance_auras.valor.invested
            = json.properties[property]
        }
        else if (json.properties[property] > 5) {
          store.state.build.character.luminance_auras.valor.invested = 5
          store.state.build.character.luminance_auras.destruction.invested
            = json.properties[property] - 5
        }

        break
      case PropertyInt.LumAugDamageReductionRating:
        if (json.properties[property] >= 0 && json.properties[property] <= 5) {
          store.state.build.character.luminance_auras.protection.invested
            = json.properties[property]
        }
        else if (json.properties[property] > 5) {
          store.state.build.character.luminance_auras.protection.invested = 5
          store.state.build.character.luminance_auras.invulnerability.invested
            = json.properties[property] - 5
        }

        break
      case PropertyInt.LumAugCritDamageRating:
        if (json.properties[property] >= 0 && json.properties[property] <= 5) {
          store.state.build.character.luminance_auras.glory.invested
            = json.properties[property]
        }
        else if (json.properties[property] > 5) {
          store.state.build.character.luminance_auras.glory.invested = 5
          store.state.build.character.luminance_auras.retribution.invested
            = json.properties[property] - 5
        }

        break
      case PropertyInt.LumAugCritReductionRating:
        if (json.properties[property] >= 0 && json.properties[property] <= 5) {
          store.state.build.character.luminance_auras.temperance.invested
            = json.properties[property]
        }
        else if (json.properties[property] > 5) {
          store.state.build.character.luminance_auras.temperance.invested
            = json.properties[property]
          store.state.build.character.luminance_auras.hardening.invested
            = json.properties[property] - 5
        }

        break
      case PropertyInt.LumAugSurgeEffectRating:
        // Doesn't exist?

        break
      case PropertyInt.LumAugSurgeChanceRating:
        store.state.build.character.luminance_auras.aetheric_vision.invested
          = json.properties[property]

        break
      case PropertyInt.LumAugItemManaUsage:
        store.state.build.character.luminance_auras.mana_flow.invested
          = json.properties[property]

        break
      case PropertyInt.LumAugItemManaGain:
        store.state.build.character.luminance_auras.mana_infusion.invested
          = json.properties[property]

        break
      case PropertyInt.LumAugVitality:
        // Doesn't exist?
        break
      case PropertyInt.LumAugHealingRating:
        store.state.build.character.luminance_auras.purity.invested
          = json.properties[property]

        break
      case PropertyInt.LumAugSkilledCraft:
        store.state.build.character.luminance_auras.craftsman.invested
          = json.properties[property]

        break
      case PropertyInt.LumAugSkilledSpec:
        store.state.build.character.luminance_auras.specialization.invested
          = json.properties[property]

        break
      case PropertyInt.LumAugNoDestroyCraft:
        break
      case PropertyInt.LumAugAllSkills:
        store.state.build.character.luminance_auras.world.invested
          = json.properties[property]

        break
      default:
        break
    }
  })
}
