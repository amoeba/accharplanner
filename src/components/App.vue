<template>
  <div id="app">
    <Notifications />
    <header>
      <div>
        <a href="//planner.treestats.net">
          <div class="reallywide"><h1>Overly-Detailed Asheron's Call Character Planner (ODACCP)</h1></div>
          <div class="narrow"><h1><abbr title="Overly-Detailed Asheron's Call Character Planner">ODACCP</abbr></h1></div>
        </a>
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

nav {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

nav a {
  margin-right: 0.25rem;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #ccc;
  border-radius: 5px 5px 0px 0px;
  padding: 0.25rem 0.5rem;
}

nav a:hover {
  background-color: rgba(220, 220, 220, 0.5);
}

content > div {
  border: 1px solid #ccc;
  border-radius: 0px 5px 5px 5px;
}

a.link-discord,
a:visited.link-discord {
  color: rgb(95, 114, 209);
}

a.link-github,
a:visited.link-github {
  color: black;
}
</style>
