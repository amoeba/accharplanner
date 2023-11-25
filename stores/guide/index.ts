import { defineStore } from "pinia";

interface GuideState {
  guide: Guide | undefined;
}

const guideState: GuideState = {
  guide: undefined,
};

export const useGuideStore = defineStore("guide", {
  state: () => guideState,
  actions: {
    reset() {
      this.guide = {
        title: null,
        content: null,
      };
    },
    validate() {
        const errors: string[] = []

        if (!this.guide.title || this.guide.title.length <= 0) {
          errors.push("You must enter a title.")
        }

        if (!this.guide.content || this.guide.content.length <= 0) {
          errors.push("You must enter some content.")
        }

        return errors;
      }
  },
  persist: true,
});
