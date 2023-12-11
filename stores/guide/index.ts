import { defineStore } from "pinia"

interface GuideState {
  guide: TablesInsert<"guides"> | undefined
}

const guideState: GuideState = {
  guide: undefined,
}

export const useGuideStore = defineStore("guide", {
  state: () => guideState,
  actions: {
    reset() {
      this.guide = {
        title: "",
        content: "",
      }
    },
    validate() {
      const errors: string[] = []

      if (!this.guide.title || this.guide.title.length <= 0) {
        errors.push("You must enter a title.")
      }

      if (!this.guide.content || this.guide.content.length <= 0) {
        errors.push("You must enter some content.")
      }

      return errors
    },
    prepareGuideForSave() {
      // Note: A bit hacky and possibly could be improved upon
      // Before we save our guide, we want to make sure each BuildView
      // is set to the View step even if the user didn't choose it.
      this.guide.content = this.guide.content.replaceAll('tab="Start"', 'tab="View"')
    }
  },
  persist: true,
})
