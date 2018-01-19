<template>
  <div id="container">
    <div id="attributes" class="pane">
      <h1>Attributes <span class="number">{{ total_attribute_cost }}/330</span></h1>
      <ul>
        <li>
          <span>Level:</span>
          <input type="range" min="1" max="275" v-model="level" />
          <input type="number" min="1" max="275" v-model="level" /> 
        </li>
      </ul>
      <table>
        <thead>
          <tr>
            <td></td>
            <td></td>
            <td>Base</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="attribute-name">Strength</td>
            <td class="attribute-slider"><input type="range" min="10" max="100" v-model="strength_base" /></td>
            <td class="attribute-value">{{ strength_base }}</td>
            <td class="attribute-value">{{ strength }}</td>
          </tr>
          <tr>
            <td class="attribute-name">Endurance</td>
            <td class="attribute-slider"><input type="range" min="10" max="100" v-model="endurance_base" /></td>
            <td class="attribute-value">{{ endurance_base }}</td>
            <td class="attribute-value">{{ endurance }}</td>
          </tr>
          <tr>
            <td class="attribute-name">Coordination</td>
            <td class="attribute-slider"><input type="range" min="10" max="100" v-model="coordination_base" /></td>
            <td class="attribute-value">{{ coordination_base }}</td>
            <td class="attribute-value">{{ coordination }}</td>
          </tr>
          <tr>
            <td class="attribute-name">Quickness</td>
            <td class="attribute-slider"><input type="range" min="10" max="100" v-model="quickness_base" /></td>
            <td class="attribute-value">{{ quickness_base }}</td>
            <td class="attribute-value">{{ quickness }}</td>
          </tr>
          <tr>
            <td class="attribute-name">Focus</td>
            <td class="attribute-slider"><input type="range" min="10" max="100" v-model="focus_base" /></td>
            <td class="attribute-value">{{ focus_base }}</td>
            <td class="attribute-value">{{ focus }}</td>
          </tr>
          <tr>
            <td class="attribute-name">Self</td>
            <td class="attribute-slider"><input type="range" min="10" max="100" v-model="self_base" /></td>
            <td class="attribute-value">{{ self_base }}</td>
            <td class="attribute-value">{{ self }}</td>
          </tr>
          <tr>
            <td class="attribute-name">Health</td>
            <td class="attribute-slider"></td>
            <td class="attribute-value">{{ health_base }}</td>
            <td class="attribute-value">{{ health }}</td>
          </tr>
          <tr>
            <td class="attribute-name">Stamina</td>
            <td class="attribute-slider"></td>
            <td class="attribute-value">{{ stamina_base }}</td>
            <td class="attribute-value">{{ stamina }}</td>
          </tr>
          <tr>
            <td class="attribute-name">Mana</td>
            <td class="attribute-slider"></td>
            <td class="attribute-value">{{ mana_base }}</td>
            <td class="attribute-value">{{ mana }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="skills" class="pane">
      <h1>
        Skills <span class="number">{{ total_skill_cost }}/{{ available_skill_credits }}</span>
        <span class="error" v-if="total_skill_cost > available_skill_credits">You've overspent skill credits by {{ total_skill_cost - available_skill_credits }} credits!</span>
      </h1>
      <table>
        <tbody>
          <tr class="skill-header specialized">
            <td colspan="5">Specialized <span class="number">{{ total_specialized_cost }}/70</span></td>
          </tr>
          <tr v-for="skill in specializedSkills" :key="skill.id">
            <td class="skill-name">{{ skill.name }}</td>
            <td class="skill-value">{{ skillValue(skill.id) }}</td>
            <td class="skill-cost">{{ skillCost(skill.id, 'trained') }}/{{ skillCost(skill.id, 'specialized') }}</td>
            <td class="skill-raise"></td>
            <td class="skill-lower"><button :data-skill="skill.id" v-on:click="unSpecializeSkill">↓</button></td>

          </tr>
          <tr class="skill-header trained">
            <td colspan="5">Trained</td>
          </tr>
          <tr v-for="skill in trainedSkills" :key="skill.id">
            <td class="skill-name">{{ skill.name }}</td>
            <td class="skill-value">{{ skillValue(skill.id) }}</td>
            <td class="skill-cost">{{ skillCost(skill.id, 'trained') }}/{{ skillCost(skill.id, 'specialized') }}</td>
            <td class="skill-raise"><button :data-skill="skill.id" v-if="isSpecializable(skill.id)" v-on:click="specializeSkill">↑</button></td>
            <td class="skill-lower"><button :data-skill="skill.id" v-if="isUntrainable(skill.id)" v-on:click="unTrainSkill">↓</button></td>
          </tr>
          <tr class="skill-header untrained">
            <td colspan="5">Untrained</td>
          </tr>
          <tr v-for="skill in untrainedSkills" :key="skill.id">
            <td class="skill-name">{{ skill.name }}</td>
            <td class="skill-value">{{ skillValue(skill.id) }}</td>
            <td class="skill-cost">{{ skillCost(skill.id, 'trained') }}/{{ skillCost(skill.id, 'specialized') }}</td>
            <td class="skill-raise"><button :data-skill="skill.id" v-if="isTrainable(skill.id)" v-on:click="trainSkill">↑</button></td>
            <td class="skill-lower"></td>
          </tr>
          <tr class="skill-header unusable">
            <td colspan="5">Unusable</td>
          </tr>
          <tr v-for="skill in unusableSkills" :key="skill.id">
            <td class="skill-name">{{ skill.name }}</td>
            <td class="skill-value">0</td>
            <td class="skill-cost">{{ skillCost(skill.id, 'trained') }}/{{ skillCost(skill.id, 'specialized') }}</td>
            <td class="skill-raise"><button :data-skill="skill.id" v-if="isTrainable(skill.id)" v-on:click="trainSkill">↑</button></td>
            <td class="skill-lower"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="bonuses" class="pane">
      <h1>Bonuses</h1>
      <table>
        <tr class="skill-header specialized">
          <td colspan="6">Extra Skill Credits</td>
        </tr>
        <tr>
          <td>Railrea</td>
          <td colspan="5"><input type="checkbox" v-model="railrea" /></td>
        </tr>
        <tr>
          <td>Owsald</td>
          <td colspan="5"><input type="checkbox" v-model="owsald" /></td>
        </tr>
        <tr>
          <td>Luminance (1)</td>
          <td colspan="5"><input type="checkbox" v-model="lum1" /></td>
        </tr>
        <tr>
          <td>Luminance (2)</td>
          <td colspan="5"><input type="checkbox" v-model="lum2" /></td>
        </tr>
       <tr class="skill-header specialized">
          <td colspan="6">General</td>
        </tr>
        <tr>
          <td>Max attribute XP</td>
          <td colspan="5"><input type="checkbox" v-model="max_attribute_xp" /></td>
        </tr>
        <tr>
          <td>Max skill XP</td>
          <td colspan="5"><input type="checkbox" v-model="max_skill_xp" /></td>
        </tr>
        <tr>
          <td>Level VIII buffs</td>
          <td colspan="5"><input type="checkbox" v-model="level_eights" /></td>
        </tr>
        <tr>
          <td>All Major Cantrips</td>
          <td colspan="5"><input type="checkbox" v-model="major_cantrips" /></td>
        </tr>
        <tr>
          <td>Enlightenment</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="enlightenment" /></td>
          <td class="number">{{ enlightenment }}/5</td>
        </tr>
       <tr class="skill-header specialized">
          <td colspan="6">Luminance</td>
        </tr>
        <tr>
          <td>Craftsman</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="luminance_craftsman" /></td>
          <td class="number">{{ luminance_craftsman }}/5</td>
        </tr>
       <tr class="skill-header specialized">
          <td colspan="6">Seers</td>
        </tr>
        <tr>
          <td>Specialization</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="seer_specialization" /></td>
          <td class="number">{{ seer_specialization }}/5</td>
        </tr>
        <tr class="skill-header specialized">
          <td colspan="6">Sets <span class="number">{{ total_set_pieces }}/9</span></td>
        </tr>
        <tr>
          <td>Adept's Set</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="set_adept" /></td>
          <td class="number">{{ set_adept }}/5</td>
        </tr>
        <tr>
          <td>Dedication Set</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="set_dedication" /></td>
          <td class="number">{{ set_dedication }}/5</td>
        </tr>
        <tr>
          <td>Defender's Set</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="set_defenders" /></td>
          <td class="number">{{ set_defenders }}/5</td>
        </tr>
        <tr>
          <td>Dexterous Set</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="set_dextrous" /></td>
          <td class="number">{{ set_dextrous }}/5</td>
        </tr>
        <tr>
          <td>Hearty Set</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="set_hearty" /></td>
          <td class="number">{{ set_hearty }}/5</td>
        </tr>
        <tr>
          <td>Soldier's Set</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="set_soldiers" /></td>
          <td class="number">{{ set_soldiers }}/5</td>
        </tr>
        <tr>
          <td>Swift Set</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="set_swift" /></td>
          <td class="number">{{ set_swift }}/5</td>
        </tr>
        <tr>
          <td>Tinker's Set</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="set_tinkers" /></td>
          <td class="number">{{ set_tinkers }}/5</td>
        </tr>
        <tr>
          <td>Wise Set</td>
          <td colspan="4"><input type="range" min="0" max="5" v-model="set_wise" /></td>
          <td class="number">{{ set_wise }}/5</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

const SPECIALIZED_LIMIT = 64
const LEVEL_EIGHT_BUFF_AMOUNT = 80
const attributeNames = ['strength',
  'endurance',
  'coordination',
  'quickness',
  'focus',
  'self'
]
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
      strength_base: 10,
      endurance_base: 10,
      coordination_base: 10,
      quickness_base: 10,
      focus_base: 10,
      self_base: 10,
      railrea: false,
      owsald: false,
      lum1: false,
      lum2: false,
      max_attribute_xp: false,
      max_skill_xp: false,
      level_eights: false,
      major_cantrips: false,
      enlightenment: 0,
      luminance_craftsman: 0,
      seer_specialization: 0,
      set_adept: 0,
      set_dedication: 0,
      set_defenders: 0,
      set_dextrous: 0,
      set_hearty: 0,
      set_soldiers: 0,
      set_swift: 0,
      set_tinkers: 0,
      set_wise: 0,
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
      return Number(this.strength_base) +
        Number(this.endurance_base) +
        Number(this.coordination_base) +
        Number(this.quickness_base) +
        Number(this.focus_base) +
        Number(this.self_base)
    },
    // Attributes
    strength: function () {
      return Number(this.strength_base) + this.buffBonus() + this.attributeXPBonus() + this.majorCantripBonus()
    },
    endurance: function () {
      return Number(this.endurance_base) + this.buffBonus() + this.attributeXPBonus() + this.majorCantripBonus()
    },
    coordination: function () {
      return Number(this.coordination_base) + this.buffBonus() + this.attributeXPBonus() + this.majorCantripBonus()
    },
    quickness: function () {
      return Number(this.quickness_base) + this.buffBonus() + this.attributeXPBonus() + this.majorCantripBonus()
    },
    focus: function () {
      return Number(this.focus_base) + this.buffBonus() + this.attributeXPBonus() + this.majorCantripBonus()
    },
    self: function () {
      return Number(this.self_base) + this.buffBonus() + this.attributeXPBonus() + this.majorCantripBonus()
    },
    // Vitals
    health_base: function () {
      return Math.round(this.endurance_base / 2, 0)
    },
    health: function () {
      return Math.round(this.endurance / 2, 0) + this.buffBonus() + this.enlightenmentHealthBonus()
    },
    stamina_base: function () {
      return this.endurance_base
    },
    stamina: function () {
      return this.endurance + this.buffBonus()
    },
    mana_base: function () {
      return this.self_base
    },
    mana: function () {
      return this.self + this.buffBonus()
    },
    // Skill costs
    total_skill_cost: function () {
      return this.skills.reduce(function (sum, skill) {
        if (skill.training === 'specialized') {
          sum = sum + cost[skill.id]['specialized'] + cost[skill.id]['trained']
        } else if (skill.training === 'trained') {
          sum = sum + cost[skill.id]['trained']
        }
        return sum
      }, 0)
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
      return Math.round((Number(this.coordination) + Number(this.focus)) / 3) + (this.skills[0].training === 'specialized' ? 10 : 0) + (this.skills[0].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[0].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[0].training)
    },
    arcane_lore: function () {
      return Math.round(Number(this.focus) / 3) + (this.skills[1].training === 'specialized' ? 10 : 0) + (this.skills[1].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[1].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[1].training)
    },
    armor_tinkering: function () {
      return Math.round((Number(this.endurance) + Number(this.focus)) / 2) + (this.skills[2].training === 'specialized' ? 10 : 0) + (this.skills[2].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[2].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + Number(this.luminance_craftsman) + this.specializationSeerBonus(this.skills[2].training)
    },
    assess_creature: function () {
      return 0 + (this.skills[3].training === 'specialized' ? 10 : 0) + (this.skills[3].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[3].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[3].training)
    },
    assess_person: function () {
      return 0 + (this.skills[4].training === 'specialized' ? 10 : 0) + (this.skills[4].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[4].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[4].training)
    },
    cooking: function () {
      return Math.round((Number(this.coordination) + Number(this.focus)) / 3) + (this.skills[5].training === 'specialized' ? 10 : 0) + (this.skills[5].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[5].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + Number(this.luminance_craftsman) + this.specializationSeerBonus(this.skills[5].training)
    },
    creature_enchantment: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 4) + (this.skills[6].training === 'specialized' ? 10 : 0) + (this.skills[6].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[6].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[6].training)
    },
    deception: function () {
      return 0 + (this.skills[7].training === 'specialized' ? 10 : 0) + (this.skills[7].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[7].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[7].training)
    },
    dual_wield: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 3) + (this.skills[8].training === 'specialized' ? 10 : 0) + (this.skills[8].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[8].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[8].training)
    },
    dirty_fighting: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 3) + (this.skills[9].training === 'specialized' ? 10 : 0) + (this.skills[9].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[9].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[9].training)
    },
    finesse_weapons: function () {
      return Math.round((Number(this.coordination) + Number(this.quickness)) / 3) + (this.skills[10].training === 'specialized' ? 10 : 0) + (this.skills[10].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[10].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[10].training)
    },
    fletching: function () {
      return Math.round((Number(this.coordination) + Number(this.focus)) / 3) + (this.skills[11].training === 'specialized' ? 10 : 0) + (this.skills[11].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[11].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + Number(this.luminance_craftsman) + this.specializationSeerBonus(this.skills[11].training)
    },
    healing: function () {
      return Math.round((Number(this.focus) + Number(this.coordination)) / 3) + (this.skills[12].training === 'specialized' ? 10 : 0) + (this.skills[12].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[12].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[12].training)
    },
    heavy_weapons: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 3) + (this.skills[13].training === 'specialized' ? 10 : 0) + (this.skills[13].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[13].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[13].training)
    },
    item_enchantment: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 4) + (this.skills[14].training === 'specialized' ? 10 : 0) + (this.skills[14].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[14].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[14].training)
    },
    item_tinkering: function () {
      return Math.round((Number(this.focus) + Number(this.coordination)) / 2) + (this.skills[15].training === 'specialized' ? 10 : 0) + (this.skills[15].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[15].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + Number(this.luminance_craftsman) + this.specializationSeerBonus(this.skills[15].training)
    },
    jump: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 2) + (this.skills[16].training === 'specialized' ? 10 : 0) + (this.skills[16].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[16].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[16].training)
    },
    leadership: function () {
      return 0 + (this.skills[17].training === 'specialized' ? 10 : 0) + (this.skills[17].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[17].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[17].training)
    },
    life_magic: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 4) + (this.skills[18].training === 'specialized' ? 10 : 0) + (this.skills[18].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[18].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[18].training)
    },
    light_weapons: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 3) + (this.skills[19].training === 'specialized' ? 10 : 0) + (this.skills[19].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[19].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[19].training)
    },
    lockpick: function () {
      return Math.round((Number(this.coordination) + Number(this.focus)) / 3) + (this.skills[20].training === 'specialized' ? 10 : 0) + (this.skills[20].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[20].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[20].training)
    },
    loyalty: function () {
      return 0 + (this.skills[21].training === 'specialized' ? 10 : 0) + (this.skills[21].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[21].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[21].training)
    },
    magic_defense: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 7) + (this.skills[22].training === 'specialized' ? 10 : 0) + (this.skills[22].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[22].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[22].training)
    },
    magic_item_tinkering: function () {
      return Number(this.focus) + (this.skills[23].training === 'specialized' ? 10 : 0) + (this.skills[23].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[23].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + Number(this.luminance_craftsman) + this.specializationSeerBonus(this.skills[23].training)
    },
    mana_conversion: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 6) + (this.skills[24].training === 'specialized' ? 10 : 0) + (this.skills[24].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[24].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[24].training)
    },
    melee_defense: function () {
      return Math.round((Number(this.coordination) + Number(this.quickness)) / 3) + (this.skills[25].training === 'specialized' ? 10 : 0) + (this.skills[25].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[25].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[25].training)
    },
    missile_defense: function () {
      return Math.round((Number(this.coordination) + Number(this.quickness)) / 5) + (this.skills[26].training === 'specialized' ? 10 : 0) + (this.skills[26].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[26].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[26].training)
    },
    missile_weapons: function () {
      return Math.round(Number(this.coordination) / 2) + (this.skills[27].training === 'specialized' ? 10 : 0) + (this.skills[27].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[27].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[27].training)
    },
    recklessness: function () {
      return Math.round((Number(this.strength) + Number(this.quickness)) / 3) + (this.skills[28].training === 'specialized' ? 10 : 0) + (this.skills[28].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[28].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[28].training)
    },
    run: function () {
      return Number(this.quickness) + (this.skills[29].training === 'specialized' ? 10 : 0) + (this.skills[29].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[29].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[29].training)
    },
    salvaging: function () {
      return 0 + (this.skills[30].training === 'specialized' ? 10 : 0) + (this.skills[30].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[30].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + Number(this.luminance_craftsman) + this.specializationSeerBonus(this.skills[30].training)
    },
    shield: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 2) + (this.skills[31].training === 'specialized' ? 10 : 0) + (this.skills[31].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[31].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[31].training)
    },
    sneak_attack: function () {
      return Math.round((Number(this.coordination) + Number(this.quickness)) / 3) + (this.skills[32].training === 'specialized' ? 10 : 0) + (this.skills[32].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[32].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[32].training)
    },
    summoning: function () {
      return Math.round((Number(this.endurance) + Number(this.self)) / 3) + (this.skills[33].training === 'specialized' ? 10 : 0) + (this.skills[33].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[33].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[33].training)
    },
    two_handed_combat: function () {
      return Math.round((Number(this.strength) + Number(this.coordination)) / 3) + (this.skills[34].training === 'specialized' ? 10 : 0) + (this.skills[34].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[34].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[34].training)
    },
    void_magic: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 4) + (this.skills[35].training === 'specialized' ? 10 : 0) + (this.skills[35].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[35].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[35].training)
    },
    war_magic: function () {
      return Math.round((Number(this.focus) + Number(this.self)) / 4) + (this.skills[36].training === 'specialized' ? 10 : 0) + (this.skills[36].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[36].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + this.specializationSeerBonus(this.skills[36].training)
    },
    weapon_tinkering: function () {
      return Math.round((Number(this.strength) + Number(this.focus)) / 2) + (this.skills[37].training === 'specialized' ? 10 : 0) + (this.skills[37].training === 'trained' ? 5 : 0) + this.buffBonus() + this.skillXPBonus(this.skills[37].training) + this.enlightenmentSkillBonus() + this.majorCantripBonus() + Number(this.luminance_craftsman) + this.specializationSeerBonus(this.skills[37].training)
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
    },
    total_set_pieces: function () {
      return Number(this.set_adept) + Number(this.set_dedication) + Number(this.set_defenders) + Number(this.set_dextrous) + Number(this.set_hearty) + Number(this.set_soldiers) + Number(this.set_swift) + Number(this.set_tinkers) + Number(this.set_wise)
    }
  },
  watch: {
    strength_base: function (newVal) {
      var diff = Number(newVal) + Number(this.endurance_base) + Number(this.coordination_base) + Number(this.quickness_base) + Number(this.focus_base) + Number(this.self_base) - 330
      var maxit = 1000

      if (diff > 0) {
        while (diff > 0) {
          if (this.endurance_base > 10) {
            this.endurance_base = this.endurance_base - 1
            diff = diff - 1
          }

          if (this.coordination_base > 10) {
            this.coordination_base = this.coordination_base - 1
            diff = diff - 1
          }

          if (this.quickness_base > 10) {
            this.quickness_base = this.quickness_base - 1
            diff = diff - 1
          }

          if (this.focus_base > 10) {
            this.focus_base = this.focus_base - 1
            diff = diff - 1
          }

          if (this.self_base > 10) {
            this.self_base = this.self_base - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    endurance_base: function (newVal) {
      var diff = Number(newVal) + Number(this.strength_base) + Number(this.coordination_base) + Number(this.quickness_base) + Number(this.focus_base) + Number(this.self_base) - 330
      var maxit = 1000

      if (diff > 0) {
        while (diff > 0) {
          if (this.strength_base > 10) {
            this.strength_base = this.strength_base - 1
            diff = diff - 1
          }

          if (this.coordination_base > 10) {
            this.coordination_base = this.coordination_base - 1
            diff = diff - 1
          }

          if (this.quickness_base > 10) {
            this.quickness_base = this.quickness_base - 1
            diff = diff - 1
          }

          if (this.focus_base > 10) {
            this.focus_base = this.focus_base - 1
            diff = diff - 1
          }

          if (this.self_base > 10) {
            this.self_base = this.self_base - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    coordination_base: function (newVal) {
      var diff = Number(newVal) + Number(this.strength_base) + Number(this.endurance_base) + Number(this.quickness_base) + Number(this.focus_base) + Number(this.self_base) - 330
      var maxit = 1000

      if (diff > 0) {
        while (diff > 0) {
          if (this.strength_base > 10) {
            this.strength_base = this.strength_base - 1
            diff = diff - 1
          }

          if (this.endurance_base > 10) {
            this.endurance_base = this.endurance_base - 1
            diff = diff - 1
          }

          if (this.quickness_base > 10) {
            this.quickness_base = this.quickness_base - 1
            diff = diff - 1
          }

          if (this.focus_base > 10) {
            this.focus_base = this.focus_base - 1
            diff = diff - 1
          }

          if (this.self_base > 10) {
            this.self_base = this.self_base - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    quickness_base: function (newVal) {
      var diff = Number(newVal) + Number(this.strength_base) + Number(this.endurance_base) + Number(this.coordination_base) + Number(this.focus_base) + Number(this.self_base) - 330
      var maxit = 100

      if (diff > 0) {
        while (diff > 0) {
          if (this.strength_base > 10) {
            this.strength_base = this.strength_base - 1
            diff = diff - 1
          }

          if (this.endurance_base > 10) {
            this.endurance_base = this.endurance_base - 1
            diff = diff - 1
          }

          if (this.coordination_base > 10) {
            this.coordination_base = this.coordination_base - 1
            diff = diff - 1
          }

          if (this.focus_base > 10) {
            this.focus_base = this.focus_base - 1
            diff = diff - 1
          }

          if (this.self_base > 10) {
            this.self_base = this.self_base - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    focus_base: function (newVal) {
      var diff = Number(newVal) + Number(this.strength_base) + Number(this.endurance_base) + Number(this.coordination_base) + Number(this.quickness_base) + Number(this.self_base) - 330
      var maxit = 100

      if (diff > 0) {
        while (diff > 0) {
          if (this.strength_base > 10) {
            this.strength_base = this.strength_base - 1
            diff = diff - 1
          }

          if (this.endurance_base > 10) {
            this.endurance_base = this.endurance_base - 1
            diff = diff - 1
          }

          if (this.coordination_base > 10) {
            this.coordination_base = this.coordination_base - 1
            diff = diff - 1
          }

          if (this.quickness_base > 10) {
            this.quickness_base = this.quickness_base - 1
            diff = diff - 1
          }

          if (this.self_base > 10) {
            this.self_base = this.self_base - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    self_base: function (newVal) {
      var diff = Number(newVal) + Number(this.strength_base) + Number(this.endurance_base) + Number(this.coordination_base) + Number(this.quickness_base) + Number(this.focus_base) - 330
      var maxit = 100

      if (diff > 0) {
        while (diff > 0) {
          if (this.strength_base > 10) {
            this.strength_base = this.strength_base - 1
            diff = diff - 1
          }

          if (this.endurance_base > 10) {
            this.endurance_base = this.endurance_base - 1
            diff = diff - 1
          }

          if (this.coordination_base > 10) {
            this.coordination_base = this.coordination_base - 1
            diff = diff - 1
          }

          if (this.quickness_base > 10) {
            this.quickness_base = this.quickness_base - 1
            diff = diff - 1
          }

          if (this.focus_base > 10) {
            this.focus_base = this.focus_base - 1
            diff = diff - 1
          }

          if (--maxit < 0) {
            break
          }
        }
      }
    },
    enlightenment_1: function () {
      if (this.enlightenment_1) {

      } else {
        this.enlightenment_2 = false
        this.enlightenment_3 = false
        this.enlightenment_4 = false
        this.enlightenment_5 = false
      }
    },
    enlightenment_2: function () {
      if (this.enlightenment_2) {
        this.enlightenment_1 = true
      } else {
        this.enlightenment_3 = false
        this.enlightenment_4 = false
        this.enlightenment_5 = false
      }
    },
    enlightenment_3: function () {
      if (this.enlightenment_3) {
        this.enlightenment_1 = true
        this.enlightenment_2 = true
      } else {
        this.enlightenment_4 = false
        this.enlightenment_5 = false
      }
    },
    enlightenment_4: function () {
      if (this.enlightenment_4) {
        this.enlightenment_1 = true
        this.enlightenment_2 = true
        this.enlightenment_3 = true
      } else {
        this.enlightenment_5 = false
      }
    },
    enlightenment_5: function () {
      if (this.enlightenment_5) {
        this.enlightenment_1 = true
        this.enlightenment_2 = true
        this.enlightenment_3 = true
        this.enlightenment_4 = true
      } else {

      }
    }
  },
  methods: {
    export_character: function () {
      const char = {
        level: this.level,
        attributes: {},
        skills: {}
      }

      for (var i = 0; i < attributeNames.length; i++) {
        char.attributes[attributeNames[i]] = {
          base: this[attributeNames[i] + '_base']
        }
      }
      const skillIds = Object.keys(cost)
      console.log(skillIds)
      // for (var j = 0; i < skillIds.length; j++) {
      //   char.skills[skillIds[j]] = {
      //     base: this[skillIds[j]],
      //     training: 'unknown'
      //   }
      // }

      console.log(char)
    },
    skillValue: function (id) {
      return this[id]
    },
    skillCost: function (id, training) {
      return cost[id][training]
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
    buffBonus: function () {
      if (this.level_eights) {
        return LEVEL_EIGHT_BUFF_AMOUNT
      } else {
        return 0
      }
    },
    attributeXPBonus: function () {
      if (this.max_attribute_xp) {
        return 190
      } else {
        return 0
      }
    },
    skillXPBonus: function (training) {
      if (!this.max_skill_xp) {
        return 0
      }

      if (training === 'specialized') {
        return 226
      } else if (training === 'trained') {
        return 208
      } else {
        return 0
      }
    },
    majorCantripBonus: function () {
      if (this.major_cantrips) {
        return 15
      } else {
        return 0
      }
    },
    enlightenmentHealthBonus: function () {
      var bonus = 0

      if (this.enlightenment_1) {
        bonus += 2
      }

      if (this.enlightenment_2) {
        bonus += 2
      }

      if (this.enlightenment_3) {
        bonus += 2
      }

      if (this.enlightenment_4) {
        bonus += 2
      }

      if (this.enlightenment_5) {
        bonus += 2
      }

      return bonus
    },
    enlightenmentSkillBonus: function () {
      var bonus = 0

      if (this.enlightenment_1) {
        bonus += 1
      }

      if (this.enlightenment_2) {
        bonus += 1
      }

      if (this.enlightenment_3) {
        bonus += 1
      }

      if (this.enlightenment_4) {
        bonus += 1
      }

      if (this.enlightenment_5) {
        bonus += 1
      }

      return bonus
    },
    specializationSeerBonus: function (training) {
      var bonus = 0

      if (training === 'specialized' && this.seer_specialization > 0) {
        bonus = this.seer_specialization * 2
      }

      return bonus
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
/* todo: remove */
  #container {
    font: 14px sans-serif;
    display: flex;
    flex-wrap: wrap;
  }

  .pane {
    background-color: white;
    border: 1px solid rgba(175, 122, 48, 1);
    margin: 1em;
    width: 350px;
    overflow-y: scroll;
  }

  .pane table {
    width: 100%;
  }

  .pane h1 {
    font-size: 100%;
    font-weight: bold;
    background-color: rgba(0, 60, 0, 1);
    color: white;
    padding: 3px;
    margin: 0;
  }

  table {
    border-collapse: collapse;
  }

  td {
    padding: 2px 4px;
  }

  td.attribute-name {
    width: 200px;
  }

  td.attribute-slider {
    width: 100px;
  }

  td.attribute-value {
    width: 50px;
    text-align: right;
  }

  td.skill-name {
    width: 200px;
  }

  td.skill-value {
    width: 50px;
    text-align: right;
  }

  td.skill-cost {
    width: 100px;
    text-align: center;
  }

  td.skill-raise {
    width: 25px;
  }

  td.skill-lower {
    width: 25px;
  }

  tr.skill-header.specialized td {
    background-color: purple;
    background: linear-gradient(to right, #392067, #392067, black);
    color: white;
  }

  tr.skill-header.trained td {
    background-color: green;
    background: linear-gradient(to right, #0F3C3E, #0F3C3E, black);
    color: white;
  }

  tr.skill-header.untrained td {
    background-color: gray;
  }

  tr.skill-header.unusable td {
    background-color: gray;
  }

  button {
    background: none;
    border: none;
    color: black;
  }

  .number,
  .attribute-value,
  .skill-value,
  .skill-cost { 
    font-family: monospace;
  }
</style>
