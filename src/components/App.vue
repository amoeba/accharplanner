<template>
  <div id="app">
    <Notifications />
    <header>
      <div class="logo">
        <a href="/">
          <img
            src="/img/icons/axe_shield.gif"
            width="32"
            height="32"
            alt="Overly-Detailed Asheron's Call Character Planner (ODAACP)"
          />
        </a>
      </div>
      <nav>
        <router-link to="/">Planner</router-link>
        <router-link to="/saved">Saved</router-link>
        <router-link to="/import">Import</router-link>
        <router-link to="/builds">Builds</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer></footer>
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
