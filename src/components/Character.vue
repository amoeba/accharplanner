<template>
  <div>
    <h1>Character</h1>
    <ul>
      <li>Level: <input type="range" min="1" max="275" v-model="level" /> {{ level }}</li>
      <li>Extra skill credits:
        <ul>
          <li>Railrea: <input type="checkbox" v-model="railrea" /></li>
          <li>Owsald: <input type="checkbox" v-model="owsald" /></li>
          <li>Luminance (1): <input type="checkbox" v-model="lum1" /></li>
          <li>Luminance (2): <input type="checkbox" v-model="lum2" /></li>
        </ul>
      </li>
      <li v-if="total_skill_cost > available_skill_credits">You've overspent skill credits by {{ total_skill_cost - available_skill_credits }} credits!</li>
      <li>Total Attribute Cost: {{ total_attribute_cost }}</li>
      <li>Total skill points spent: {{ total_skill_cost }}</li>
      <li>Skill credits available: {{ available_skill_credits }}</li>
    </ul>

    <h2>Attributes</h2>
    <table>
      <tbody>
        <tr>
          <td>Strength</td>
          <td><input type="range" min="10" max="100" v-model="strength" /></td>
          <td>{{ strength }}</td>
        </tr>
        <tr>
          <td>Endurance</td>
          <td><input type="range" min="10" max="100" v-model="endurance" /></td>
          <td>{{ endurance }}</td>
        </tr>
        <tr>
          <td>Coordination</td>
          <td><input type="range" min="10" max="100" v-model="coordination" /></td>
          <td>{{ coordination }}</td>
        </tr>
        <tr>
          <td>Quickness</td>
          <td><input type="range" min="10" max="100" v-model="quickness" /></td>
          <td>{{ quickness }}</td>
        </tr>
        <tr>
          <td>Focus</td>
          <td><input type="range" min="10" max="100" v-model="focus" /></td>
          <td>{{ focus }}</td>
        </tr>
        <tr>
          <td>Self</td>
          <td><input type="range" min="10" max="100" v-model="self" /></td>
          <td>{{ self }}</td>
        </tr>
        <tr>
          <td>Health</td>
          <td></td>
          <td>{{ health }}</td>
        </tr>
        <tr>
          <td>Stamina</td>
          <td></td>
          <td>{{ stamina }}</td>
        </tr>
        <tr>
          <td>Mana</td>
          <td></td>
          <td>{{ mana }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Skills</h2>

    <h3>Specialized {{ total_specialized_cost }} / 70</h3>
    <table>
      <tbody>
        <tr v-for="skill in specializedSkills">
          <td class="skill-name">{{ skill.name }}</td>
          <td class="skill-value">{{ skillValue(skill.id) }}</td>
          <td class="skill-raise"><button :data-skill="skill.id" v-on:click="unSpecializeSkill">-</button></td>
          <td class="skill-lower"></td>
        </tr>
      </tbody>
    </table>

    <h3>Trained</h3>
    <table>
      <tbody>
        <tr v-for="skill in trainedSkills">
          <td class="skill-name">{{ skill.name }}</td>
          <td class="skill-value">{{ skillValue(skill.id) }}</td>
          <td class="skill-raise"><button :data-skill="skill.id" v-if="isSpecializable(skill.id)" v-on:click="specializeSkill">+</button></td>
          <td class="skill-lower"><button :data-skill="skill.id" v-if="isUntrainable(skill.id)" v-on:click="unTrainSkill">-</button></td>
        </tr>
      </tbody>
    </table>

    <h3>Untrained</h3>
    <table>
      <tbody>
        <tr v-for="skill in untrainedSkills">
          <td class="skill-name">{{ skill.name }}</td>
          <td class="skill-value">{{ skillValue(skill.id) }}</td>
          <td class="skill-raise"><button :data-skill="skill.id" v-if="isTrainable(skill.id)" v-on:click="trainSkill">+</button></td>
          <td class="skill-lower"></td>
        </tr>
      </tbody>
    </table>

    <h3>Unusable</h3>
    <table>
      <tbody>
        <tr v-for="skill in unusableSkills">
          <td class="skill-name">{{ skill.name }}</td>
          <td class="skill-value">0</td>
          <td class="skill-raise"><button :data-skill="skill.id" v-if="isTrainable(skill.id)" v-on:click="trainSkill">+</button></td>
          <td class="skill-lower"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

const SPECIALIZED_LIMIT = 64
const creditsAtLevel = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
  12: 10,
  14: 11,
  16: 12,
  18: 13,
  20: 14,
  23: 15,
  26: 16,
  29: 17,
  32: 18,
  35: 19,
  40: 20,
  45: 21,
  50: 22,
  55: 23,
  60: 24,
  65: 25,
  70: 26,
  75: 27,
  80: 28,
  85: 29,
  90: 30,
  95: 31,
  100: 32,
  105: 33,
  110: 34,
  115: 35,
  120: 36,
  125: 37,
  130: 38,
  140: 39,
  150: 40,
  160: 41,
  180: 42,
  200: 43,
  225: 44,
  250: 45,
  275: 46
}

// Note that this is not cost _to_ train or spec, but cost _when_ trained or
// specialized
const cost = {
  alchemy: { trained: 6, specialized: 6 },
  arcane_lore: { trained: 0, specialized: 2 },
  armor_tinkering: { trained: 4, specialized: 0 },
  assess_creature: { trained: 0, specialized: 2 },
  assess_person: { trained: 2, specialized: 2 },
  cooking: { trained: 4, specialized: 4 },
  creature_enchantment: { trained: 8, specialized: 8 },
  deception: { trained: 4, specialized: 2 },
  dual_wield: { trained: 2, specialized: 2 },
  dirty_fighting: { trained: 2, specialized: 2 },
  finesse_weapons: { trained: 4, specialized: 4 },
  fletching: { trained: 4, specialized: 4 },
  healing: { trained: 6, specialized: 4 },
  heavy_weapons: { trained: 6, specialized: 6 },
  item_enchantment: { trained: 8, specialized: 8 },
  item_tinkering: { trained: 2, specialized: 0 },
  jump: { trained: 0, specialized: 4 },
  leadership: { trained: 4, specialized: 2 },
  life_magic: { trained: 12, specialized: 8 },
  light_weapons: { trained: 4, specialized: 4 },
  lockpick: { trained: 6, specialized: 4 },
  loyalty: { trained: 0, specialized: 2 },
  magic_defense: { trained: 0, specialized: 12 },
  magic_item_tinkering: { trained: 4, specialized: 0 },
  mana_conversion: { trained: 6, specialized: 6 },
  melee_defense: { trained: 10, specialized: 10 },
  missile_defense: { trained: 6, specialized: 4 },
  missile_weapons: { trained: 6, specialized: 6 },
  recklessness: { trained: 4, specialized: 2 },
  run: { trained: 0, specialized: 4 },
  salvaging: { trained: 0, specialized: 0 },
  shield: { trained: 2, specialized: 2 },
  sneak_attack: { trained: 4, specialized: 2 },
  summoning: { trained: 8, specialized: 4 },
  two_handed_combat: { trained: 8, specialized: 8 },
  void_magic: { trained: 16, specialized: 12 },
  war_magic: { trained: 16, specialized: 12 },
  weapon_tinkering: { trained: 4, specialized: 0 }
}

const untrainable = {
  alchemy: true,
  arcane_lore: false,
  armor_tinkering: true,
  assess_creature: true,
  assess_person: true,
  cooking: true,
  creature_enchantment: true,
  deception: true,
  dual_wield: true,
  dirty_fighting: true,
  finesse_weapons: true,
  fletching: true,
  healing: true,
  heavy_weapons: true,
  item_enchantment: true,
  item_tinkering: true,
  jump: false,
  leadership: true,
  life_magic: true,
  light_weapons: true,
  lockpick: true,
  loyalty: false,
  magic_defense: false,
  magic_item_tinkering: true,
  mana_conversion: true,
  melee_defense: true,
  missile_defense: true,
  missile_weapons: true,
  recklessness: true,
  run: false,
  salvaging: false,
  shield: true,
  sneak_attack: true,
  summoning: true,
  two_handed_combat: true,
  void_magic: true,
  war_magic: true,
  weapon_tinkering: true
}

const untrainedState = {
  alchemy: 'unusable',
  arcane_lore: 'trained',
  armor_tinkering: 'untrained',
  assess_creature: 'unusable',
  assess_person: 'unusable',
  cooking: 'unusable',
  creature_enchantment: 'unusable',
  deception: 'unusable',
  dual_wield: 'unusable',
  dirty_fighting: 'unusable',
  finesse_weapons: 'untrained',
  fletching: 'unusable',
  healing: 'unusable',
  heavy_weapons: 'untrained',
  item_enchantment: 'unusable',
  item_tinkering: 'untrained',
  jump: 'trained',
  leadership: 'untrained',
  life_magic: 'unusable',
  light_weapons: 'untrained',
  lockpick: 'unusable',
  loyalty: 'trained',
  magic_defense: 'trained',
  magic_item_tinkering: 'untrained',
  mana_conversion: 'unusable',
  melee_defense: 'untrained',
  missile_defense: 'untrained',
  missile_weapons: 'untrained',
  recklessness: 'unusable',
  run: 'trained',
  salvaging: 'trained',
  shield: 'untrained',
  sneak_attack: 'unusable',
  summoning: 'untrained',
  two_handed_combat: 'untrained',
  void_magic: 'unusable',
  war_magic: 'unusable',
  weapon_tinkering: 'untrained'
}

const closest = function (array, value) {
  var idx = 0

  for (var i = array.length - 1; i >= 0; i--) {
    if (Math.abs(value - array[i]) < Math.abs(value - array[idx])) {
      idx = i
    }
  }

  return array[idx]
}

export default {
  data: function () {
    return {
      level: 1,
      strength: 30,
      endurance: 30,
      coordination: 30,
      quickness: 30,
      focus: 30,
      self: 30,
      railrea: false,
      owsald: false,
      lum1: false,
      lum2: false,
      skills: [
        {
          id: 'alchemy',
          name: 'Alchemy',
          training: 'unusable'
        },
        {
          id: 'arcane_lore',
          name: 'Arcane Lore',
          training: 'trained'
        },
        {
          id: 'armor_tinkering',
          name: 'Armor Tinkering',
          training: 'untrained'
        },
        {
          id: 'assess_creature',
          name: 'Assess Creature',
          training: 'unusable'
        },
        {
          id: 'assess_person',
          name: 'Assess Person',
          training: 'unusable'
        },
        {
          id: 'cooking',
          name: 'Cooking',
          training: 'unusable'
        },
        {
          id: 'creature_enchantment',
          name: 'Creature Enchantment',
          training: 'unusable'
        },
        {
          id: 'deception',
          name: 'Deception',
          training: 'unusable'
        },
        {
          id: 'dual_wield',
          name: 'Dual Wield',
          training: 'unusable'
        },
        {
          id: 'dirty_fighting',
          name: 'Dirty Fighting',
          training: 'unusable'
        },
        {
          id: 'finesse_weapons',
          name: 'Finesse Weapons',
          training: 'untrained'
        },
        {
          id: 'fletching',
          name: 'Fletching',
          training: 'unusable'
        },
        {
          id: 'healing',
          name: 'Healing',
          training: 'unusable'
        },
        {
          id: 'heavy_weapons',
          name: 'Heavy Weapons',
          training: 'untrained'
        },
        {
          id: 'item_enchantment',
          name: 'Item Enchantment',
          training: 'unusable'
        },
        {
          id: 'item_tinkering',
          name: 'Item Tinkering',
          training: 'untrained'
        },
        {
          id: 'jump',
          name: 'Jump',
          training: 'trained'
        },
        {
          id: 'leadership',
          name: 'Leadership',
          training: 'untrained'
        },
        {
          id: 'life_magic',
          name: 'Life Magic',
          training: 'unusable'
        },
        {
          id: 'light_weapons',
          name: 'Light Weapons',
          training: 'untrained'
        },
        {
          id: 'lockpick',
          name: 'Lockpick',
          training: 'unusable'
        },
        {
          id: 'loyalty',
          name: 'Loyalty',
          training: 'trained'
        },
        {
          id: 'magic_defense',
          name: 'Magic Defense',
          training: 'trained'
        },
        {
          id: 'magic_item_tinkering',
          name: 'Magic Item Tinkering',
          training: 'untrained'
        },
        {
          id: 'mana_conversion',
          name: 'Mana Conversion',
          training: 'unusable'
        },
        {
          id: 'melee_defense',
          name: 'Melee Defense',
          training: 'untrained'
        },
        {
          id: 'missile_defense',
          name: 'Missile Defense',
          training: 'untrained'
        },
        {
          id: 'missile_weapons',
          name: 'Missile Weapons',
          training: 'untrained'
        },
        {
          id: 'recklessness',
          name: 'Recklessness',
          training: 'unusable'
        },
        {
          id: 'run',
          name: 'Run',
          training: 'trained'
        },
        {
          id: 'salvaging',
          name: 'Salvaging',
          training: 'trained'
        },
        {
          id: 'shield',
          name: 'Shield',
          training: 'untrained'
        },
        {
          id: 'sneak_attack',
          name: 'Sneak Attack',
          training: 'unusable'
        },
        {
          id: 'summoning',
          name: 'Summoning',
          training: 'untrained'
        },
        {
          id: 'two_handed_combat',
          name: 'Two Handed Combat',
          training: 'untrained'
        },
        {
          id: 'void_magic',
          name: 'Void Magic',
          training: 'unusable'
        },
        {
          id: 'war_magic',
          name: 'War Magic',
          training: 'unusable'
        },
        {
          id: 'weapon_tinkering',
          name: 'Weapon Tinkering',
          training: 'untrained'
        }
      ]
    }
  },
  computed: {
    // Attributes
    total_attribute_cost: function () {
      return Number(this.strength) +
        Number(this.endurance) +
        Number(this.coordination) +
        Number(this.quickness) +
        Number(this.focus) +
        Number(this.self)
    },
    // Vitals
    health: function () {
      return Math.round(this.endurance / 2, 0)
    },
    stamina: function () {
      return this.endurance
    },
    mana: function () {
      return this.self
    },
    // Skill costs
    total_skill_cost: function () {
      // This doesn't update reactively if it's done programmatically
      return cost[this.skills[0].id][this.skills[0].training] || 0 +
        cost[this.skills[1].id][this.skills[1].training] || 0 +
        cost[this.skills[2].id][this.skills[2].training] || 0 +
        cost[this.skills[3].id][this.skills[3].training] || 0 +
        cost[this.skills[4].id][this.skills[4].training] || 0 +
        cost[this.skills[5].id][this.skills[5].training] || 0 +
        cost[this.skills[6].id][this.skills[6].training] || 0 +
        cost[this.skills[7].id][this.skills[7].training] || 0 +
        cost[this.skills[8].id][this.skills[8].training] || 0 +
        cost[this.skills[9].id][this.skills[9].training] || 0 +
        cost[this.skills[10].id][this.skills[10].training] || 0 +
        cost[this.skills[11].id][this.skills[11].training] || 0 +
        cost[this.skills[12].id][this.skills[12].training] || 0 +
        cost[this.skills[13].id][this.skills[13].training] || 0 +
        cost[this.skills[14].id][this.skills[14].training] || 0 +
        cost[this.skills[15].id][this.skills[15].training] || 0 +
        cost[this.skills[16].id][this.skills[16].training] || 0 +
        cost[this.skills[17].id][this.skills[17].training] || 0 +
        cost[this.skills[18].id][this.skills[18].training] || 0 +
        cost[this.skills[19].id][this.skills[19].training] || 0 +
        cost[this.skills[20].id][this.skills[20].training] || 0 +
        cost[this.skills[21].id][this.skills[21].training] || 0 +
        cost[this.skills[22].id][this.skills[22].training] || 0 +
        cost[this.skills[23].id][this.skills[23].training] || 0 +
        cost[this.skills[24].id][this.skills[24].training] || 0 +
        cost[this.skills[25].id][this.skills[25].training] || 0 +
        cost[this.skills[26].id][this.skills[26].training] || 0 +
        cost[this.skills[27].id][this.skills[27].training] || 0 +
        cost[this.skills[28].id][this.skills[28].training] || 0 +
        cost[this.skills[29].id][this.skills[29].training] || 0 +
        cost[this.skills[30].id][this.skills[30].training] || 0 +
        cost[this.skills[31].id][this.skills[31].training] || 0 +
        cost[this.skills[32].id][this.skills[32].training] || 0 +
        cost[this.skills[33].id][this.skills[33].training] || 0 +
        cost[this.skills[34].id][this.skills[34].training] || 0 +
        cost[this.skills[35].id][this.skills[35].training] || 0 +
        cost[this.skills[36].id][this.skills[36].training] || 0 +
        cost[this.skills[37].id][this.skills[37].training] || 0
    },
    total_specialized_cost: function () {
      return this.skills.filter(function (s) {
        return s.training === 'specialized'
      }).reduce(function (sum, skill) {
        return sum + cost[skill.id].specialized
      }, 0)
    },
    available_skill_credits: function () {
      return 52 +
        this.skillCreditsAtLevel(this.level) +
        Number((this.railrea ? 1 : 0)) +
        Number((this.owsald ? 1 : 0)) +
        Number((this.lum1 ? 1 : 0)) +
        Number((this.lum2 ? 1 : 0))
    },
    alchemy: function () {
      return Math.round((Number(this.coordination) + Number(this.focus)) / 3) + (this.skills[0].training === 'specialized' ? 15 : 5)
    },
    arcane_lore: function () {
      return Math.round(Number(this.focus) / 3) + (this.skills[1].training === 'specialized' ? 15 : 5)
    },
    armor_tinkering: function () {
      return Math.round((Number(this.endurance) + Number(this.focus)) / 2) + (this.skills[2].training === 'specialized' ? 15 : 5)
    },
    assess_creature: function () {
      return 0 + (this.skills[3].training === 'specialized' ? 15 : 5)
    },
    assess_person: function () {
      return 0 + (this.skills[4].training === 'specialized' ? 15 : 5)
    },
    cooking: function () {
      return Math.round((Number(this.coordination) + Number(this.focus)) / 3) + (this.skills[5].training === 'specialized' ? 15 : 5)
    },
    creature_enchantment: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 4) + (this.skills[6].training === 'specialized' ? 15 : 5)
    },
    deception: function () {
      return 0 + (this.skills[7].training === 'specialized' ? 15 : 5)
    },
    dual_wield: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 3) + (this.skills[8].training === 'specialized' ? 15 : 5)
    },
    dirty_fighting: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 3) + (this.skills[9].training === 'specialized' ? 15 : 5)
    },
    finesse_weapons: function () {
      return Math.round((Number(this.coordination) + Number(this.quickness)) / 3) + (this.skills[10].training === 'specialized' ? 15 : 5)
    },
    fletching: function () {
      return Math.round((Number(this.coordination) + Number(this.focus)) / 3) + (this.skills[11].training === 'specialized' ? 15 : 5)
    },
    healing: function () {
      return Math.round((Number(this.focus) + Number(this.coordination)) / 3) + (this.skills[12].training === 'specialized' ? 15 : 5)
    },
    heavy_weapons: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 3) + (this.skills[13].training === 'specialized' ? 15 : 5)
    },
    item_enchantment: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 4) + (this.skills[14].training === 'specialized' ? 15 : 5)
    },
    item_tinkering: function () {
      return Math.round((Number(this.focus) + Number(this.coordination)) / 2) + (this.skills[15].training === 'specialized' ? 15 : 5)
    },
    jump: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 2) + (this.skills[16].training === 'specialized' ? 15 : 5)
    },
    leadership: function () {
      return 0 + (this.skills[17].training === 'specialized' ? 15 : 5)
    },
    life_magic: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 4) + (this.skills[18].training === 'specialized' ? 15 : 5)
    },
    light_weapons: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 3) + (this.skills[19].training === 'specialized' ? 15 : 5)
    },
    lockpick: function () {
      return Math.round((Number(this.coordination) + Number(this.focus)) / 3) + (this.skills[20].training === 'specialized' ? 15 : 5)
    },
    loyalty: function () {
      return 0 + (this.skills[21].training === 'specialized' ? 15 : 5)
    },
    magic_defense: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 7) + (this.skills[22].training === 'specialized' ? 15 : 5)
    },
    magic_item_tinkering: function () {
      return Number(this.focus) + (this.skills[23].training === 'specialized' ? 15 : 5)
    },
    mana_conversion: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 6) + (this.skills[24].training === 'specialized' ? 15 : 5)
    },
    melee_defense: function () {
      return Math.round((Number(this.coordination) + Number(this.quickness)) / 3) + (this.skills[25].training === 'specialized' ? 15 : 5)
    },
    missile_defense: function () {
      return Math.round((Number(this.coordination) + Number(this.quickness)) / 5) + (this.skills[26].training === 'specialized' ? 15 : 5)
    },
    missile_weapons: function () {
      return Math.round(Number(this.coordination) / 2) + (this.skills[27].training === 'specialized' ? 15 : 5)
    },
    recklessness: function () {
      return Math.round((Number(this.strength) + Number(this.quickness)) / 3) + (this.skills[28].training === 'specialized' ? 15 : 5)
    },
    run: function () {
      return Number(this.quickness) + (this.skills[29].training === 'specialized' ? 15 : 5)
    },
    salvaging: function () {
      return 0 + (this.skills[30].training === 'specialized' ? 15 : 5)
    },
    shield: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 2) + (this.skills[31].training === 'specialized' ? 15 : 5)
    },
    sneak_attack: function () {
      return Math.round((Number(this.coordination) + Number(this.quickness)) / 3) + (this.skills[32].training === 'specialized' ? 15 : 5)
    },
    summoning: function () {
      return Math.round((Number(this.endurance) + Number(this.self)) / 3) + (this.skills[33].training === 'specialized' ? 15 : 5)
    },
    two_handed_combat: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 3) + (this.skills[34].training === 'specialized' ? 15 : 5)
    },
    void_magic: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 4) + (this.skills[35].training === 'specialized' ? 15 : 5)
    },
    war_magic: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 4) + (this.skills[36].training === 'specialized' ? 15 : 5)
    },
    weapon_tinkering: function () {
      return Math.round((Number(this.strength) + Number(this.focus)) / 2) + (this.skills[37].training === 'specialized' ? 15 : 5)
    },
    specializedSkills: function () {
      return this.skills.filter(function (skill) {
        return skill.training === 'specialized'
      })
    },
    trainedSkills: function () {
      return this.skills.filter(function (skill) {
        return skill.training === 'trained'
      })
    },
    untrainedSkills: function () {
      return this.skills.filter(function (skill) {
        return skill.training === 'untrained'
      })
    },
    unusableSkills: function () {
      return this.skills.filter(function (skill) {
        return skill.training === 'unusable'
      })
    }
  },
  watch: {
    strength: function (newVal) {
      var diff = Number(newVal) + Number(this.endurance) + Number(this.coordination) + Number(this.quickness) + Number(this.focus) + Number(this.self) - 330
      var maxit = 1000

      if (diff > 0) {
        while (diff > 0) {
          if (this.endurance > 10) {
            this.endurance = this.endurance - 1
            diff = diff - 1
          }

          if (this.coordination > 10) {
            this.coordination = this.coordination - 1
            diff = diff - 1
          }

          if (this.quickness > 10) {
            this.quickness = this.quickness - 1
            diff = diff - 1
          }

          if (this.focus > 10) {
            this.focus = this.focus - 1
            diff = diff - 1
          }

          if (this.self > 10) {
            this.self = this.self - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    endurance: function (newVal) {
      var diff = Number(newVal) + Number(this.strength) + Number(this.coordination) + Number(this.quickness) + Number(this.focus) + Number(this.self) - 330
      var maxit = 1000

      if (diff > 0) {
        while (diff > 0) {
          if (this.strength > 10) {
            this.strength = this.strength - 1
            diff = diff - 1
          }

          if (this.coordination > 10) {
            this.coordination = this.coordination - 1
            diff = diff - 1
          }

          if (this.quickness > 10) {
            this.quickness = this.quickness - 1
            diff = diff - 1
          }

          if (this.focus > 10) {
            this.focus = this.focus - 1
            diff = diff - 1
          }

          if (this.self > 10) {
            this.self = this.self - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    coordination: function (newVal) {
      var diff = Number(newVal) + Number(this.strength) + Number(this.endurance) + Number(this.quickness) + Number(this.focus) + Number(this.self) - 330
      var maxit = 1000

      if (diff > 0) {
        while (diff > 0) {
          if (this.strength > 10) {
            this.strength = this.strength - 1
            diff = diff - 1
          }

          if (this.endurance > 10) {
            this.endurance = this.endurance - 1
            diff = diff - 1
          }

          if (this.quickness > 10) {
            this.quickness = this.quickness - 1
            diff = diff - 1
          }

          if (this.focus > 10) {
            this.focus = this.focus - 1
            diff = diff - 1
          }

          if (this.self > 10) {
            this.self = this.self - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    quickness: function (newVal) {
      var diff = Number(newVal) + Number(this.strength) + Number(this.endurance) + Number(this.coordination) + Number(this.focus) + Number(this.self) - 330
      var maxit = 100

      if (diff > 0) {
        while (diff > 0) {
          if (this.strength > 10) {
            this.strength = this.strength - 1
            diff = diff - 1
          }

          if (this.endurance > 10) {
            this.endurance = this.endurance - 1
            diff = diff - 1
          }

          if (this.coordination > 10) {
            this.coordination = this.coordination - 1
            diff = diff - 1
          }

          if (this.focus > 10) {
            this.focus = this.focus - 1
            diff = diff - 1
          }

          if (this.self > 10) {
            this.self = this.self - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    focus: function (newVal) {
      var diff = Number(newVal) + Number(this.strength) + Number(this.endurance) + Number(this.coordination) + Number(this.quickness) + Number(this.self) - 330
      var maxit = 100

      if (diff > 0) {
        while (diff > 0) {
          if (this.strength > 10) {
            this.strength = this.strength - 1
            diff = diff - 1
          }

          if (this.endurance > 10) {
            this.endurance = this.endurance - 1
            diff = diff - 1
          }

          if (this.coordination > 10) {
            this.coordination = this.coordination - 1
            diff = diff - 1
          }

          if (this.quickness > 10) {
            this.quickness = this.quickness - 1
            diff = diff - 1
          }

          if (this.self > 10) {
            this.self = this.self - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    self: function (newVal) {
      var diff = Number(newVal) + Number(this.strength) + Number(this.endurance) + Number(this.coordination) + Number(this.quickness) + Number(this.focus) - 330
      var maxit = 100

      if (diff > 0) {
        while (diff > 0) {
          if (this.strength > 10) {
            this.strength = this.strength - 1
            diff = diff - 1
          }

          if (this.endurance > 10) {
            this.endurance = this.endurance - 1
            diff = diff - 1
          }

          if (this.coordination > 10) {
            this.coordination = this.coordination - 1
            diff = diff - 1
          }

          if (this.quickness > 10) {
            this.quickness = this.quickness - 1
            diff = diff - 1
          }

          if (this.focus > 10) {
            this.focus = this.focus - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    }
  },
  methods: {
    skillValue: function (id) {
      return this[id]
    },
    skillCreditsAtLevel: function (level) {
      return creditsAtLevel[closest(Object.keys(creditsAtLevel), level)]
    },
    trainingBonus: function (id) {
      var training = this.skills.filter(function (skill) {
        return skill.id === id
      }).training

      if (training === 'specialized') {
        return 10
      } else if (training === 'trained') {
        return 5
      } else {
        return 0
      }
    },
    setSkillTraining: function (id, training) {
      for (var i = 0; i < this.skills.length; i++) {
        if (this.skills[i].id === id) {
          this.skills[i].training = training
          break
        }
      }
    },
    specializeSkill: function (e) {
      this.setSkillTraining(e.target.getAttribute('data-skill'), 'specialized')
    },
    unSpecializeSkill: function (e) {
      this.setSkillTraining(e.target.getAttribute('data-skill'), 'trained')
    },
    trainSkill: function (e) {
      this.setSkillTraining(e.target.getAttribute('data-skill'), 'trained')
    },
    unTrainSkill: function (e) {
      var id = e.target.getAttribute('data-skill')
      this.setSkillTraining(id, untrainedState[id])
    },
    isSpecializable: function (id) {
      return ((this.available_skill_credits - cost[id].specialized) >= 0) && (this.total_specialized_cost + cost[id].specialized <= SPECIALIZED_LIMIT)
    },
    isTrainable: function (id) {
      return (this.available_skill_credits - cost[id].trained) >= 0
    },
    isUntrainable: function (id) {
      return untrainable[id]
    }
  }
}
</script>

<style scoped>
  table {
    width: 300px;
  }

  td {
    border: 1px #eee;
  }

  td.skill-name {
    width: 200px;

  }

  td.skill-value {
    width: 50px;

  }

  td.skill-raise {
    width: 25px;
  }

  td.skill-lower {
    width: 25px;
  }
</style>
