import { test, expect, beforeEach } from "vitest";
import store from "../store/index";

beforeEach(() => {
  store.commit("reset");
});

// --- Cloaked in Skill ---

test("Cloaked in Skill adds +20 to all skill buffed values", () => {
  // Pick a representative skill
  const before = store.getters.alchemyBuffed;

  store.commit("updateCloak", { id: "cloaked_in_skill", value: true });

  expect(store.getters.alchemyBuffed).toBe(before + 20);
});

test("Cloaked in Skill stacks with creature enchantment buff spell", () => {
  // Set alchemy to trained so it can receive buffs meaningfully
  store.commit("increaseTraining", "alchemy");
  const base = store.getters.alchemyBuffed;

  // Add buff VII (+40)
  store.commit("updateSkillBuff", { name: "alchemy", value: 7 });
  const withBuff = store.getters.alchemyBuffed;

  // Add Cloaked in Skill
  store.commit("updateCloak", { id: "cloaked_in_skill", value: true });
  const withBoth = store.getters.alchemyBuffed;

  expect(withBoth).toBe(withBuff + 20);
});

test("Cloaked in Skill stacks with cantrips", () => {
  store.commit("increaseTraining", "war_magic");
  const base = store.getters.war_magicBuffed;

  // Add Epic cantrip (+25)
  store.commit("updateSkillCantrip", { name: "war_magic", value: 3 });
  const withCantrip = store.getters.war_magicBuffed;

  // Add Cloaked in Skill
  store.commit("updateCloak", { id: "cloaked_in_skill", value: true });

  expect(store.getters.war_magicBuffed).toBe(withCantrip + 20);
});

test("Cloaked in Skill stacks with Jack of All Trades", () => {
  // JoAT is already set to 1 for Aluvian by default
  const withJoAT = store.getters.melee_defenseBuffed;

  store.commit("updateCloak", { id: "cloaked_in_skill", value: true });

  expect(store.getters.melee_defenseBuffed).toBe(withJoAT + 20);
});

test("Cloaked in Skill does not affect base skill values", () => {
  const baseBefore = store.getters.alchemyBase;

  store.commit("updateCloak", { id: "cloaked_in_skill", value: true });

  expect(store.getters.alchemyBase).toBe(baseBefore);
});

test("Cloaked in Skill applies to all skills", () => {
  const skills = [
    "alchemy", "arcane_lore", "armor_tinkering", "cooking",
    "creature_enchantment", "heavy_weapons", "life_magic",
    "melee_defense", "war_magic", "run", "jump", "salvaging",
  ];

  const before: Record<string, number> = {};
  skills.forEach((s) => {
    before[s] = store.getters[s + "Buffed"];
  });

  store.commit("updateCloak", { id: "cloaked_in_skill", value: true });

  skills.forEach((s) => {
    expect(store.getters[s + "Buffed"]).toBe(before[s] + 20);
  });
});

test("Unchecking Cloaked in Skill removes the +20 bonus", () => {
  store.commit("updateCloak", { id: "cloaked_in_skill", value: true });
  const with20 = store.getters.alchemyBuffed;

  store.commit("updateCloak", { id: "cloaked_in_skill", value: false });

  expect(store.getters.alchemyBuffed).toBe(with20 - 20);
});

// --- Cloak Damage / Damage Reduction mutual exclusivity ---

test("Cloak damage and damage reduction are mutually exclusive", () => {
  store.commit("updateCloak", { id: "damage", value: 3 });
  expect(store.state.build.character.cloaks.damage).toBe(3);
  expect(store.state.build.character.cloaks.damage_reduction).toBe(0);

  store.commit("updateCloak", { id: "damage_reduction", value: 2 });
  expect(store.state.build.character.cloaks.damage).toBe(0);
  expect(store.state.build.character.cloaks.damage_reduction).toBe(2);
});

test("Setting damage to 0 does not clear damage_reduction", () => {
  store.commit("updateCloak", { id: "damage_reduction", value: 2 });
  store.commit("updateCloak", { id: "damage", value: 0 });

  expect(store.state.build.character.cloaks.damage_reduction).toBe(2);
  expect(store.state.build.character.cloaks.damage).toBe(0);
});

test("Cloak damage rating getter reflects state", () => {
  store.commit("updateCloak", { id: "damage", value: 3 });
  expect(store.getters.cloakDamageRating).toBe(3);
});

test("Cloak damage reduction rating getter reflects state", () => {
  store.commit("updateCloak", { id: "damage_reduction", value: 2 });
  expect(store.getters.cloakDamageReductionRating).toBe(2);
});

test("Cloaked in Skill can coexist with damage rating", () => {
  store.commit("updateCloak", { id: "cloaked_in_skill", value: true });
  store.commit("updateCloak", { id: "damage", value: 2 });

  expect(store.state.build.character.cloaks.cloaked_in_skill).toBe(true);
  expect(store.state.build.character.cloaks.damage).toBe(2);
});

// --- Aetheria ---

test("Aetheria slots default to empty", () => {
  const slots = store.getters.aetheriaSlots;

  slots.forEach((slot: any) => {
    expect(slot.color).toBeNull();
    expect(slot.level).toBe(0);
  });
});

test("Setting aetheria slot color and level", () => {
  store.commit("updateAetheria", { slot: "slot_1", field: "color", value: "blue" });
  store.commit("updateAetheria", { slot: "slot_1", field: "level", value: 5 });

  const slot = store.state.build.character.aetheria.slot_1;
  expect(slot.color).toBe("blue");
  expect(slot.level).toBe(5);
});

test("Clearing aetheria color resets level to 0", () => {
  store.commit("updateAetheria", { slot: "slot_2", field: "color", value: "yellow" });
  store.commit("updateAetheria", { slot: "slot_2", field: "level", value: 3 });

  store.commit("updateAetheria", { slot: "slot_2", field: "color", value: "" });

  const slot = store.state.build.character.aetheria.slot_2;
  expect(slot.color).toBeNull();
  expect(slot.level).toBe(0);
});

test("Multiple aetheria of the same color are allowed", () => {
  store.commit("updateAetheria", { slot: "slot_1", field: "color", value: "blue" });
  store.commit("updateAetheria", { slot: "slot_1", field: "level", value: 5 });
  store.commit("updateAetheria", { slot: "slot_2", field: "color", value: "blue" });
  store.commit("updateAetheria", { slot: "slot_2", field: "level", value: 3 });
  store.commit("updateAetheria", { slot: "slot_3", field: "color", value: "blue" });
  store.commit("updateAetheria", { slot: "slot_3", field: "level", value: 1 });

  const slots = store.getters.aetheriaSlots;
  expect(slots[0].color).toBe("blue");
  expect(slots[0].level).toBe(5);
  expect(slots[1].color).toBe("blue");
  expect(slots[1].level).toBe(3);
  expect(slots[2].color).toBe("blue");
  expect(slots[2].level).toBe(1);
});

test("All three aetheria can be different colors", () => {
  store.commit("updateAetheria", { slot: "slot_1", field: "color", value: "blue" });
  store.commit("updateAetheria", { slot: "slot_1", field: "level", value: 5 });
  store.commit("updateAetheria", { slot: "slot_2", field: "color", value: "yellow" });
  store.commit("updateAetheria", { slot: "slot_2", field: "level", value: 5 });
  store.commit("updateAetheria", { slot: "slot_3", field: "color", value: "red" });
  store.commit("updateAetheria", { slot: "slot_3", field: "level", value: 5 });

  const slots = store.getters.aetheriaSlots;
  expect(slots[0].color).toBe("blue");
  expect(slots[1].color).toBe("yellow");
  expect(slots[2].color).toBe("red");
});

// --- Reset clears cloaks and aetheria ---

test("Reset clears cloak and aetheria state", () => {
  store.commit("updateCloak", { id: "cloaked_in_skill", value: true });
  store.commit("updateCloak", { id: "damage", value: 3 });
  store.commit("updateAetheria", { slot: "slot_1", field: "color", value: "blue" });
  store.commit("updateAetheria", { slot: "slot_1", field: "level", value: 5 });

  store.commit("reset");

  expect(store.state.build.character.cloaks.cloaked_in_skill).toBe(false);
  expect(store.state.build.character.cloaks.damage).toBe(0);
  expect(store.state.build.character.cloaks.damage_reduction).toBe(0);
  expect(store.state.build.character.aetheria.slot_1.color).toBeNull();
  expect(store.state.build.character.aetheria.slot_1.level).toBe(0);
});
