export interface StringIndexedDict<V> {
  [key: string]: V
}

export interface NumberIndexedDict<V> {
  [key: number]: V
}

export interface Character {
  name: string,
  race: string,
  gender: string,
  level: number,
  timesEnlightened: number,
  extraSkillCredits: any,
  attributes: any,
  vitals: any,
  skills: any,
  augmentations: any,
  luminance_auras: any
}

enum NotificationType {
  Success,
  Error,
  Info
}

export interface Notification {
  id: number,
  type: NotificationType,
  message: string
}

export interface SavedBuild {
  key: string,
  character: string
}

export interface State {
  character: Character,
  notifications: Notification[],
  savedBuilds: SavedBuild[],
  shareStatus: string | null,
  sharedBuild: string | null,
}

export enum Race {
  Aluvian = "Aluvian",
  "Gharu'ndim" = "Gharu'ndim",
  Sho = "Sho",
  Viamontian = "Viamontian",
  Empyrean = "Empyrean",
  Umbraen = "Umbraen",
  Penumbraen = "Penumbraen",
  Lugian = "Lugian",
  Tumerok = "Tumerok"
}

export enum Gender {
  Female = "Female",
  Male = "Fale"
}

export enum Attribute {
  strength = "strength",
  endurance = "endurance",
  coordination = "coordination",
  quickness = "quickness",
  focus = "focus",
  self = "self"
}

export enum Vital {
  health = "health",
  stamina = "stamina",
  mana = "mana"
}

export enum Skill {
  "alchemy" = "alchemy",
  "arcane_lore" = "arcane_lore",
  "armor_tinkering" = "armor_tinkering",
  "assess_creature" = "assess_creature",
  "assess_person" = "assess_person",
  "cooking" = "cooking",
  "creature_enchantment" = "creature_enchantment",
  "deception" = "deception",
  "dual_wield" = "dual_wield",
  "dirty_fighting" = "dirty_fighting",
  "finesse_weapons" = "finesse_weapons",
  "fletching" = "fletching",
  "healing" = "healing",
  "heavy_weapons" = "heavy_weapons",
  "item_enchantment" = "item_enchantment",
  "item_tinkering" = "item_tinkering",
  "jump" = "jump",
  "leadership" = "leadership",
  "life_magic" = "life_magic",
  "light_weapons" = "light_weapons",
  "lockpick" = "lockpick",
  "loyalty" = "loyalty",
  "magic_defense" = "magic_defense",
  "magic_item_tinkering" = "magic_item_tinkering",
  "mana_conversion" = "mana_conversion",
  "melee_defense" = "melee_defense",
  "missile_defense" = "missile_defense",
  "missile_weapons" = "missile_weapons",
  "recklessness" = "recklessness",
  "run" = "run",
  "salvaging" = "salvaging",
  "shield" = "shield",
  "sneak_attack" = "sneak_attack",
  "summoning" = "summoning",
  "two_handed_combat" = "two_handed_combat",
  "void_magic" = "void_magic",
  "war_magic" = "war_magic",
  "weapon_tinkering" = "weapon_tinkering"
};

export enum Training {
  UNUSABLE = "unusable",
  UNTRAINED = "untrained",
  TRAINED = "trained",
  SPECIALIZED = "specialized",
};

export enum Augmentation {
  might_of_the_seventh_mule = "might_of_the_seventh_mule",
  shadow_of_the_seventh_mule = "shadow_of_the_seventh_mule",
  infused_war_magic = "infused_war_magic",
  infused_life_magic = "infused_life_magic",
  infused_item_magic = "infused_item_magic",
  infused_creature_magic = "infused_creature_magic",
  infused_void_magic = "infused_void_magic",
  clutch_of_the_miser = "clutch_of_the_miser",
  enduring_enchantment = "enduring_enchantment",
  quick_learner = "quick_learner",
  asherons_lesser_benediction = "asherons_lesser_benediction",
  asherons_benediction = "asherons_benediction",
  blackmoors_favor = "blackmoors_favor",
  innate_renewal = "innate_renewal",
  reinforcement_of_the_lugians = "reinforcement_of_the_lugians",
  bleearghs_fortitude = "bleearghs_fortitude",
  oswalds_enhancement = "oswalds_enhancement",
  siraluuns_blessing = "siraluuns_blessing",
  enduring_calm = "enduring_calm",
  steadfast_will = "steadfast_will",
  enhancement_of_the_mace_turner = "enhancement_of_the_mace_turner",
  enhancement_of_the_blade_turner = "enhancement_of_the_blade_turner",
  enhancement_of_the_arrow_turner = "enhancement_of_the_arrow_turner",
  storms_enhancement = "storms_enhancement",
  fiery_enhancement = "fiery_enhancement",
  icy_enhancement = "icy_enhancement",
  caustic_enhancement = "caustic_enhancement",
  critical_protection = "critical_protection",
  frenzy_of_the_slayer = "frenzy_of_the_slayer",
  iron_skin_of_the_invincible = "iron_skin_of_the_invincible",
  eye_of_the_remorseless = "eye_of_the_remorseless",
  hand_of_the_remorseless = "hand_of_the_remorseless",
  ciandras_fortune = "ciandras_fortune",
  charmed_smith = "charmed_smith",
  jibrils_essence = "jibrils_essence",
  yoshis_essence = "yoshis_essence",
  celdiseths_essence = "celdiseths_essence",
  kogas_essence = "kogas_essence",
  ciandras_essence = "ciandras_essence",
  master_of_the_steel_circle = "master_of_the_steel_circle",
  master_of_the_five_fold_path = "master_of_the_five_fold_path",
  master_of_the_focused_eye = "master_of_the_focused_eye",
  jack_of_all_trades = "jack_of_all_trades",
  archmages_endurance = "archmages_endurance"
};

export enum LuminanceAura  {
  aetheric_vision = "aetheric_vision",
  craftsman = "craftsman",
  glory = "glory",
  mana_flow = "mana_flow",
  mana_infusion = "mana_infusion",
  protection = "protection",
  purity = "purity",
  skill = "skill",
  temperance = "temperance",
  valor = "valor",
  world = "world",
  specialization = "specialization",
  invulnerability = "invulnerability",
  destruction = "destruction",
  retribution = "retribution",
  hardening = "hardening"
};
