# Plan: Aetheria support

Status: in progress (PR-ready target)
Source of truth: `en.acpedia.org/wiki/Aetheria` (rev 447175, last modified 2020-02-04)

## Goal

Add Aetheria tracking and its stat effects to the planner, replacing the
reverted `#415` attempt, which modelled the system incorrectly.

## Correct game model (verified against ACPedia)

- **3 slots, one per color.** Blue = Aetheria of Lyr (75+), Yellow = Aetheria
  of Kor (150+), Red = Aetheria of Tem (225+). Color is the slot/min-level,
  not the effect.
- **Set (Sigil) and Surge are independent properties.**
  - Sets: Growth, Defense, Fury, Destruction, Vigor.
  - Surges: Destruction, Protection, Regeneration, Affliction, Festering.
- **Levels are numeric 0-5.** 0 = no benefit. "Coalesced Aetheria" is the
  unrevealed loot item, not a level name.
- **Set bonus is driven by the sum of the equipped levels in the same set**,
  mapped to a set bonus level (capped at 10) with diminishing returns:

  | Combined | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
  |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
  | Bonus level | 1 | 2 | 3 | 4 | 5 | 6 | 6 | 7 | 7 | 8 | 8 | 9 | 9 | 9 | 10 |

- **Set effects at bonus level N (1-10):**
  - Growth: Healing Rating +N, DoT Reduction +4N
  - Defense: Damage Reduction +N
  - Fury: Critical Rating +N, **Endurance +N**
  - Destruction: Damage Rating +N
  - Vigor: **Health +N, Stamina +5N, Mana +5N**, Drain Reduction +4N
- **Surges are temporary procs** of fixed magnitude. They must not change the
  computed character sheet.

## Scope

Only **Vigor** and **Fury** are wired into computed values (the planner models
vitals and attributes). Growth / Defense / Destruction and all surges are
tracked and displayed but not computed, matching the Items pane policy.

## Level requirement check (pane header)

- Blue 75+, Yellow 150+, Red 225+.
- Getter `aetheriaErrors` (same convention as `augmentationErrors`,
  `armorSetNumEquippedErrors`): returns a string when any present Aetheria
  (`set !== null`) exceeds the character's level, otherwise `null`.
- Shown in the Aetheria pane header with the existing
  `<span v-if="errors" class="error">` markup.
- Each row shows the requirement as subtle `.faded` text ("Lvl 75+"), matching
  `ArmorSet.vue` / `.faded` styling, with a `.red` label when that slot fails.

## Data model

```ts
enum AetheriaColor { blue, yellow, red }
enum AetheriaSet { growth, defense, fury, destruction, vigor }
enum AetheriaSurge { destruction, protection, regeneration, affliction, festering }

interface AetheriaSlot { set: AetheriaSet | null; surge: AetheriaSurge | null; level: number; }
interface Aetheria { blue: AetheriaSlot; yellow: AetheriaSlot; red: AetheriaSlot; }
```

`Character.aetheria: Aetheria`, `PaneVisibility.aetheria: boolean`.

## Files

- `src/types.ts` - enums, `AetheriaSlot`/`Aetheria`/`AetheriaBonuses`,
  `Character.aetheria`, `PaneVisibility.aetheria`.
- `src/constants.ts` - colors/sets/surges, `MAX_AETHERIA_LEVEL`,
  `AETHERIA_MIN_LEVEL_BY_COLOR`, `AETHERIA_SET_BONUS_LEVEL`,
  `AETHERIA_SET_EFFECTS`.
- `src/mappings.ts` - names + extra info for colors/sets/surges.
- `src/helpers.ts` - combined levels, set bonus levels, aggregated bonuses.
- `src/store/DefaultCharacter.ts` - empty `aetheria`.
- `src/store/state.ts` - `paneVisibility.aetheria`.
- `src/store/mutations.ts` - `toggleAetheriaPane`, `updateAetheria`.
- `src/store/getters.ts` - pane visibility, set levels, bonuses, errors; wire
  Vigor/Fury into `healthBuffed`/`staminaBuffed`/`manaBuffed`/`enduranceBuffed`.
- `src/components/Aetheria.vue`, `src/components/AetheriaSlot.vue`.
- `src/components/Planner.vue` - register/render the pane.
- `src/test/aetheria.test.ts` - unit + component tests.

## Decisions

- Reverted PR/branch deleted (local + remote); its tests encode wrong rules
  (duplicate colors, color-derived effects, invented level names).
- Cloaks are out of scope.
- Aetheria min-level is **not** folded into the XP-derived `requiredLevel` row;
  the pane header is the home for the error.

## Verification

- `npm test`
- `npm run build` (runs `vue-tsc --noEmit`)
- Manual: pane toggles, level error appears/clears, Vigor/Fury change vitals.