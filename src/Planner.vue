<template>
  <div id="planner">
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

export default {
  name: "planner",
  components: {
    Headers,
    AttributesAndVitals,
    Skills,
    Augmentations,
    LuminanceAuras
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

/* Grid */
.headers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.panes {
  display: grid;
  grid-template-columns: 1fr;
}

/* Make headers switch to two columns on narrow screens */
@media (max-width: 800px) {
  .headers {
    grid-template-columns: 1fr 1fr;
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

#planner ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

/* Headers */

.header {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0.5rem;
}

.header .header-title {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.25rem;
}

.header .header-items {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-row-gap: 0.25rem;
}

.header h3 {
  margin: 0px;
  padding-bottom: 0.25rem;
  display: inline;
}

/* Panes */
.pane {
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.pane .pane-header {
  display: grid;
  grid-template-columns: auto auto;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.25rem;
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

.right {
  text-align: right;
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
