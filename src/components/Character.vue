<template>
  <div>
    <h1>Character</h1>
    <ul>
      <li>Level: <input type="range" min="1" max="275" v-model="level" /> {{ level }}</li>
      <li>railrea: <input type="checkbox" v-model="railrea" /> owsald: <input type="checkbox" v-model="owsald" /> lum1: <input type="checkbox" v-model="lum1" /> lum2: <input type="checkbox" v-model="lum2" /></li>
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
          <td>{{ health }}</td>
        </tr>
        <tr>
          <td>Stamina</td>
          <td>{{ stamina }}</td>
        </tr>
        <tr>
          <td>Mana</td>
          <td>{{ mana }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Skills</h2>

    <h3>Specialized</h3>
    <span>{{ total_specialized_cost }}</span>
    <table>
      <tbody>
        <tr v-for="skill in specializedSkills">
          <td>{{ skill.name }}</td>
          <td>{{ skillValue(skill.id) }}</td>
          <td><button :data-skill="skill.id" v-on:click="unSpecializeSkill">-</button></td>
        </tr>
      </tbody>
    </table>

    <h3>Trained</h3>
    <table>
      <tbody>
        <tr v-for="skill in trainedSkills">
          <td>{{ skill.name }}</td>
          <td>{{ skillValue(skill.id) }}</td>
          <td><button :data-skill="skill.id" v-if="isSpecializable(skill.id)" v-on:click="specializeSkill">+</button></td>
          <td><button :data-skill="skill.id" v-if="isUntrainable(skill.id)" v-on:click="unTrainSkill">-</button></td>
        </tr>
      </tbody>
    </table>

    <h3>Untrained</h3>
    <table>
      <tbody>
        <tr v-for="skill in untrainedSkills">
          <td>{{ skill.name }}</td>
          <td>{{ skillValue(skill.id) }}</td>
          <td><button :data-skill="skill.id" v-if="isTrainable(skill.id)" v-on:click="trainSkill">+</button></td>
        </tr>
      </tbody>
    </table>

    <h3>Unusable</h3>
    <table>
      <tbody>
        <tr v-for="skill in unusableSkills">
          <td>{{ skill.name }}</td>
          <td>0</td>
          <td><button :data-skill="skill.id" v-if="isTrainable(skill.id)" v-on:click="trainSkill">+</button></td>
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
  alchemy: {
    trained: 6,
    specialized: 6
  },
  arcane_lore: {
    trained: 0,
    specialized: 2
  }
}

const untrainable = {
  alchemy: true,
  arcane_lore: false
}

const preTrainedStatus = {
  alchemy: 'unusable',
  arcane_lore: 'untrained'
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
        }
      ]
    }
  },
  computed: {
    // Attributes
    total_attribute_cost: function () {
      return Number(this.strength) + Number(this.endurance) + Number(this.coordination) + Number(this.quickness) + Number(this.focus) + Number(this.self)
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
      // TODO: See if this still reactively updates if done programmatically
      return cost[this.skills[0].id][this.skills[0].training] || 0 + cost[this.skills[1].id][this.skills[1].training] || 0
    },
    total_specialized_cost: function () {
      return this.skills.filter(function (s) {
        return s.training === 'specialized'
      }).reduce(function (sum, skill) {
        return sum + cost[skill.id].specialized
      }, 0)
    },
    available_skill_credits: function () {
      return 52 + this.skillCreditsAtLevel(this.level) + Number((this.railrea ? 1 : 0)) + Number((this.owsald ? 1 : 0)) + Number((this.lum1 ? 1 : 0)) + Number((this.lum2 ? 1 : 0))
    },
    // Skill values
    alchemy: function () {
      return Math.round((Number(this.coordination) + Number(this.focus)) / 3) + this.alchemy_training_bonus
    },
    alchemy_training_bonus: function () {
      var t = this.skills.filter(function (skill) {
        return skill.id === 'alchemy'
      })[0]

      if (t.training === 'specialized') {
        console.log('10')
        return 10
      } else if (t.training === 'trained') {
        console.log('5')
        return 5
      } else {
        return 0
      }
    },
    arcane_lore: function () {
      return Math.round(Number(this.focus) / 3, 0) + this.trainingBonus('arcane_lore')
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
      this.setSkillTraining(id, preTrainedStatus[id])
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
