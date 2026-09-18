import { test, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import store from "../store/index";
import Aetheria from "../components/Aetheria.vue";

beforeEach(() => {
  store.commit("reset");
});

const equip = (
  slot: string,
  set: string | null,
  level: number,
  surge: string | null = null
) => {
  store.commit("updateAetheria", { slot, field: "set", value: set });
  store.commit("updateAetheria", { slot, field: "surge", value: surge });
  store.commit("updateAetheria", { slot, field: "level", value: level });
};

// --- Set bonus aggregation ---

test("Aetheria set bonus level follows the combined-level table", () => {
  equip("blue", "vigor", 3);
  equip("yellow", "vigor", 3);

  // Combined level 6 -> set bonus level 6
  expect(store.getters.aetheriaSetLevels.vigor).toBe(6);
});

test("Aetheria set bonus level has diminishing returns", () => {
  equip("blue", "vigor", 4);
  equip("yellow", "vigor", 3);

  // Combined level 7 -> set bonus level 6
  expect(store.getters.aetheriaSetLevels.vigor).toBe(6);
});

test("Aetheria set bonus level is capped at 10", () => {
  equip("blue", "vigor", 5);
  equip("yellow", "vigor", 5);
  equip("red", "vigor", 5);

  // Combined level 15 -> set bonus level 10
  expect(store.getters.aetheriaSetLevels.vigor).toBe(10);
});

test("Different Aetheria sets are tracked independently", () => {
  equip("blue", "vigor", 5);
  equip("yellow", "fury", 5);
  equip("red", "destruction", 5);

  const levels = store.getters.aetheriaSetLevels;

  expect(levels.vigor).toBe(5);
  expect(levels.fury).toBe(5);
  expect(levels.destruction).toBe(5);
  expect(levels.growth).toBe(0);
  expect(levels.defense).toBe(0);
});

test("A level 0 Aetheria provides no set bonus", () => {
  const health = store.getters.healthBuffed;
  const stamina = store.getters.staminaBuffed;
  const mana = store.getters.manaBuffed;

  equip("blue", "vigor", 0);

  expect(store.getters.healthBuffed).toBe(health);
  expect(store.getters.staminaBuffed).toBe(stamina);
  expect(store.getters.manaBuffed).toBe(mana);
});

test("Setting a level on an empty slot provides no bonus", () => {
  const health = store.getters.healthBuffed;

  store.commit("updateAetheria", { slot: "blue", field: "level", value: 5 });

  expect(store.getters.healthBuffed).toBe(health);
});

// --- Vigor ---

test("Sigil of Vigor grants health, stamina, and mana per bonus level", () => {
  const health = store.getters.healthBuffed;
  const stamina = store.getters.staminaBuffed;
  const mana = store.getters.manaBuffed;

  equip("blue", "vigor", 2);

  expect(store.getters.healthBuffed).toBe(health + 2);
  expect(store.getters.staminaBuffed).toBe(stamina + 10);
  expect(store.getters.manaBuffed).toBe(mana + 10);
});

test("Sigil of Vigor stacks across slots by combined level", () => {
  const health = store.getters.healthBuffed;
  const stamina = store.getters.staminaBuffed;
  const mana = store.getters.manaBuffed;

  equip("blue", "vigor", 3);
  equip("yellow", "vigor", 3);

  // Combined 6 -> bonus level 6
  expect(store.getters.healthBuffed).toBe(health + 6);
  expect(store.getters.staminaBuffed).toBe(stamina + 30);
  expect(store.getters.manaBuffed).toBe(mana + 30);
});

// --- Fury ---

test("Sigil of Fury grants endurance, which also boosts health and stamina", () => {
  const health = store.getters.healthBuffed;
  const stamina = store.getters.staminaBuffed;
  const endurance = store.getters.enduranceBuffed;

  equip("blue", "fury", 2);

  expect(store.getters.enduranceBuffed).toBe(endurance + 2);
  expect(store.getters.staminaBuffed).toBe(stamina + 2);
  expect(store.getters.healthBuffed).toBe(health + 1);
});

test("Vigor and Fury from different sets stack", () => {
  const health = store.getters.healthBuffed;
  const stamina = store.getters.staminaBuffed;
  const mana = store.getters.manaBuffed;
  const endurance = store.getters.enduranceBuffed;

  equip("blue", "vigor", 5);
  equip("yellow", "fury", 5);

  expect(store.getters.healthBuffed).toBe(health + 5 + 2.5);
  expect(store.getters.staminaBuffed).toBe(stamina + 25 + 5);
  expect(store.getters.manaBuffed).toBe(mana + 25);
  expect(store.getters.enduranceBuffed).toBe(endurance + 5);
});

// --- Mutations ---

test("Aetheria level is clamped to 0-5", () => {
  store.commit("updateAetheria", { slot: "blue", field: "set", value: "vigor" });

  store.commit("updateAetheria", { slot: "blue", field: "level", value: 99 });
  expect(store.state.build.character.aetheria.blue.level).toBe(5);

  store.commit("updateAetheria", { slot: "blue", field: "level", value: -3 });
  expect(store.state.build.character.aetheria.blue.level).toBe(0);

  store.commit("updateAetheria", { slot: "blue", field: "level", value: "abc" });
  expect(store.state.build.character.aetheria.blue.level).toBe(0);
});

test("Clearing the set clears the level", () => {
  equip("blue", "vigor", 4);

  store.commit("updateAetheria", { slot: "blue", field: "set", value: "" });

  expect(store.state.build.character.aetheria.blue.set).toBeNull();
  expect(store.state.build.character.aetheria.blue.level).toBe(0);
});

test("Reset clears Aetheria", () => {
  equip("blue", "vigor", 4);

  store.commit("reset");

  expect(store.state.build.character.aetheria.blue.set).toBeNull();
  expect(store.state.build.character.aetheria.blue.level).toBe(0);
});

// --- Level requirement errors ---

test("No error when no Aetheria are present", () => {
  expect(store.getters.aetheriaErrors).toBeNull();
});

test("Aetheria below its required level produces an error", () => {
  store.commit("updateLevel", 50);
  equip("blue", "vigor", 1);

  expect(store.getters.aetheriaErrors).toContain("Blue (75+)");
});

test("Only the violating colors are listed", () => {
  store.commit("updateLevel", 100);
  equip("blue", "vigor", 1);
  equip("yellow", "vigor", 1);

  const errors = store.getters.aetheriaErrors;

  expect(errors).toContain("Yellow (150+)");
  expect(errors).not.toContain("Blue");
});

test("A level 0 Aetheria still requires the minimum level", () => {
  store.commit("updateLevel", 50);
  equip("blue", "vigor", 0);

  expect(store.getters.aetheriaErrors).toContain("Blue (75+)");
});

test("Raising the character level clears the error", () => {
  store.commit("updateLevel", 50);
  equip("blue", "vigor", 1);
  equip("red", "vigor", 1);

  expect(store.getters.aetheriaErrors).not.toBeNull();

  store.commit("updateLevel", 225);

  expect(store.getters.aetheriaErrors).toBeNull();
});

test("Growth, Defense, and Destruction are tracked but not wired to vitals", () => {
  const health = store.getters.healthBuffed;
  const stamina = store.getters.staminaBuffed;
  const mana = store.getters.manaBuffed;

  equip("blue", "growth", 5);
  equip("yellow", "defense", 5);
  equip("red", "destruction", 5);

  expect(store.getters.healthBuffed).toBe(health);
  expect(store.getters.staminaBuffed).toBe(stamina);
  expect(store.getters.manaBuffed).toBe(mana);

  // ...but their bonuses are still computed for display
  expect(store.getters.aetheriaBonuses.healingRating).toBe(5);
  expect(store.getters.aetheriaBonuses.damageReduction).toBe(5);
  expect(store.getters.aetheriaBonuses.damageRating).toBe(5);
});

test("Surges are display-only and do not change stats", () => {
  const health = store.getters.healthBuffed;
  const stamina = store.getters.staminaBuffed;
  const mana = store.getters.manaBuffed;
  const endurance = store.getters.enduranceBuffed;

  equip("blue", "vigor", 0, "destruction");
  equip("yellow", "fury", 0, "protection");
  equip("red", "growth", 0, "regeneration");

  expect(store.getters.healthBuffed).toBe(health);
  expect(store.getters.staminaBuffed).toBe(stamina);
  expect(store.getters.manaBuffed).toBe(mana);
  expect(store.getters.enduranceBuffed).toBe(endurance);
});

// --- Component rendering ---

test("Aetheria pane renders each color and its level requirement", () => {
  const wrapper = mount(Aetheria, {
    global: {
      plugins: [store],
    },
  });

  const text = wrapper.text();

  expect(text).toContain("Blue");
  expect(text).toContain("Lvl 75+");
  expect(text).toContain("Yellow");
  expect(text).toContain("Lvl 150+");
  expect(text).toContain("Red");
  expect(text).toContain("Lvl 225+");
});

test("Aetheria pane surfaces the level requirement error", () => {
  store.commit("updateLevel", 50);
  equip("blue", "vigor", 1);

  const wrapper = mount(Aetheria, {
    global: {
      plugins: [store],
    },
  });

  expect(wrapper.text()).toContain("Aetheria requires a higher level");
  expect(wrapper.find(".error").exists()).toBe(true);
});