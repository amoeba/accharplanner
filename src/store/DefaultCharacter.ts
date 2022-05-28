import { Character, Skill } from "../types";
import { UNTRAINED_STATE } from "../constants";

export default function (): Character {
  return {
    name: "An Adventurer",
    race: "Aluvian",
    gender: "Female",
    level: 1,
    timesEnlightened: 0,
    extraSkillCredits: {
      railrea: false,
      oswald: false,
      luminance1: false,
      luminance2: false,
    },
    attributes: {
      strength: {
        creation: 10,
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      endurance: {
        creation: 10,
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      coordination: {
        creation: 10,
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      quickness: {
        creation: 10,
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      focus: {
        creation: 10,
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      self: {
        creation: 10,
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
    },
    vitals: {
      health: {
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      stamina: {
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      mana: {
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
    },
    skills: {
      alchemy: {
        training: UNTRAINED_STATE[Skill.alchemy],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      arcane_lore: {
        training: UNTRAINED_STATE[Skill.arcane_lore],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      armor_tinkering: {
        training: UNTRAINED_STATE[Skill.armor_tinkering],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      assess_creature: {
        training: UNTRAINED_STATE[Skill.assess_creature],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      assess_person: {
        training: UNTRAINED_STATE[Skill.assess_person],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      cooking: {
        training: UNTRAINED_STATE[Skill.cooking],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      creature_enchantment: {
        training: UNTRAINED_STATE[Skill.creature_enchantment],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      deception: {
        training: UNTRAINED_STATE[Skill.deception],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      dual_wield: {
        training: UNTRAINED_STATE[Skill.dual_wield],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      dirty_fighting: {
        training: UNTRAINED_STATE[Skill.dirty_fighting],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      finesse_weapons: {
        training: UNTRAINED_STATE[Skill.finesse_weapons],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      fletching: {
        training: UNTRAINED_STATE[Skill.fletching],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      healing: {
        training: UNTRAINED_STATE[Skill.healing],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      heavy_weapons: {
        training: UNTRAINED_STATE[Skill.heavy_weapons],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      item_enchantment: {
        training: UNTRAINED_STATE[Skill.item_enchantment],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      item_tinkering: {
        training: UNTRAINED_STATE[Skill.item_tinkering],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      jump: {
        training: UNTRAINED_STATE[Skill.jump],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      leadership: {
        training: UNTRAINED_STATE[Skill.leadership],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      life_magic: {
        training: UNTRAINED_STATE[Skill.life_magic],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      light_weapons: {
        training: UNTRAINED_STATE[Skill.light_weapons],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      lockpick: {
        training: UNTRAINED_STATE[Skill.lockpick],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      loyalty: {
        training: UNTRAINED_STATE[Skill.loyalty],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      magic_defense: {
        training: UNTRAINED_STATE[Skill.magic_defense],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      magic_item_tinkering: {
        training: UNTRAINED_STATE[Skill.magic_item_tinkering],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      mana_conversion: {
        training: UNTRAINED_STATE[Skill.mana_conversion],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      melee_defense: {
        training: UNTRAINED_STATE[Skill.melee_defense],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      missile_defense: {
        training: UNTRAINED_STATE[Skill.missile_defense],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      missile_weapons: {
        training: UNTRAINED_STATE[Skill.missile_weapons],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      recklessness: {
        training: UNTRAINED_STATE[Skill.recklessness],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      run: {
        training: UNTRAINED_STATE[Skill.run],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      salvaging: {
        training: UNTRAINED_STATE[Skill.salvaging],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      shield: {
        training: UNTRAINED_STATE[Skill.shield],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      sneak_attack: {
        training: UNTRAINED_STATE[Skill.sneak_attack],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      summoning: {
        training: UNTRAINED_STATE[Skill.summoning],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      two_handed_combat: {
        training: UNTRAINED_STATE[Skill.two_handed_combat],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      void_magic: {
        training: UNTRAINED_STATE[Skill.void_magic],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      war_magic: {
        training: UNTRAINED_STATE[Skill.war_magic],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
      weapon_tinkering: {
        training: UNTRAINED_STATE[Skill.weapon_tinkering],
        invested: 0,
        buff: 0,
        cantrip: 0,
      },
    },
    augmentations: {
      might_of_the_seventh_mule: {
        invested: 0,
      },
      shadow_of_the_seventh_mule: {
        invested: 0,
      },
      infused_war_magic: {
        invested: 0,
      },
      infused_life_magic: {
        invested: 0,
      },
      infused_item_magic: {
        invested: 0,
      },
      infused_creature_magic: {
        invested: 0,
      },
      infused_void_magic: {
        invested: 0,
      },
      clutch_of_the_miser: {
        invested: 0,
      },
      enduring_enchantment: {
        invested: 0,
      },
      quick_learner: {
        invested: 0,
      },
      asherons_lesser_benediction: {
        invested: 0,
      },
      asherons_benediction: {
        invested: 0,
      },
      blackmoors_favor: {
        invested: 0,
      },
      innate_renewal: {
        invested: 0,
      },
      reinforcement_of_the_lugians: {
        invested: 0,
      },
      bleearghs_fortitude: {
        invested: 0,
      },
      oswalds_enhancement: {
        invested: 0,
      },
      siraluuns_blessing: {
        invested: 0,
      },
      enduring_calm: {
        invested: 0,
      },
      steadfast_will: {
        invested: 0,
      },
      enhancement_of_the_mace_turner: {
        invested: 0,
      },
      enhancement_of_the_blade_turner: {
        invested: 0,
      },
      enhancement_of_the_arrow_turner: {
        invested: 0,
      },
      storms_enhancement: {
        invested: 0,
      },
      fiery_enhancement: {
        invested: 0,
      },
      icy_enhancement: {
        invested: 0,
      },
      caustic_enhancement: {
        invested: 0,
      },
      critical_protection: {
        invested: 0,
      },
      frenzy_of_the_slayer: {
        invested: 0,
      },
      iron_skin_of_the_invincible: {
        invested: 0,
      },
      eye_of_the_remorseless: {
        invested: 0,
      },
      hand_of_the_remorseless: {
        invested: 0,
      },
      ciandras_fortune: {
        invested: 0,
      },
      charmed_smith: {
        invested: 0,
      },
      jibrils_essence: {
        invested: 0,
      },
      yoshis_essence: {
        invested: 0,
      },
      celdiseths_essence: {
        invested: 0,
      },
      kogas_essence: {
        invested: 0,
      },
      ciandras_essence: {
        invested: 0,
      },
      master_of_the_steel_circle: {
        invested: 0,
      },
      master_of_the_five_fold_path: {
        invested: 0,
      },
      master_of_the_focused_eye: {
        invested: 0,
      },
      jack_of_all_trades: {
        invested: 1,
      },
      archmages_endurance: {
        invested: 0,
      },
    },
    luminance_auras: {
      aetheric_vision: {
        invested: 0,
      },
      craftsman: {
        invested: 0,
      },
      glory: {
        invested: 0,
      },
      mana_flow: {
        invested: 0,
      },
      mana_infusion: {
        invested: 0,
      },
      protection: {
        invested: 0,
      },
      purity: {
        invested: 0,
      },
      skill: {
        invested: 0,
      },
      temperance: {
        invested: 0,
      },
      valor: {
        invested: 0,
      },
      world: {
        invested: 0,
      },
      specialization: {
        invested: 0,
      },
      invulnerability: {
        invested: 0,
      },
      destruction: {
        invested: 0,
      },
      retribution: {
        invested: 0,
      },
      hardening: {
        invested: 0,
      },
    },
    items: {
      focusing_stone: false,
      font_of_joji: false,
    },
    armor_sets: {
      adepts: {
        equipped: 0,
      },
      archers: {
        equipped: 0,
      },
      crafters: {
        equipped: 0,
      },
      dedication: {
        equipped: 0,
      },
      defenders: {
        equipped: 0,
      },
      dextrous: {
        equipped: 0,
      },
      hearty: {
        equipped: 0,
      },
      soldiers: {
        equipped: 0,
      },
      swift: {
        equipped: 0,
      },
      tinkers: {
        equipped: 0,
      },
      wise: {
        equipped: 0,
      },
    },
  };
}
