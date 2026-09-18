import { test, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import store from "../store/index";
import Items from "../components/Items.vue";

const ALL_ITEMS = [
  "focusing_stone",
  "font_of_joji",
  "red_colosseum_ring",
  "yellow_colosseum_ring",
  "item_with_hematite_salvage",
  "trinket_augmented_stamina_i",
  "trinket_augmented_stamina_ii",
  "trinket_augmented_stamina_iii",
  "trinket_augmented_damage_i",
  "trinket_augmented_damage_ii",
  "trinket_augmented_damage_iii",
  "trinket_augmented_damage_reduction_i",
  "trinket_augmented_damage_reduction_ii",
  "trinket_augmented_damage_reduction_iii",
  "trinket_augmented_understanding_i",
  "trinket_augmented_understanding_ii",
  "trinket_augmented_understanding_iii",
  "trinket_augmented_health_i",
  "trinket_augmented_health_ii",
  "trinket_augmented_health_iii",
  "trinket_augmented_mana_i",
  "trinket_augmented_mana_ii",
  "trinket_augmented_mana_iii",
];

beforeEach(() => {
  ALL_ITEMS.forEach((id) => {
    store.commit("updateItem", { id, value: false });
  });
});

test("Red Colosseum Ring increases buffed health by 30 (Essence Glutton)", () => {
  const base = store.getters.healthBuffed;

  store.commit("updateItem", { id: "red_colosseum_ring", value: true });

  expect(store.getters.healthBuffed).toBe(base + 30);
});

test("Yellow Colosseum Ring increases buffed stamina by 100 (Empyrean Stamina Absorbtion)", () => {
  const base = store.getters.staminaBuffed;

  store.commit("updateItem", { id: "yellow_colosseum_ring", value: true });

  expect(store.getters.staminaBuffed).toBe(base + 100);
});

test("Yellow Colosseum Ring increases buffed Arcane Lore by 60 (Empyrean Enlightenment)", () => {
  const base = store.getters.arcane_loreBuffed;

  store.commit("updateItem", { id: "yellow_colosseum_ring", value: true });

  expect(store.getters.arcane_loreBuffed).toBe(base + 60);
});

test("Item with Hematite Salvage increases buffed health by 10 (Warrior's Vitality)", () => {
  const base = store.getters.healthBuffed;

  store.commit("updateItem", { id: "item_with_hematite_salvage", value: true });

  expect(store.getters.healthBuffed).toBe(base + 10);
});

test("Colosseum Ring set bonus does not apply with only one ring equipped", () => {
  const melee = store.getters.melee_defenseBuffed;
  const missile = store.getters.missile_defenseBuffed;
  const magic = store.getters.magic_defenseBuffed;

  store.commit("updateItem", { id: "red_colosseum_ring", value: true });

  expect(store.getters.melee_defenseBuffed).toBe(melee);
  expect(store.getters.missile_defenseBuffed).toBe(missile);
  expect(store.getters.magic_defenseBuffed).toBe(magic);

  store.commit("updateItem", { id: "red_colosseum_ring", value: false });
  store.commit("updateItem", { id: "yellow_colosseum_ring", value: true });

  expect(store.getters.melee_defenseBuffed).toBe(melee);
  expect(store.getters.missile_defenseBuffed).toBe(missile);
  expect(store.getters.magic_defenseBuffed).toBe(magic);
});

test("Colosseum Ring set bonus adds 40 to all defenses when both rings equipped", () => {
  const melee = store.getters.melee_defenseBuffed;
  const missile = store.getters.missile_defenseBuffed;
  const magic = store.getters.magic_defenseBuffed;

  store.commit("updateItem", { id: "red_colosseum_ring", value: true });
  store.commit("updateItem", { id: "yellow_colosseum_ring", value: true });

  expect(store.getters.melee_defenseBuffed).toBe(melee + 40);
  expect(store.getters.missile_defenseBuffed).toBe(missile + 40);
  expect(store.getters.magic_defenseBuffed).toBe(magic + 40);
});

test("Trinket Augmented Health imbues increase buffed health by tier", () => {
  const base = store.getters.healthBuffed;

  store.commit("updateItem", { id: "trinket_augmented_health_i", value: true });
  expect(store.getters.healthBuffed).toBe(base + 5);

  store.commit("updateItem", { id: "trinket_augmented_health_i", value: false });
  store.commit("updateItem", { id: "trinket_augmented_health_ii", value: true });
  expect(store.getters.healthBuffed).toBe(base + 10);

  store.commit("updateItem", { id: "trinket_augmented_health_ii", value: false });
  store.commit("updateItem", { id: "trinket_augmented_health_iii", value: true });
  expect(store.getters.healthBuffed).toBe(base + 15);
});

test("Trinket Augmented Stamina imbues increase buffed stamina by tier", () => {
  const base = store.getters.staminaBuffed;

  store.commit("updateItem", { id: "trinket_augmented_stamina_i", value: true });
  expect(store.getters.staminaBuffed).toBe(base + 10);

  store.commit("updateItem", { id: "trinket_augmented_stamina_i", value: false });
  store.commit("updateItem", { id: "trinket_augmented_stamina_ii", value: true });
  expect(store.getters.staminaBuffed).toBe(base + 20);

  store.commit("updateItem", { id: "trinket_augmented_stamina_ii", value: false });
  store.commit("updateItem", { id: "trinket_augmented_stamina_iii", value: true });
  expect(store.getters.staminaBuffed).toBe(base + 30);
});

test("Trinket Augmented Mana imbues increase buffed mana by tier", () => {
  const base = store.getters.manaBuffed;

  store.commit("updateItem", { id: "trinket_augmented_mana_i", value: true });
  expect(store.getters.manaBuffed).toBe(base + 10);

  store.commit("updateItem", { id: "trinket_augmented_mana_i", value: false });
  store.commit("updateItem", { id: "trinket_augmented_mana_ii", value: true });
  expect(store.getters.manaBuffed).toBe(base + 20);

  store.commit("updateItem", { id: "trinket_augmented_mana_ii", value: false });
  store.commit("updateItem", { id: "trinket_augmented_mana_iii", value: true });
  expect(store.getters.manaBuffed).toBe(base + 30);
});

test("Trinket Damage, Damage Reduction, and Understanding imbues are not wired to stats", () => {
  const health = store.getters.healthBuffed;
  const stamina = store.getters.staminaBuffed;
  const mana = store.getters.manaBuffed;

  [
    "trinket_augmented_damage_i",
    "trinket_augmented_damage_ii",
    "trinket_augmented_damage_iii",
    "trinket_augmented_damage_reduction_i",
    "trinket_augmented_damage_reduction_ii",
    "trinket_augmented_damage_reduction_iii",
    "trinket_augmented_understanding_i",
    "trinket_augmented_understanding_ii",
    "trinket_augmented_understanding_iii",
  ].forEach((id) => {
    store.commit("updateItem", { id, value: true });
  });

  expect(store.getters.healthBuffed).toBe(health);
  expect(store.getters.staminaBuffed).toBe(stamina);
  expect(store.getters.manaBuffed).toBe(mana);
});

test("Trinket imbues are mutually exclusive within each slot tier", () => {
  const items = store.state.build.character.items;

  // One Major at a time
  store.commit("updateItem", { id: "trinket_augmented_health_iii", value: true });
  store.commit("updateItem", { id: "trinket_augmented_stamina_iii", value: true });

  expect(items.trinket_augmented_health_iii).toBe(false);
  expect(items.trinket_augmented_stamina_iii).toBe(true);

  // Other tiers are unaffected
  store.commit("updateItem", { id: "trinket_augmented_health_ii", value: true });
  store.commit("updateItem", { id: "trinket_augmented_mana_i", value: true });

  expect(items.trinket_augmented_health_ii).toBe(true);
  expect(items.trinket_augmented_mana_i).toBe(true);
  expect(items.trinket_augmented_stamina_iii).toBe(true);

  // One Moderate at a time
  store.commit("updateItem", { id: "trinket_augmented_mana_ii", value: true });

  expect(items.trinket_augmented_health_ii).toBe(false);
  expect(items.trinket_augmented_mana_ii).toBe(true);

  // Unchecking doesn't affect siblings
  store.commit("updateItem", { id: "trinket_augmented_mana_ii", value: false });

  expect(items.trinket_augmented_health_ii).toBe(false);
  expect(items.trinket_augmented_stamina_iii).toBe(true);
  expect(items.trinket_augmented_mana_i).toBe(true);
});

test("A realistic trinket (Major Health, Moderate Mana, Minor Stamina) stacks", () => {
  const health = store.getters.healthBuffed;
  const stamina = store.getters.staminaBuffed;
  const mana = store.getters.manaBuffed;

  store.commit("updateItem", { id: "trinket_augmented_health_iii", value: true });
  store.commit("updateItem", { id: "trinket_augmented_mana_ii", value: true });
  store.commit("updateItem", { id: "trinket_augmented_stamina_i", value: true });

  expect(store.getters.healthBuffed).toBe(health + 15);
  expect(store.getters.staminaBuffed).toBe(stamina + 10);
  expect(store.getters.manaBuffed).toBe(mana + 20);
});

test("Items pane renders rings, grouped trinket imbues, and group headers", () => {
  const wrapper = mount(Items, {
    global: {
      plugins: [store],
    },
  });

  const text = wrapper.text();

  expect(text).toContain("Red Colosseum Ring");
  expect(text).toContain("Yellow Colosseum Ring");
  expect(text).toContain("Item with Hematite Salvage");

  expect(text).toContain("Trinket — Minor");
  expect(text).toContain("Trinket — Moderate");
  expect(text).toContain("Trinket — Major");

  expect(text).toContain("Augmented Health I");
  expect(text).toContain("Augmented Stamina II");
  expect(text).toContain("Augmented Mana III");
  expect(text).toContain("Augmented Damage III");
  expect(text).toContain("Augmented Damage Reduction II");
  expect(text).toContain("Augmented Understanding I");
});
