export interface Character {
  name: string,
  race: Race,
  gender: Gender,
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
  sharedBuild: string | null,
}

export enum Race {
  Aluvian = "Aluvian",
  "Gharu'ndim" = "Gharu'ndim",
  Sho = "Sho",
  Viamontian = "Viamontian",
  Empyrean = "Empyrean",
  Umbraen = "Umbraen",
  Penumbraen = "Penumbraen"
}

export enum Gender {
  Female = "Female",
  Male = "Male"
}

export enum Attribute {
  Strength,
  Endurance,
  Coordination,
  Quickness,
  Focus,
  Self
}

export enum Vital {
  Health,
  Stamina,
  Mana
}

export enum Skill {
  "Alchemy",
  "Arcane Lore",
  "Armor Tinkering",
  "Assess Creature",
  "Assess Person",
  "Cooking",
  "Creature Enchantment",
  "Deception",
  "Dual Wield",
  "Dirty Fighting",
  "Finesse Weapons",
  "Fletching",
  "Healing",
  "Heavy Weapons",
  "Item Enchantment",
  "Item Tinkering",
  "Jump",
  "Leadership",
  "Life Magic",
  "Light Weapons",
  "Lockpick",
  "Loyalty",
  "Magic Defense",
  "Magic Item Tinkering",
  "Mana Conversion",
  "Melee Defense",
  "Missile Defense",
  "Missile Weapons",
  "Recklessness",
  "Run",
  "Salvaging",
  "Shield",
  "Sneak Attack",
  "Summoning",
  "Two Handed Combat",
  "Void Magic",
  "War Magic",
  "Weapon Tinkering"
};

export enum Training {
  UNUSABLE,
  UNTRAINED,
  TRAINED,
  SPECIALIZED,
};

export enum Augmentation {
  might_of_the_seventh_mule = "Might of the Seventh Mule",
  shadow_of_the_seventh_mule = "Shadow of the Seventh Mule",
  infused_war_magic = "Infused War Magic",
  infused_life_magic = "Infused Life Magic",
  infused_item_magic = "Infused Item Magic",
  infused_creature_magic = "Infused Creature Magic",
  infused_void_magic = "Infused Void Magic",
  clutch_of_the_miser = "Clutch of the Miser",
  enduring_enchantment = "Enduring Enchantment",
  quick_learner = "Quick Learner",
  asherons_lesser_benediction = "Asheron's Lesser Benediction",
  asherons_benediction = "Asheron's Benediction",
  blackmoors_favor = "Blackmoor's Favor",
  innate_renewal = "Innate Renewal",
  reinforcement_of_the_lugians = "Reinforcement of the Lugians",
  bleearghs_fortitude = "Bleeargh's Fortitude",
  oswalds_enhancement = "Oswald's Enhancement",
  siraluuns_blessing = "Siraluun's Blessing",
  enduring_calm = "Enduring Calm",
  steadfast_will = "Steadfast Will",
  enhancement_of_the_mace_turner = "Enhancement of the Mace Turner",
  enhancement_of_the_blade_turner = "Enhancement of the Blade Turner",
  enhancement_of_the_arrow_turner = "Enhancement of the Arrow Turner",
  storms_enhancement = "Storm's Enhancement",
  fiery_enhancement = "Fiery Enhancement",
  icy_enhancement = "Icy Enhancement",
  caustic_enhancement = "Caustic Enhancement",
  critical_protection = "Critical Protection",
  frenzy_of_the_slayer = "Frenzy of the Slayer",
  iron_skin_of_the_invincible = "Iron Skin of the Invincible",
  eye_of_the_remorseless = "Eye of the Remorseless",
  hand_of_the_remorseless = "Hand of the Remorseless",
  ciandras_fortune = "Ciandra's Fortune",
  charmed_smith = "Charmed Smith",
  jibrils_essence = "Jibril's Essence",
  yoshis_essence = "Yoshi's Essence",
  celdiseths_essence = "Celdiseth's Essence",
  kogas_essence = "Koga's Essence",
  ciandras_essence = "Ciandra's Essence",
  master_of_the_steel_circle = "Master of the Steel Circle",
  master_of_the_five_fold_path = "Master of the Five Fold Path",
  master_of_the_focused_eye = "Master of the Focused Eye",
  jack_of_all_trades = "Jack of All Trades",
  archmages_endurance = "Archmage's Endurance"
};

export enum LuminanceAura  {
  aetheric_vision = "Aetheric Vision",
  craftsman = "Craftsman",
  glory = "Glory",
  mana_flow = "Mana Flow",
  mana_infusion = "Mana Infusion",
  protection = "Protection",
  purity = "Purity",
  skill = "Skill",
  temperance = "Temperance",
  valor = "Valor",
  world = "World",
  specialization = "Specialization",
  invulnerability = "Invulnerability",
  destruction = "Destruction",
  retribution = "Retribution",
  hardening = "Hardening"
};