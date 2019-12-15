<template>
  <div id="augmentations" class="pane augmentations">
    <div class="pane-header" v-on:click="toggle">
      <div><h3>Experience Augmentations</h3></div>
    </div>
    <div v-if="collapsed" class="table-wrapper">
      <table>
        <thead id="augmentations">
          <tr class="table-header">
            <th>Name</th>
            <th colspan="2">Invested</th>
          </tr>
          <tr class="controls">
            <th>&nbsp;</th>
            <th colspan="2">
              <input type="range" min="0" max="1" value="0" v-on:change="changeInvested" />
            </th>
          </tr>
        </thead>
        <tbody>
          <Augmentation name="archmages_endurance" />
          <Augmentation name="asherons_benediction" />
          <Augmentation name="asherons_lesser_benediction" />
          <Augmentation name="blackmoors_favor" />
          <Augmentation name="bleearghs_fortitude" />
          <Augmentation name="caustic_enhancement" />
          <Augmentation name="celdiseths_essence" />
          <Augmentation name="charmed_smith" />
          <Augmentation name="ciandras_essence" />
          <Augmentation name="ciandras_fortune" />
          <Augmentation name="clutch_of_the_miser" />
          <Augmentation name="critical_protection" />
          <Augmentation name="enduring_calm" />
          <Augmentation name="enduring_enchantment" />
          <Augmentation name="enhancement_of_the_arrow_turner" />
          <Augmentation name="enhancement_of_the_blade_turner" />
          <Augmentation name="enhancement_of_the_mace_turner" />
          <Augmentation name="eye_of_the_remorseless" />
          <Augmentation name="fiery_enhancement" />
          <Augmentation name="frenzy_of_the_slayer" />
          <Augmentation name="hand_of_the_remorseless" />
          <Augmentation name="icy_enhancement" />
          <Augmentation name="infused_creature_magic" />
          <Augmentation name="infused_item_magic" />
          <Augmentation name="infused_life_magic" />
          <Augmentation name="infused_void_magic" />
          <Augmentation name="infused_war_magic" />
          <Augmentation name="innate_renewal" />
          <Augmentation name="iron_skin_of_the_invincible" />
          <Augmentation name="jack_of_all_trades" />
          <Augmentation name="jibrils_essence" />
          <Augmentation name="kogas_essence" />
          <Augmentation name="master_of_the_five_fold_path" />
          <Augmentation name="master_of_the_focused_eye" />
          <Augmentation name="master_of_the_steel_circle" />
          <Augmentation name="might_of_the_seventh_mule" />
          <Augmentation name="oswalds_enhancement" />
          <Augmentation name="quick_learner" />
          <Augmentation name="reinforcement_of_the_lugians" />
          <Augmentation name="shadow_of_the_seventh_mule" />
          <Augmentation name="siraluuns_blessing" />
          <Augmentation name="steadfast_will" />
          <Augmentation name="storms_enhancement" />
          <Augmentation name="yoshis_essence" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Augmentation from "./Augmentation.vue";

export default {
  name: "Augmentations",
  components: {
    Augmentation
  },
  computed: {
    collapsed() {
      return this.$store.getters.augmentationsPaneVisible;
    }
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllAugmentationInvestment", e.target.value);
    },
    toggle() {
      this.$store.commit("toggleAugmentationsPane");
    }
  }
};
</script>
<style></style>
