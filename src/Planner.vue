<template>
  <div id="planner">
    <div class="buttons right">
      <button v-on:click="saveBuild">Save</button>
      <button v-on:click="exportCharacter">Export</button>
      <button v-on:click="resetPlanner">Reset</button>
      <button id="show-modal" @click="modalVisible = true">Share</button>
    </div>
    <Modal v-if="modalVisible" @close="modalVisible = false">
      <h3 slot="header">Share Build</h3>
      <ShareModal slot="body" />
    </Modal>
    <Stages />
    <Headers />
    <div class="row panes">
      <AttributesAndVitals />
      <Skills />
      <Augmentations />
      <LuminanceAuras />
      <Items />
    </div>
  </div>
</template>

<script>
import Stages from "./components/Stages.vue";
import Modal from "./components/Modal.vue";
import ShareModal from "./components/ShareModal.vue";
import Headers from "./components/Headers.vue";
import AttributesAndVitals from "./components/AttributesAndVitals.vue";
import Skills from "./components/Skills.vue";
import Augmentations from "./components/Augmentations.vue";
import LuminanceAuras from "./components/LuminanceAuras.vue";
import Items from "./components/Items.vue";
import { exportCharacter } from "./helpers";

export default {
  name: "planner",
  data() {
    return {
      modalVisible: false
    };
  },
  components: {
    Stages,
    Modal,
    ShareModal,
    Headers,
    AttributesAndVitals,
    Skills,
    Augmentations,
    LuminanceAuras,
    Items
  },
  created: function() {
    // Bind Esc key to closing an open modal
    const self = this;

    document.addEventListener("keyup", function(evt) {
      if (evt.keyCode === 27) {
        if (self.modalVisible) {
          self.modalVisible = false;
        }
      }
    });

    // Load remote built (if URL is right)
    const path = this.$route.path;

    if (path == "/") {
      return;
    }

    const extraStuff = path.replace(/^\//, "");

    if (typeof extraStuff === "string" && extraStuff.length > 0) {
      this.$store.dispatch("loadRemoteBuild", extraStuff);
    }
  },
  methods: {
    saveBuild() {
      this.$store.commit("addNotification", {
        type: "success",
        message: "Build saved. See the Builds tab."
      });
      this.$store.commit("saveBuild");
    },
    exportCharacter() {
      exportCharacter(
        this.$store.state.build,
        this.$store.state.build.character.name
      );
    },
    resetPlanner() {
      this.$store.commit("reset");
    }
  }
};
</script>
