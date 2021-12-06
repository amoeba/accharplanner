import {
  Attribute,
  Vital,
  Skill,
  Augmentation,
  LuminanceAura,
  Item,
  ArmorSet,
  NumberIndexedDict
} from "./types";

export const ATTRIBUTE_NAME = {
  [Attribute.strength]: "Strength",
  [Attribute.endurance]: "Endurance",
  [Attribute.coordination]: "Coordination",
  [Attribute.quickness]: "Quickness",
  [Attribute.focus]: "Focus",
  [Attribute.self]: "Self"
};

export const VITAL_FORMULA = {
  [Vital.health]: "E/2",
  [Vital.stamina]: "E",
  [Vital.mana]: "W"
};

export const SKILL_NAME = {
  [Skill.alchemy]: "Alchemy",
  [Skill.arcane_lore]: "Arcane Lore",
  [Skill.armor_tinkering]: "Armor Tinkering",
  [Skill.assess_creature]: "Assess Creature",
  [Skill.assess_person]: "Assess Person",
  [Skill.cooking]: "Cooking",
  [Skill.creature_enchantment]: "Creature Enchantment",
  [Skill.deception]: "Deception",
  [Skill.dual_wield]: "Dual Wield",
  [Skill.dirty_fighting]: "Dirty Fighting",
  [Skill.finesse_weapons]: "Finesse Weapons",
  [Skill.fletching]: "Fletching",
  [Skill.healing]: "Healing",
  [Skill.heavy_weapons]: "Heavy Weapons",
  [Skill.item_enchantment]: "Item Enchantment",
  [Skill.item_tinkering]: "Item Tinkering",
  [Skill.jump]: "Jump",
  [Skill.leadership]: "Leadership",
  [Skill.life_magic]: "Life Magic",
  [Skill.light_weapons]: "Light Weapons",
  [Skill.lockpick]: "Lockpick",
  [Skill.loyalty]: "Loyalty",
  [Skill.magic_defense]: "Magic Defense",
  [Skill.magic_item_tinkering]: "Magic Item Tinkering",
  [Skill.mana_conversion]: "Mana Conversion",
  [Skill.melee_defense]: "Melee Defense",
  [Skill.missile_defense]: "Missile Defense",
  [Skill.missile_weapons]: "Missile Weapons",
  [Skill.recklessness]: "Recklessness",
  [Skill.run]: "Run",
  [Skill.salvaging]: "Salvaging",
  [Skill.shield]: "Shield",
  [Skill.sneak_attack]: "Sneak Attack",
  [Skill.summoning]: "Summoning",
  [Skill.two_handed_combat]: "Two Handed Combat",
  [Skill.void_magic]: "Void Magic",
  [Skill.war_magic]: "War Magic",
  [Skill.weapon_tinkering]: "Weapon Tinkering"
};

export const SKILL_FORMULA = {
  [Skill.alchemy]: "(C+F)/3",
  [Skill.arcane_lore]: "F/3",
  [Skill.armor_tinkering]: "(E+F)/2",
  [Skill.assess_creature]: "",
  [Skill.assess_person]: "",
  [Skill.cooking]: "(C+F)/3",
  [Skill.creature_enchantment]: "(F+W)/4",
  [Skill.deception]: "",
  [Skill.dual_wield]: "(C+C)/3",
  [Skill.dirty_fighting]: "(S+C)/3",
  [Skill.finesse_weapons]: "(C+Q)/3",
  [Skill.fletching]: "(C+F)/3",
  [Skill.healing]: "(C+F)/3",
  [Skill.heavy_weapons]: "(S+C)/3",
  [Skill.item_enchantment]: "(F+W)/4",
  [Skill.item_tinkering]: "(C+F)/2",
  [Skill.jump]: "(S+C)/2",
  [Skill.leadership]: "",
  [Skill.life_magic]: "(F+W)/4",
  [Skill.light_weapons]: "(S+C)/3",
  [Skill.lockpick]: "(C+F)/3",
  [Skill.loyalty]: "",
  [Skill.magic_defense]: "(F+W)/7",
  [Skill.magic_item_tinkering]: "F",
  [Skill.mana_conversion]: "(F+W)/6",
  [Skill.melee_defense]: "(C+Q)/3",
  [Skill.missile_defense]: "(C+Q)/5",
  [Skill.missile_weapons]: "C/2",
  [Skill.recklessness]: "(S+Q)/2",
  [Skill.run]: "Q",
  [Skill.salvaging]: "",
  [Skill.shield]: "(S+C)/2",
  [Skill.sneak_attack]: "(C+Q)/3",
  [Skill.summoning]: "(E+W)/3",
  [Skill.two_handed_combat]: "(S+C)/3",
  [Skill.void_magic]: "(F+W)/4",
  [Skill.war_magic]: "(F+W)/4",
  [Skill.weapon_tinkering]: "(S+F)/2"
};

export const BUFF_NAME: NumberIndexedDict<string> = {
  0: "",
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII"
};

export const CANTRIP_NAME: NumberIndexedDict<string> = {
  0: "None",
  1: "Minor",
  2: "Major",
  3: "Epic",
  4: "Legen."
};

export const AUGMENTATION_NAME = {
  [Augmentation.might_of_the_seventh_mule]: "Might of the Seventh Mule",
  [Augmentation.shadow_of_the_seventh_mule]: "Shadow of the Seventh Mule",
  [Augmentation.infused_war_magic]: "Infused War Magic",
  [Augmentation.infused_life_magic]: "Infused Life Magic",
  [Augmentation.infused_item_magic]: "Infused Item Magic",
  [Augmentation.infused_creature_magic]: "Infused Creature Magic",
  [Augmentation.infused_void_magic]: "Infused Void Magic",
  [Augmentation.clutch_of_the_miser]: "Clutch of the Miser",
  [Augmentation.enduring_enchantment]: "Enduring Enchantment",
  [Augmentation.quick_learner]: "Quick Learner",
  [Augmentation.asherons_lesser_benediction]: "Asherons Lesser Benediction",
  [Augmentation.asherons_benediction]: "Asherons Benediction",
  [Augmentation.blackmoors_favor]: "Blackmoor's Favor",
  [Augmentation.innate_renewal]: "Innate Renewal",
  [Augmentation.reinforcement_of_the_lugians]: "Reinforcement of the Lugians",
  [Augmentation.bleearghs_fortitude]: "Bleeargh's Fortitude",
  [Augmentation.oswalds_enhancement]: "Oswald's Enhancement",
  [Augmentation.siraluuns_blessing]: "Siraluun's Blessing",
  [Augmentation.enduring_calm]: "Enduring Calm",
  [Augmentation.steadfast_will]: "Steadfast Will",
  [Augmentation.enhancement_of_the_mace_turner]:
    "Enhancement of the Mace Turner",
  [Augmentation.enhancement_of_the_blade_turner]:
    "Enhancement of the Blade Turner",
  [Augmentation.enhancement_of_the_arrow_turner]:
    "Enhancement of the Arrow Turner",
  [Augmentation.storms_enhancement]: "Storm's Enhancement",
  [Augmentation.fiery_enhancement]: "Fiery Enhancement",
  [Augmentation.icy_enhancement]: "Icy Enhancement",
  [Augmentation.caustic_enhancement]: "Caustic Enhancement",
  [Augmentation.critical_protection]: "Critical Protection",
  [Augmentation.frenzy_of_the_slayer]: "Frenzy of the Slayer",
  [Augmentation.iron_skin_of_the_invincible]: "Iron Skin of the Invincible",
  [Augmentation.eye_of_the_remorseless]: "Eye of the Remorseless",
  [Augmentation.hand_of_the_remorseless]: "Hand of the Remorseless",
  [Augmentation.ciandras_fortune]: "Ciandra's Fortune",
  [Augmentation.charmed_smith]: "Charmed Smith",
  [Augmentation.jibrils_essence]: "Jibrils Essence",
  [Augmentation.yoshis_essence]: "Yoshi's Essence",
  [Augmentation.celdiseths_essence]: "Celdiseth's Essence",
  [Augmentation.kogas_essence]: "Koga's Essence",
  [Augmentation.ciandras_essence]: "Ciandra's Essence",
  [Augmentation.master_of_the_steel_circle]: "Master of the Steel Circle",
  [Augmentation.master_of_the_five_fold_path]: "Master of the Five Fold Path",
  [Augmentation.master_of_the_focused_eye]: "Master of the Focused Eye",
  [Augmentation.jack_of_all_trades]: "Jack of All Trades",
  [Augmentation.archmages_endurance]: "Archmage's Endurance"
};

export const AUGMENTATION_EXTRA_INFO = {
  [Augmentation.might_of_the_seventh_mule]: "+20% Burden Capacity",
  [Augmentation.shadow_of_the_seventh_mule]: "+1 Pack Slot",
  [Augmentation.infused_war_magic]: "No War Foci",
  [Augmentation.infused_life_magic]: "No Life Foci",
  [Augmentation.infused_item_magic]: "No Item Foci",
  [Augmentation.infused_creature_magic]: "No Creature Foci",
  [Augmentation.infused_void_magic]: "No Void Foci",
  [Augmentation.clutch_of_the_miser]: "-5 Items Drop on Death",
  [Augmentation.enduring_enchantment]: "Spells Not Lost on Death",
  [Augmentation.quick_learner]: "+5% XP",
  [Augmentation.asherons_lesser_benediction]: "+10% HP",
  [Augmentation.asherons_benediction]: "+10% HP",
  [Augmentation.blackmoors_favor]: "+50 Armor",
  [Augmentation.innate_renewal]: "+100% Regen Lying Down",
  [Augmentation.reinforcement_of_the_lugians]: "+5 Strength",
  [Augmentation.bleearghs_fortitude]: "+5 Endurance",
  [Augmentation.oswalds_enhancement]: "+5 Coordination",
  [Augmentation.siraluuns_blessing]: "+5 Quickness",
  [Augmentation.enduring_calm]: "+5 Focus",
  [Augmentation.steadfast_will]: "+5 Self",
  [Augmentation.enhancement_of_the_mace_turner]: "+10% Bludge Res.",
  [Augmentation.enhancement_of_the_blade_turner]: "+10% Slash Res.",
  [Augmentation.enhancement_of_the_arrow_turner]: "+10% Pierce Res.",
  [Augmentation.storms_enhancement]: "+10% Light. Res.",
  [Augmentation.fiery_enhancement]: "+10% Fire Res.",
  [Augmentation.icy_enhancement]: "+10% Frost Res.",
  [Augmentation.caustic_enhancement]: "+10% Acid Res.",
  [Augmentation.critical_protection]: "-25% to Crits",
  [Augmentation.frenzy_of_the_slayer]: "+3 Damage Rating",
  [Augmentation.iron_skin_of_the_invincible]: "+3 Damage Rating",
  [Augmentation.eye_of_the_remorseless]: "1% Chance to Crit",
  [Augmentation.hand_of_the_remorseless]: "+3 Crit Damage Rating",
  [Augmentation.ciandras_fortune]: "+25% Extra Salvage",
  [Augmentation.charmed_smith]: "+5% Imbue Chance",
  [Augmentation.jibrils_essence]: "Spec Armor Tinkering",
  [Augmentation.yoshis_essence]: "Spec Item Tinkering",
  [Augmentation.celdiseths_essence]: "Spec Magic Item Tinkering",
  [Augmentation.kogas_essence]: "Spec Weapon Tinkering",
  [Augmentation.ciandras_essence]: "Spec Salvaging",
  [Augmentation.master_of_the_steel_circle]: "+10 Melee Skill",
  [Augmentation.master_of_the_five_fold_path]: "+10 Casting Skill",
  [Augmentation.master_of_the_focused_eye]: "+10 Missile Skill",
  [Augmentation.jack_of_all_trades]: "+5 All Skills",
  [Augmentation.archmages_endurance]: "+20% Spell Duration"
};

export const LUMINANCE_AURA_NAME = {
  [LuminanceAura.aetheric_vision]: "Aetheric Vision",
  [LuminanceAura.craftsman]: "Craftsman",
  [LuminanceAura.glory]: "Glory",
  [LuminanceAura.mana_flow]: "Mana Flow",
  [LuminanceAura.mana_infusion]: "Mana Infusion",
  [LuminanceAura.protection]: "Protection",
  [LuminanceAura.purity]: "Purity",
  [LuminanceAura.skill]: "Skill",
  [LuminanceAura.temperance]: "Temperance",
  [LuminanceAura.valor]: "Valor",
  [LuminanceAura.world]: "World",
  [LuminanceAura.specialization]: "Specialization",
  [LuminanceAura.invulnerability]: "Invulnerability",
  [LuminanceAura.destruction]: "Destruction",
  [LuminanceAura.retribution]: "Retribution",
  [LuminanceAura.hardening]: "Hardening"
};

export const LUMINANCE_AURA_HOVER_INFO = {
  [LuminanceAura.craftsman]: "Doesn't change values in your character sheet and is only applied when crafting/tinkering.",
};

export const LUMINANCE_AURA_EXTRA_INFO = {
  [LuminanceAura.aetheric_vision]: "+ Surge %",
  [LuminanceAura.craftsman]: "+1 to Craft/Tink",
  [LuminanceAura.glory]: "+1 Crit Dmg",
  [LuminanceAura.mana_flow]: "- Mana Consum.",
  [LuminanceAura.mana_infusion]: "+ Mana Stone",
  [LuminanceAura.protection]: "+1 Dmg Red.",
  [LuminanceAura.purity]: "+ Healing Amount",
  [LuminanceAura.skill]: "+1 Skill Credit",
  [LuminanceAura.temperance]: "+1 Crit Dmg Red.",
  [LuminanceAura.valor]: "+1 Dmg",
  [LuminanceAura.world]: "+1 All Skills",
  [LuminanceAura.specialization]: "+2 Spec Skills",
  [LuminanceAura.invulnerability]: "+1 Dmg Red.",
  [LuminanceAura.destruction]: "+1 Dmg",
  [LuminanceAura.retribution]: "+1 Crit Dmg",
  [LuminanceAura.hardening]: "+1 Crit Dmg Red."
};

export const ITEM_NAME = {
  [Item.focusing_stone]: "Focusing Stone",
  [Item.font_of_joji]: "Font of Joji"
};

export const ARMOR_SET_NAME = {
  [ArmorSet.adepts]: "Adept's",
  [ArmorSet.archers]: "Archer's",
  [ArmorSet.crafters]: "Crafter's",
  [ArmorSet.dedication]: "Dedication",
  [ArmorSet.defenders]: "Defender's",
  [ArmorSet.dextrous]: "Dextrous",
  [ArmorSet.hearty]: "Hearty",
  [ArmorSet.soldiers]: "Soldier's",
  [ArmorSet.swift]: "Swift",
  [ArmorSet.tinkers]: "Tinkers",
  [ArmorSet.wise]: "Wise",
};

export const ARMOR_SET_NAME_EXTRA_INFO = {
  [ArmorSet.adepts]: "All Magics, Magic Defense",
  [ArmorSet.archers]: "Missile Weapons, Missile Defense",
  [ArmorSet.crafters]: "All Crafting, Loyalty",
  [ArmorSet.dedication]: "All Attributes",
  [ArmorSet.defenders]: "All Defenses, Stamina",
  [ArmorSet.dextrous]: "Coordination, Quickness, Stamina",
  [ArmorSet.hearty]: "Endurance, Strength, Health",
  [ArmorSet.soldiers]: "All Melee, DF, Reck, Melee Defense",
  [ArmorSet.swift]: "Jump, Run, SA, DW, Finesse",
  [ArmorSet.tinkers]: "All Tinkering, Salvaging",
  [ArmorSet.wise]: "Focus, Willpower, Summoning, Mana",
}
