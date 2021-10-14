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
        @click="toggleDarkMode"
      ></button>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div>
        This website created with Malar Zhapaj by
        <a href="https://github.com/amoeba">Kolth</a>
      </div>
      <div>Icons from <a href="https://heroicons.dev/">Hero Icons</a></div>
    </footer>
  </div>
</template>

<script>
import Notifications from "./Notifications";
import { THEME } from "../types";
import { importCharacter } from "./import";

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
  },
  created() {
    // Clear any notifications stored in localStorage
    this.$store.commit("clearAllNotifications");

    // Decide if we should do things
    const params = new URL(document.location.href).searchParams;

    if (
      !params.get("action") ||
      !params.get("server") ||
      !params.get("character")
    ) {
      return;
    }

    if (params.get("action") != "import") {
      return;
    }

    // Reset our character before import
    this.$store.commit("reset");

    // Start doing things
    var store = this.$store;
    const url =
      "https://treestats.net/" +
      params.get("server") +
      "/" +
      params.get("character") +
      ".json";
    let errorEncountered = false;

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        if (!json.attribs) {
          throw "Invalid JSON structure. Is this character a stub character (i.e., no attributes, skills)?";
        }

        return json;
      })
      .then(json => {
        importCharacter(store, json);
      })
      .catch(error => {
        errorEncountered = true;

        store.commit("addNotification", {
          type: "error",
          message:
            "Failed to import " +
            params.get("character") +
            " (" +
            params.get("server") +
            "): " +
            error
        });

        return;
      })
      .then(() => {
        if (errorEncountered) {
          return;
        }

        store.commit("addNotification", {
          type: "success",
          message:
            params.get("character") +
            " (" +
            params.get("server") +
            ") successfully imported."
        });
      });
  }
};
</script>
