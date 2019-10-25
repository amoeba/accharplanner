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
    LuminanceAuras
  },
  created: function() {
    // Bind Esc key to closing an open modal
    const self = this;

    document.addEventListener('keyup', function (evt) {
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
        this.$store.state.character,
        this.$store.state.character.name
      );
    },
    resetPlanner() {
      this.$store.commit("reset");
    }
  }
};
</script>

<style>
header {
  padding: 0.5rem;
}

header h1 {
  margin: 0;
  display: inline-block;
  margin-right: 0.5rem;
}

header a,
header a:visited {
  color: black;
  text-decoration: none;
}

h1, h2, h3 {
  margin: 0;
}

/* Grid */
.headers {
  display: grid;
  grid-template-columns: 1fr;
}

.panes {
  display: grid;
  grid-template-columns: 1fr;
}

.reallywide {
  display: none;
}

/* Make headers switch to two columns on narrow screens */
@media (min-width: 450px) {
  .headers {
    grid-template-columns: 1fr 1fr;
  }
}

/* Make headers switch to two columns on narrow screens */
@media (min-width: 800px) {
  .headers {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  #app #notifications {
    left: 0;
    bottom: 0;
    width: 300px;
  }
}

@media (min-width: 1100px) {
  .reallywide {
    display: block;
  }

  .narrow {
    display: none;
  }
}

/* Make panes switch to two columsn on wide screens */
@media (min-width: 1250px) {
  .panes {
    grid-template-columns: 1fr 1fr;
  }
}

/* General stuff */
table {
  width: 100%;
}

input,
select,
button {
  font-size: 100%;
  background-color: white;
  border: 1px solid #CCC;
  border-radius: 3px;
}

table {
  border-collapse: collapse;
  margin: 0;
}

td,
th {
  padding: 1px 3px;
  text-align: left;
  white-space: nowrap;
  height: 30px;
}

img {
  clip-path: circle(10px at center);
}

#planner ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

/* Share */
#share {
  padding: 0.5rem 0.5rem 0 0.5rem;
  text-align: right;
}

#share input {
  width: 14rem;
}

/* Headers */
.header {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0.5rem;
}

.header .header-title {
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.25rem;
  margin-bottom: 0.25rem;
}

.header .header-title-split {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.header .header-items {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-row-gap: 0.25rem;
}

.header .header-items.alt {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-row-gap: 0.25rem;
}

.header h3 {
  display: inline;
}

/* Panes */
.pane {
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow-x: scroll;
}

.pane .pane-header {
  display: grid;
  grid-template-columns: auto auto;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.25rem;
  padding-bottom: 0.25rem;
}

.pane .pane-header div h3 {
  margin: 0;
  padding: 0;
  font-size: 120%;
  display: inline;
  margin-right: 1rem;
}

.pane .table-wrapper {
  max-height: 25rem;
  overflow-y: scroll;
}

#attributes input[type="range"],
#vitals input[type="range"],
#skills input[type="range"] {
  width: 3rem;
}

tr.controls th {
  background-color: #eee;
}

/* Utility classes */
th.number,
td.number {
  min-width: 2rem;
}

.number input,
input.number {
  width: 2rem;
}

.isBuffed {
  color: green;
  font-weight: bold;
}

.error {
  color: red;
}

.center {
  text-align: center;
}

.red {
  color: red;
}

.gray {
  color: gray;
}

.base {
  border-left: 1px solid #ccc;
  padding-left: 8px;
}

.buffed {
  border-right: 1px solid #ccc;
}

.buttons {
  padding: 0.5rem 0.5rem 0 0.5rem;
}

.buttons button {
  padding: 0.15rem 0.75rem;
  margin-right: 0.25rem;
}

.buttons button:last-child {
  margin-right: 0;
}

.right {
  text-align: right;
}

/* Notifications */
#notifications {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  margin: 0;
  padding: 0;
}

.notification {
  position: relative;
  color: white;
  width: 90%;
  margin: 0.5rem auto;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
}

.success {
  border: 1px solid green;
  background-color: rgba(0, 150, 0, 0.95);
}

.info {
  border: 1px solid yellow;
  background-color: rgba(200, 200, 0, 0.95);
}

.failure {
  border: 1px solid red;
  background-color: rgba(150, 0, 0, 0.9);
}

/* Stages */
.header.header-stages {
  padding-bottom: 0;
}

#stages {
  display: flex;
  flex-wrap: wrap;
}

.stage {
  margin-bottom: 0.5rem;
}

.stage div {
  display: inline-block;
}

.stage button {
  vertical-align: middle;
  margin: 0;
  padding: 0;
  height: 1.5rem;
}

.stage-level {
  cursor: pointer;
  border-radius: 3px 0px 0px 3px;
  border-width: 1px 0px 1px 1px;
  border-style: solid;
  border-color: black;
  min-width: 2.25rem;
  text-align: center;
  background-color: #CCC;
  color: rgba(0, 0, 0, 0.9);
}

.stage-level.selected {
  background-color: black;
  color: white;
}

.stage-delete {
  cursor: pointer;
  border: none;
  margin: 0;
  padding: 0;
  min-width: auto;
  border-radius: 0px 3px 3px 0px;
  border: 1px solid black;
}

.stage-delete button:hover {
  background-color: black;
}

.stage-delete svg {
  padding: 3px 3px 1px 3px;
}

.stage-line {
  border: 0;
  height: 1px;
  background: #333;
  min-width: 2rem;
  margin: 0.18rem 0;
}

.stage-new {
  border: 1px solid black;
  border-radius: 3px;
  padding: 0px 5px;
}

.stage-new button {
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
