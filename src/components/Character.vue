<template>
  <div>
    <h1>Character</h1>
    Level: {{ level }}
    <h2>Attributes</h2>
    <table>
      <tbody>
        <tr>
          <td>Strength</td>
          <td><input type="range" min="1" max="100" v-model="attributes.strength.base" /></td>
          <td>{{ attributes.strength.base }}</td>
        </tr>
        <tr>
          <td>Endurance</td>
          <td><input type="range" min="1" max="100" v-model="attributes.endurance.base" /></td>
          <td>{{ attributes.endurance.base }}</td>
        </tr>
        <tr>
          <td>Coordination</td>
          <td><input type="range" min="1" max="100" v-model="attributes.coordination.base" /></td>
          <td>{{ attributes.coordination.base }}</td>
        </tr>
        <tr>
          <td>Quickness</td>
          <td><input type="range" min="1" max="100" v-model="attributes.quickness.base" /></td>
          <td>{{ attributes.quickness.base }}</td>
        </tr>
        <tr>
          <td>Focus</td>
          <td><input type="range" min="1" max="100" v-model="attributes.focus.base" /></td>
          <td>{{ attributes.focus.base }}</td>
        </tr>
        <tr>
          <td>Self</td>
          <td><input type="range" min="1" max="100" v-model="attributes.self.base" /></td>
          <td>{{ attributes.self.base }}</td>
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
    <table>
      <tbody>
        <tr v-for="skill in specializedSkills">
          <td>{{ skill.name }}</td>
          <td>{{ skillValue(skill.id) }}</td>
        </tr>
      </tbody>
    </table>

    <h3>Trained</h3>
    <table>
      <tbody>
        <tr v-for="skill in trainedSkills">
          <td>{{ skill.name }}</td>
          <td>{{ skillValue(skill.id) }}</td>
        </tr>
      </tbody>
    </table>

    <h3>Untrained</h3>
    <table>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Base</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="skill in untrainedSkills">
          <td>{{ skill.name }}</td>
          <td>{{ skillValue(skill.id) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      level: 100,
      attributes: {
        strength: {
          name: 'Strength',
          base: 30
        },
        endurance: {
          name: 'Endurance',
          base: 30
        },
        coordination: {
          name: 'Coordination',
          base: 30
        },
        quickness: {
          name: 'Quickness',
          base: 30
        },
        focus: {
          name: 'Focus',
          base: 30
        },
        self: {
          name: 'Self',
          base: 30
        }
      },
      skills: [
        {
          id: 'alchemy',
          name: 'Alchemy',
          training: 'trained'
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
    health: function () {
      return Math.round(this.attributes.endurance.base / 2, 0)
    },
    stamina: function () {
      return this.attributes.endurance.base
    },
    mana: function () {
      return this.attributes.self.base
    },
    // Skill values
    alchemy: function () {
      return Math.round((Number(this.attributes.coordination.base) + Number(this.attributes.focus.base)) / 3) + this.alchemy_training_bonus
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
      return Math.round(Number(this.attributes.focus.base) / 3, 0) + this.trainingBonus('arcane_lore')
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
    }
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
    }
  }
}
</script>
