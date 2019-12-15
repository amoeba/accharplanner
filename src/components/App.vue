<template>
  <div id="app">
    <Notifications />
    <header>
      <div>
        <div class="onlywide inline"><h1><a href="//planner.treestats.net">Overly-Detailed Asheron's Call Character Planner</a></h1></div>
        <div class="onlynarrow inline"><h1><abbr title="Overly-Detailed Asheron's Call Character Planner"><a href="//planner.treestats.net">ODACCP</a></abbr></h1></div>
      </div>
      <div>
        <a class="link-discord" href="https://discord.gg/wfmpqJs">Discord</a>
        <a class="link-github" href="https://github.com/amoeba/accharplanner">GitHub</a>
      </div>
    </header>
    <nav>
      <router-link class="selected" to="/">
        <strong>Planner</strong>
      </router-link>
      <router-link to="/builds">
        <strong>Builds</strong>
      </router-link>
      <router-link to="/import">
        <strong>Import</strong>
      </router-link>
    </nav>
    <content>
      <router-view></router-view>
    </content>
  </div>
</template>

<script>
import Notifications from "./Notifications";

export default {
  name: "App",
  components: {
    Notifications
  }
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
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

h1, h2, h3 {
  margin: 0;
}

a,
a:visited {
  color: blue;
  text-decoration: none;
}

header {
  display: grid;
  grid-template-columns: 6fr 1fr;
  align-items: center;
}

header > div:last-child {
  text-align: right;
}

header > div:last-child a {
  margin-left: 0.5rem;
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

nav {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

nav a {
  margin-right: 0.25rem;
  padding: 0.25rem 0.5rem;
}

nav a:hover {
  background-color: rgba(220, 220, 220, 0.5);
}

a.link-discord,
a:visited.link-discord {
  color: rgb(95, 114, 209);
}

a.link-github,
a:visited.link-github {
  color: black;
}

/* Utility classes */
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

.right {
  text-align: right;
}

.inline {
  display: inline-block;
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
</style>
