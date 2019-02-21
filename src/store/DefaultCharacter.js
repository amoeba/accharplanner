import Constants from "../constants";

export default () => {
  return {
    name: "An Adventurer",
    race: "Aluvian",
    gender: "Female",
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
}
