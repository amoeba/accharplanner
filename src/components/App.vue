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
        <router-link to="/changelog">Changelog</router-link>
        <router-link to="/about">About</router-link>
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
    </footer>
  </div>
</template>

<script>
import Notifications from "./Notifications.vue";
import { THEME } from "../types";
import { importCharacter } from "../import";
import { createClient } from "@supabase/supabase-js";

export default {
  name: "App",
  components: {
    Notifications,
  },
  computed: {
    nextMode() {
      const preference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

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
    },
  },
  methods: {
    toggleDarkMode() {
      const preference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      this.$store.commit("toggleDarkMode", preference);
    },
  },
  created() {
    // Auth
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );

    supabase.auth.getSession().then(({ data }) => {
      if (!data || !data.session) {
        this.$store.commit("updateIsLoggedIn", false);
        this.$store.commit("updateIsAdmin", false);

        return;
      }

      this.$store.commit("updateIsLoggedIn", true);

      // TODO: Figure out how to use roles
      if (data.session.user.email === "petridish@gmail.com") {
        this.$store.commit("updateIsAdmin", true);
      }
    });

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
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (!json.attribs) {
          throw "Invalid JSON structure. Is this character a stub character (i.e., no attributes, skills)?";
        }

        return json;
      })
      .then((json) => {
        importCharacter(store, json);
      })
      .catch((error) => {
        errorEncountered = true;

        store.commit("addNotification", {
          type: "error",
          message:
            "Failed to import " +
            params.get("character") +
            " (" +
            params.get("server") +
            "): " +
            error,
        });

        return;
      })
      .then(() => {
        if (errorEncountered) {
          return;
        }

        const msg = `<strong>${params.get("character")} (${params.get("server")})
        imported.</strong><br><br>Be aware that importing characters from
        treestats.net isn't always accurate and it's recommended to build a
        character from scratch.<br><br>[Click this notification to close]`;

        store.commit("addNotification", {
          type: "success",
          message: msg,
          pinned: true
        });
      });
  },
};
</script>
