import { defineStore } from "pinia"

import state from "./state"
import getters from "./getters"
import actions from "./actions"

export const usePlannerStore = defineStore("planner", {
  state: () => state,
  getters,
  actions,
  persist: {
    key: 'accp-planner',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    omit: ['ui.notifications'],
  },
})
