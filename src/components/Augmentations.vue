<template>
  <table>
    <tbody id="augmentations">
      <tr>
        <th colspan="2">Augmentations</th>
      </tr>
      <tr class="pane-header">
        <th>Name</th>
        <th colspan="2">Invested</th>
      </tr>
      <tr class="controls">
        <th>&nbsp;</th>
        <th colspan="2">
          <input type="range" min="0" max="1" v-on:change="changeInvested" />
        </th>
      </tr>
      <Augmentation name="might_of_the_seventh_mule" />
      <Augmentation name="shadow_of_the_seventh_mule" />
      <Augmentation name="infused_war_magic" />
      <Augmentation name="infused_life_magic" />
      <Augmentation name="infused_item_magic" />
      <Augmentation name="infused_creature_magic" />
      <Augmentation name="infused_void_magic" />
      <Augmentation name="clutch_of_the_miser" />
      <Augmentation name="enduring_enchantment" />
      <Augmentation name="quick_learner" />
      <Augmentation name="asherons_lesser_benediction" />
      <Augmentation name="asherons_benediction" />
      <Augmentation name="blackmoors_favor" />
      <Augmentation name="innate_renewal" />
      <Augmentation name="reinforcement_of_the_lugians" />
      <Augmentation name="bleearghs_fortitude" />
      <Augmentation name="oswalds_enhancement" />
      <Augmentation name="siraluuns_blessing" />
      <Augmentation name="enduring_calm" />
      <Augmentation name="steadfast_will" />
      <Augmentation name="enhancement_of_the_mace_turner" />
      <Augmentation name="enhancement_of_the_blade_turner" />
      <Augmentation name="enhancement_of_the_arrow_turner" />
      <Augmentation name="storms_enhancement" />
      <Augmentation name="fiery_enhancement" />
      <Augmentation name="icy_enhancement" />
      <Augmentation name="caustic_enhancement" />
      <Augmentation name="critical_protection" />
      <Augmentation name="frenzy_of_the_slayer" />
      <Augmentation name="iron_skin_of_the_invincible" />
      <Augmentation name="eye_of_the_remorseless" />
      <Augmentation name="hand_of_the_remorseless" />
      <Augmentation name="ciandras_fortune" />
      <Augmentation name="charmed_smith" />
      <Augmentation name="jibrils_essence" />
      <Augmentation name="yoshis_essence" />
      <Augmentation name="celdiseths_essence" />
      <Augmentation name="kogas_essence" />
      <Augmentation name="ciandras_essence" />
      <Augmentation name="master_of_the_steel_circle" />
      <Augmentation name="master_of_the_five_fold_path" />
      <Augmentation name="master_of_the_focused_eye" />
      <Augmentation name="jack_of_all_trades" />
      <Augmentation name="archmages_endurance" />
    </tbody>
  </table>
</template>

<script>
import Augmentation from "./Augmentation.vue";

export default {
  name: "Augmentations",
  components: {
    Augmentation
  },
  computed: {
  },
  methods: {
    changeInvested(e) {
      this.$store.commit("changeAllAugmentationInvestment", e.target.value);
    }
  }
};
</script>
<style></style>
