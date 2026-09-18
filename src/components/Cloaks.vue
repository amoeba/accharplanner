<template>
  <div id="cloaks" class="pane items">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div>
          <h3>Cloaks</h3>
        </div>
      </div>
      <div v-if="collapsed" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th colspan="2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Cloaked in Skill
                <span class="faded">+20 All Skills</span>
              </td>
              <td colspan="2">
                <input
                  id="cloaked_in_skill"
                  name="cloaked_in_skill"
                  type="checkbox"
                  v-model="cloakedInSkill"
                />
              </td>
            </tr>
            <tr>
              <td>
                Damage Rating
                <span class="faded">+0 to +3</span>
              </td>
              <td>
                <input
                  id="cloak_damage"
                  name="cloak_damage"
                  type="range"
                  min="0"
                  max="3"
                  v-model="cloakDamage"
                />
              </td>
              <td class="number">
                <input v-model="cloakDamage" type="text" />
              </td>
            </tr>
            <tr>
              <td>
                Damage Reduction Rating
                <span class="faded">+0 to +3</span>
              </td>
              <td>
                <input
                  id="cloak_damage_reduction"
                  name="cloak_damage_reduction"
                  type="range"
                  min="0"
                  max="3"
                  v-model="cloakDamageReduction"
                />
              </td>
              <td class="number">
                <input v-model="cloakDamageReduction" type="text" />
              </td>
            </tr>
          </tbody>
        </table>
        <p class="note">
          Only one cloak may be equipped. Damage and Damage Reduction ratings
          are mutually exclusive.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cloaks",
  computed: {
    collapsed() {
      return this.$store.getters.cloaksPaneVisible;
    },
    cloakedInSkill: {
      get() {
        return this.$store.state.build.character.cloaks.cloaked_in_skill;
      },
      set(value) {
        this.$store.commit("updateCloak", {
          id: "cloaked_in_skill",
          value: value,
        });
      },
    },
    cloakDamage: {
      get() {
        return this.$store.state.build.character.cloaks.damage;
      },
      set(value) {
        this.$store.commit("updateCloak", {
          id: "damage",
          value: Number(value),
        });
      },
    },
    cloakDamageReduction: {
      get() {
        return this.$store.state.build.character.cloaks.damage_reduction;
      },
      set(value) {
        this.$store.commit("updateCloak", {
          id: "damage_reduction",
          value: Number(value),
        });
      },
    },
  },
  methods: {
    toggle() {
      this.$store.commit("toggleCloaksPane");
    },
  },
};
</script>

<style scoped>
.note {
  font-size: 0.85em;
  opacity: 0.7;
  margin-top: 0.5em;
}
</style>
