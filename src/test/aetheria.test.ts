import { test, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import store from "../store/index";
import Aetheria from "../components/Aetheria.vue";
import AetheriaSlot from "../components/AetheriaSlot.vue";
import { aetheriaSetBonusLevel } from "../helpers";

beforeEach(() => {
  store.commit("reset");

  // reset() doesn't touch pane visibility, so keep the pane open for tests
  // that assert on its contents.
  if (!store.getters.aetheriaPaneVisible) {
    store.commit("toggleAetheriaPane");
  }
});

const mountPane = () =>
  mount(Aetheria, {
    global: {
      plugins: [store],
    },
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

test("The full combined-level to set-bonus-level table is correct", () => {
  const expected = [0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9, 10];

  expected.forEach((bonus, combined) => {
    expect(aetheriaSetBonusLevel(combined)).toBe(bonus);
  });

  // Above the table, it stays capped
  expect(aetheriaSetBonusLevel(100)).toBe(10);
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

test("aetheriaBonuses computes every set's effect at its bonus level", () => {
  const check = (
    set: string,
    level: number,
    expected: Record<string, number>
  ) => {
    store.commit("reset");
    equip("blue", set, level);

    const bonuses = store.getters.aetheriaBonuses;

    Object.keys(expected).forEach((key) => {
      expect((bonuses as any)[key]).toBe(expected[key]);
    });
  };

  check("growth", 3, { healingRating: 3, dotReduction: 12 });
  check("defense", 4, { damageReduction: 4 });
  check("fury", 2, { critRating: 2, endurance: 2 });
  check("destruction", 5, { damageRating: 5 });
  check("vigor", 3, {
    health: 3,
    stamina: 15,
    mana: 15,
    drainReduction: 12,
  });
});

test("Aetheria does not change base vitals", () => {
  const health = store.getters.healthBase;
  const stamina = store.getters.staminaBase;
  const endurance = store.getters.enduranceBase;

  equip("blue", "vigor", 5);
  equip("yellow", "fury", 5);

  expect(store.getters.healthBase).toBe(health);
  expect(store.getters.staminaBase).toBe(stamina);
  expect(store.getters.enduranceBase).toBe(endurance);
});

test("Sigil of Vigor health is scaled by Asheron's Benediction", () => {
  store.commit("updateAugmentationInvested", {
    name: "asherons_benediction",
    value: 1,
  });

  const before = store.getters.healthBuffed;

  equip("blue", "vigor", 2);

  // +2 health, multiplied by the 10% Benediction bonus
  expect(store.getters.healthBuffed).toBeCloseTo(before + 2 * 1.1);
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
  const wrapper = mountPane();

  const text = wrapper.text();

  expect(text).toContain("Blue");
  expect(text).toContain("Lvl 75+");
  expect(text).toContain("Yellow");
  expect(text).toContain("Lvl 150+");
  expect(text).toContain("Red");
  expect(text).toContain("Lvl 225+");
});

test("Aetheria pane renders three slot rows", () => {
  const wrapper = mountPane();

  expect(wrapper.findAllComponents(AetheriaSlot)).toHaveLength(3);
});

test("Each slot offers every set, surge, and level", () => {
  const wrapper = mountPane();
  const selects = wrapper.findAllComponents(AetheriaSlot)[0].findAll("select");

  expect(selects).toHaveLength(3);

  // Set: None + 5 sigils
  expect(selects[0].findAll("option")).toHaveLength(6);
  expect(selects[0].text()).toContain("Sigil of Vigor");
  expect(selects[0].text()).toContain("Sigil of Growth");

  // Surge: None + 5 surges
  expect(selects[1].findAll("option")).toHaveLength(6);
  expect(selects[1].text()).toContain("Surge of Destruction");
  expect(selects[1].text()).toContain("Surge of Festering");

  // Level: 0-5
  expect(selects[2].findAll("option")).toHaveLength(6);
});

test("Level and surge selects are disabled until a set is chosen", async () => {
  const wrapper = mountPane();

  let selects = wrapper.findAllComponents(AetheriaSlot)[0].findAll("select");
  expect(selects[1].attributes("disabled")).toBeDefined();
  expect(selects[2].attributes("disabled")).toBeDefined();

  await selects[0].setValue("vigor");
  await wrapper.vm.$nextTick();

  selects = wrapper.findAllComponents(AetheriaSlot)[0].findAll("select");
  expect(selects[1].attributes("disabled")).toBeUndefined();
  expect(selects[2].attributes("disabled")).toBeUndefined();
});

test("Choosing a set, surge, and level in the pane updates the planner", async () => {
  const wrapper = mountPane();
  const base = store.getters.healthBuffed;

  await wrapper
    .findAllComponents(AetheriaSlot)[0]
    .findAll("select")[0]
    .setValue("vigor");
  await wrapper.vm.$nextTick();

  const selects = wrapper.findAllComponents(AetheriaSlot)[0].findAll("select");
  await selects[1].setValue("destruction");
  await selects[2].setValue(2);

  expect(store.state.build.character.aetheria.blue.set).toBe("vigor");
  expect(store.state.build.character.aetheria.blue.surge).toBe("destruction");
  expect(store.state.build.character.aetheria.blue.level).toBe(2);
  expect(store.getters.healthBuffed).toBe(base + 2);
});

test("Clearing the set through the pane also clears the level", async () => {
  equip("blue", "vigor", 3);

  const wrapper = mountPane();

  await wrapper
    .findAllComponents(AetheriaSlot)[0]
    .findAll("select")[0]
    .setValue("");

  expect(store.state.build.character.aetheria.blue.set).toBeNull();
  expect(store.state.build.character.aetheria.blue.level).toBe(0);
});

test("Aetheria pane surfaces the level requirement error", () => {
  store.commit("updateLevel", 50);
  equip("blue", "vigor", 1);

  const wrapper = mountPane();

  expect(wrapper.text()).toContain("Aetheria requires a higher level");
  expect(wrapper.find(".error").exists()).toBe(true);
});

test("The row label turns red when the level requirement is not met", () => {
  store.commit("updateLevel", 50);
  equip("blue", "vigor", 1);

  const wrapper = mountPane();
  const firstRow = wrapper.findAllComponents(AetheriaSlot)[0];

  expect(firstRow.find("td").classes()).toContain("red");
});

test("The row label is not red when the level requirement is met", () => {
  store.commit("updateLevel", 225);
  equip("blue", "vigor", 1);

  const wrapper = mountPane();
  const firstRow = wrapper.findAllComponents(AetheriaSlot)[0];

  expect(firstRow.find("td").classes()).not.toContain("red");
});

test("Clicking the pane header toggles its visibility", async () => {
  const wrapper = mountPane();

  expect(store.getters.aetheriaPaneVisible).toBe(true);

  await wrapper.find(".pane-header").trigger("click");

  expect(store.getters.aetheriaPaneVisible).toBe(false);
});