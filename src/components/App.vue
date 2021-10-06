<template>
  <div id="app" :class="theme">
    <Notifications />
    <header>
      <div class="logo">
        <router-link to="/">
          <img
            src="/img/icons/axe_shield.gif"
            width="32"
            height="32"
            alt="Overly-Detailed Asheron's Call Character Planner (ODAACP)"
          />
        </router-link>
      </div>
      <nav>
        <router-link to="/">Planner</router-link>
        <router-link to="/saved">Saved</router-link>
        <router-link to="/import">Import</router-link>
        <router-link to="/builds">Builds</router-link>
        <router-link to="/about"
          ><span class="onlynarrow">?</span
          ><span class="onlywide">About</span></router-link
        >
      </nav>
      <button
        aria-label="Toggle theme between dark and light"
        class="theme-toggle"
        @click="toggleDarkMode"></button>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div>This website created with Malar Zhapaj by <a href="https://github.com/amoeba">Kolth</a></div>
      <div>Icons from <a href="https://heroicons.dev/">Hero Icons</a></div>
    </footer>
  </div>
</template>

<script>
import Notifications from "./Notifications";
import { THEME } from "../types";

export default {
  name: "App",
  components: {
    Notifications
  },
  computed: {
    nextMode() {
      const preference = window.matchMedia("(prefers-color-scheme: dark)")
        .matches;

      if (this.$store.state.ui.darkMode === null) {
        return preference === "light" ? THEME.DARK : THEME.LIGHT;
      }

      return this.$store.state.ui.darkMode ? THEME.LIGHT : THEME.DARK;
    },

    theme() {
      if (this.$store.state.ui.darkMode === null) {
        return "";
      }

      return this.$store.state.ui.darkMode ? THEME.DARK : THEME.LIGHT;
    }
  },
  methods: {
    toggleDarkMode() {
      const preference = window.matchMedia("(prefers-color-scheme: dark)")
        .matches;

      this.$store.commit("toggleDarkMode", preference);
    }
  }
};
</script>
