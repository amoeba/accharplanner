<template>
  <div id="planner">
    <div class="buttons">
      <button v-on:click="saveBuild">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
        Save
        </button>
      <button v-on:click="exportCharacter">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
      Export
      </button>
      <button v-on:click="resetPlanner">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        Reset
        </button>
      <button id="show-modal" @click="modalVisible = true">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
        Share
        </button>
    </div>
    <Modal v-if="modalVisible" @close="modalVisible = false">
      <div slot="header">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
        Share Build
      </div>
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
import Stages from "./Stages.vue";
import Modal from "./Modal.vue";
import ShareModal from "./ShareModal.vue";
import Headers from "./Headers.vue";
import AttributesAndVitals from "./AttributesAndVitals.vue";
import Skills from "./Skills.vue";
import Augmentations from "./Augmentations.vue";
import LuminanceAuras from "./LuminanceAuras.vue";
import Items from "./Items.vue";
import { exportCharacter } from "../helpers";

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
