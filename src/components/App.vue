<template>
  <div id="app">
    <header>
      <a href="//planner.treestats.net">
        <h1>Overly-Detailed Asheron's Call Character Planner (ODACCP)</h1>
      </a>
    </header>
    <nav>
      <router-link class="selected" to="/"><strong>Planner</strong></router-link>
      <router-link to="/builds"><strong>Saved Builds</strong></router-link>
      <a class="link-discord" href="https://discord.gg/wfmpqJs">Discord</a>
      <a class="link-github" href="https://github.com/amoeba/accharplanner">Source Code</a>
    </nav>
    <content>
      <router-view></router-view>
    </content>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
}

a, a:visited {
  color: blue;
  text-decoration: none;
}

nav {
  display: flex;
}

nav a {
  margin-right: 0.5rem;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #CCC;
  border-radius: 5px 5px 0px 0px;
  padding: 0.25rem 0.5rem;
}

content > div {
  border: 1px solid #CCC;
  border-radius: 0px 5px 5px 5px;
}

a.link-discord, a:visited.link-discord {
  color: rgb(95, 114, 209);
}

a.link-github, a:visited.link-github {
  color: black;
}
</style>
