import { defineStore } from "pinia";

interface MainState {
  darkMode: boolean | null;
}

const mainState: MainState = {
  darkMode: null,
};

export const useMainStore = defineStore("main", {
  state: () => mainState,
  actions: {
    toggleDarkMode(preference: boolean) {
      if (this.darkMode === null) {
        this.darkMode = !preference;
      }

      this.darkMode = !this.darkMode;
    },
  },
});
