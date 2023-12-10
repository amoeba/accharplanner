import { defineStore } from "pinia"

interface MainState {
  darkMode: boolean | null
}

const mainState: MainState = {
  darkMode: null,
}

export const useMainStore = defineStore("main", {
  state: () => mainState,
  actions: {
    toggleDarkMode(prefersDark: boolean) {
      // If the user hasn't already chosen, change the theme to the opposite of
      // what their browser reports
      if (this.darkMode === null) {
        this.darkMode = !prefersDark

        return
      }

      // Otherwise just cycle
      this.darkMode = !this.darkMode
    },
    forgetTheme() {
      this.darkMode = null
    },
  },
  persist: true,
})
