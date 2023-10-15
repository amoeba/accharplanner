<template>
  <div id="planner">
    <div class="buttons">
      <button v-on:click="saveBuild">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
        </svg>
        Save
      </button>
      <button v-on:click="exportCharacter">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
        Export
      </button>
      <button v-on:click="resetPlanner">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
          </path>
        </svg>
        Reset
      </button>
      <button id="show-share-modal" @click="showShareModal">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z">
          </path>
        </svg>
        Share
      </button>
      <button id="show-settings-modal" @click="showSettingsModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
          <path
            d="M232,120h-8.34a95.07,95.07,0,0,0-8.82-32.9l7.23-4.17a8,8,0,0,0-8-13.86l-7.25,4.19a97,97,0,0,0-24.08-24.08l4.19-7.25a8,8,0,0,0-13.86-8l-4.17,7.23A95.07,95.07,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34a95.07,95.07,0,0,0-32.9,8.82l-4.17-7.23a8,8,0,0,0-13.86,8l4.19,7.25A97,97,0,0,0,49.18,73.26l-7.25-4.19a8,8,0,0,0-8,13.86l7.23,4.17A95.07,95.07,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34a95.07,95.07,0,0,0,8.82,32.9l-7.23,4.17a8,8,0,0,0,4,14.93,7.92,7.92,0,0,0,4-1.07l7.25-4.19a97,97,0,0,0,24.08,24.08l-4.19,7.25a8,8,0,0,0,13.86,8l4.17-7.23a95.07,95.07,0,0,0,32.9,8.82V232a8,8,0,0,0,16,0v-8.34a95.07,95.07,0,0,0,32.9-8.82l4.17,7.23a8,8,0,0,0,13.86-8l-4.19-7.25a97,97,0,0,0,24.08-24.08l7.25,4.19A8,8,0,0,0,225,184a8,8,0,0,0-2.92-10.93l-7.23-4.17a95.07,95.07,0,0,0,8.82-32.9H232a8,8,0,0,0,0-16ZM72,128A55.91,55.91,0,0,1,93.38,84l25.38,44L93.38,172A55.91,55.91,0,0,1,72,128Zm56,56a55.67,55.67,0,0,1-20.78-4l25.4-44h50.8A56.09,56.09,0,0,1,128,184Zm4.62-64-25.4-44a56,56,0,0,1,76.2,44Z">
          </path>
        </svg>
        Settings
      </button>
    </div>
    <Modal v-if="shareModalVisible" @close="hideShareModal">
      <template v-slot:header>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z">
          </path>
        </svg>
        Share Build
      </template>
      <template v-slot:body>
        <ShareModal />
      </template>
    </Modal>
    <Modal v-if="settingsModalVisible" @close="hideSettingsModal">
      <template v-slot:header>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
          <path
            d="M232,120h-8.34a95.07,95.07,0,0,0-8.82-32.9l7.23-4.17a8,8,0,0,0-8-13.86l-7.25,4.19a97,97,0,0,0-24.08-24.08l4.19-7.25a8,8,0,0,0-13.86-8l-4.17,7.23A95.07,95.07,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34a95.07,95.07,0,0,0-32.9,8.82l-4.17-7.23a8,8,0,0,0-13.86,8l4.19,7.25A97,97,0,0,0,49.18,73.26l-7.25-4.19a8,8,0,0,0-8,13.86l7.23,4.17A95.07,95.07,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34a95.07,95.07,0,0,0,8.82,32.9l-7.23,4.17a8,8,0,0,0,4,14.93,7.92,7.92,0,0,0,4-1.07l7.25-4.19a97,97,0,0,0,24.08,24.08l-4.19,7.25a8,8,0,0,0,13.86,8l4.17-7.23a95.07,95.07,0,0,0,32.9,8.82V232a8,8,0,0,0,16,0v-8.34a95.07,95.07,0,0,0,32.9-8.82l4.17,7.23a8,8,0,0,0,13.86-8l-4.19-7.25a97,97,0,0,0,24.08-24.08l7.25,4.19A8,8,0,0,0,225,184a8,8,0,0,0-2.92-10.93l-7.23-4.17a95.07,95.07,0,0,0,8.82-32.9H232a8,8,0,0,0,0-16ZM72,128A55.91,55.91,0,0,1,93.38,84l25.38,44L93.38,172A55.91,55.91,0,0,1,72,128Zm56,56a55.67,55.67,0,0,1-20.78-4l25.4-44h50.8A56.09,56.09,0,0,1,128,184Zm4.62-64-25.4-44a56,56,0,0,1,76.2,44Z">
          </path>
        </svg>
        Settings
      </template>
      <template v-slot:body>
        <SettingsModal />
      </template>
    </Modal>
    <Stages />
    <Headers />
    <div class="row panes">
      <AttributesAndVitals />
      <Skills />
      <Augmentations />
      <LuminanceAuras />
      <Items />
      <ArmorSets />
    </div>
  </div>
</template>

<script>
import Stages from "./Stages.vue";
import Modal from "./Modal.vue";
import ShareModal from "./ShareModal.vue";
import SettingsModal from "./SettingsModal.vue";
import Headers from "./Headers.vue";
import AttributesAndVitals from "./AttributesAndVitals.vue";
import Skills from "./Skills.vue";
import Augmentations from "./Augmentations.vue";
import LuminanceAuras from "./LuminanceAuras.vue";
import Items from "./Items.vue";
import ArmorSets from "./ArmorSets.vue";

import { usePlannerStore } from "~/stores/planner";

export default {
  name: "planner",
  components: {
    Stages,
    Modal,
    ShareModal,
    SettingsModal,
    Headers,
    AttributesAndVitals,
    Skills,
    Augmentations,
    LuminanceAuras,
    Items,
    ArmorSets,
  },
  setup() {
    const store = usePlannerStore();

    return { store };
  },
  created: function () {
    // Bind Esc key to closing an open modal
    const self = this;

    // // FIXME
    // document.addEventListener("keyup", function (evt) {
    //   if (evt.keyCode === 27) {
    //     if (self.modalVisible) {
    //       self.modalVisible = false;
    //     }
    //   }
    // });

    // Load remote built (if URL is right)
    const path = this.$route.path;

    if (path == "/") {
      return;
    }

    const extraStuff = path.replace(/^\/planner/, "");

    if (typeof extraStuff === "string" && extraStuff.length > 0) {
      this.store.loadRemoteBuild(extraStuff);
    }
  },
  computed: {
    shareModalVisible() {
      return this.store.shareModalVisible;
    },
    settingsModalVisible() {
      return this.store.settingsModalVisible;
    },
  },
  methods: {
    saveBuild() {
      this.store.addNotification({
        type: "success",
        message: "Build saved. See the Saved tab.",
      });
      this.store.saveBuild();
    },
    exportCharacter() {
      exportCharacter(
        this.store.build,
        this.store.build.character.name
      );
    },
    resetPlanner() {
      this.store.reset();
    },
    publishBuild() {
      this.store.publishBuild();
    },
    showShareModal() {
      this.store.showShareModal();
    },
    hideShareModal() {
      this.store.hideShareModal();
    },
    showSettingsModal() {
      this.store.showSettingsModal();
    },
    hideSettingsModal() {
      this.store.hideSettingsModal();
    }
  },
};
</script>
