<template>
  <div id="augmentations" class="pane augmentations">
    <div>
      <div class="pane-header" v-on:click="toggle">
        <div>
          <h3>Experience Augmentations</h3>
        </div>
        <div class="right">
          <span v-if="errors" class="error">{{ errors }}</span>
        </div>
      </div>
      <div v-if="collapsed" class="table-wrapper">
        <input v-model="filterQuery"/>
        <table>
          <thead>
            <tr class="table-header">
              <th>Name</th>
              <th colspan="2">Invested</th>
            </tr>
            <tr class="controls">
              <th>&nbsp;</th>
              <th>
                <input
                  type="range"
                  min="0"
                  max="1"
                  value="0"
                  v-on:change="changeInvested"
                />
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <Augmentation
              v-for="(augmentation) in augmentations"
              :key="augmentation"
              :name="augmentation"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Augmentation from "./Augmentation.vue";

export default {
  name: "Augmentations",
  components: {
    Augmentation,
  },
  data() {
    return {
      filterQuery: "",
    }
  },
  computed: {
    collapsed() {
      return this.$store.getters.augmentationsPaneVisible;
    },
    errors() {
      return this.$store.getters.augmentationErrors;
    },
    augmentations() {
      let all = [
        "archmages_endurance",
        "asherons_benediction",
        "asherons_lesser_benediction",
        "blackmoors_favor",
        "bleearghs_fortitude",
        "caustic_enhancement",
        "celdiseths_essence",
        "charmed_smith",
        "ciandras_essence",
        "ciandras_fortune",
        "clutch_of_the_miser",
        "critical_protection",
        "enduring_calm",
        "enduring_enchantment",
        "enhancement_of_the_arrow_turner",
        "enhancement_of_the_blade_turner",
        "enhancement_of_the_mace_turner",
        "eye_of_the_remorseless",
        "fiery_enhancement",
        "frenzy_of_the_slayer",
        "hand_of_the_remorseless",
        "icy_enhancement",
        "infused_creature_magic",
        "infused_item_magic",
        "infused_life_magic",
        "infused_void_magic",
        "infused_war_magic",
        "innate_renewal",
        "iron_skin_of_the_invincible",
        "jack_of_all_trades",
        "jibrils_essence",
        "kogas_essence",
        "master_of_the_five_fold_path",
        "master_of_the_focused_eye",
        "master_of_the_steel_circle",
        "might_of_the_seventh_mule",
        "oswalds_enhancement",
        "quick_learner",
        "reinforcement_of_the_lugians",
        "shadow_of_the_seventh_mule",
        "siraluuns_blessing",
        "steadfast_will",
        "storms_enhancement",
        "yoshis_essence"
      ]

      return all.filter(key => {
          return this.filterQuery
            .toLowerCase()
            .split(" ")
            .every(v => key.toLowerCase().includes(v));
        }
      );
    },
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllAugmentationInvestment", e.target.value);
    },
    toggle() {
      this.$store.commit("toggleAugmentationsPane");
    },
  },
};
</script>
