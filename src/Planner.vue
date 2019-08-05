<template>
  <div id="planner">
    <Notifications />
    <header>
      <a href="//planner.treestats.net">
        <h1>Overly-Detailed Asheron's Call Character Planner (ODACCP)</h1>
      </a>
      <ul class="links">
        <li><a href="https://discord.gg/wfmpqJs">Discord</a></li>
        <li><a href="https://github.com/amoeba/accharplanner">GitHub</a></li>
      </ul>
    </header>
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
import Headers from "./components/Headers.vue";
import AttributesAndVitals from "./components/AttributesAndVitals.vue";
import Skills from "./components/Skills.vue";
import Augmentations from "./components/Augmentations.vue";
import LuminanceAuras from "./components/LuminanceAuras.vue";
import Notifications from "./components/Notifications.vue";

export default {
  name: "planner",
  components: {
    Headers,
    AttributesAndVitals,
    Skills,
    Augmentations,
    LuminanceAuras,
    Notifications
  }
};
</script>

<style>
/* Overall layout */
#planner {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
}

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

header ul.links {
  list-style-type: none;
  display: inline-block;
}

header ul.links li {
  display: inline-block;
  margin-right: 0.5rem;
}

header ul.links li a {
  color: blue;
}

header ul.links li a:visited {
  color: blue;
}

/* Grid */
.headers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.panes {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 1300px) {
  #planner {
    max-width: 660px;
  }

  .headers {
    grid-template-columns: 1fr 1fr;
  }

  .panes {
    grid-template-columns: 1fr;
  }
}

/* General stuff */
table {
  width: 100%;
}

input,
select {
  font-size: 100%;
}

table {
  border-collapse: collapse;
  margin: 0;
}

td,
th {
  padding: 1px 3px;
  text-align: left;
}

th,
td {
  height: 1.5rem;
  padding: 2px 3px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

/* Headers */
.headers {
  margin-bottom: 1.5rem;
}

.header {
  padding: 0.5rem;
}

.header h3 {
  border-bottom: 1px solid #ccc;
  margin: 0px;
  padding-bottom: 0.25rem;
}

.header th,
.header td {
  vertical-align: top;
}

/* Panes */
.pane {
  padding: 0.5rem;
  max-height: 26rem;
  overflow-y: scroll;
}

#attributes input[type="range"],
#vitals input[type="range"],
#skills input[type="range"] {
  width: 50px;
}

tr.pane-header th {
  background-color: #ccc;
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

/* Notifications */
#notifications {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  width: 300px;
  z-index: 100;
}

.notification {
  position: relative;
  background-color: #ff0000;
  color: white;
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 95%;
  cursor: pointer;
}

.success {
  background-color: green;
}

.failure {
  background-color: red;
}
</style>
