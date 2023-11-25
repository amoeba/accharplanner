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
        title: "title",
        content: "content",
      };
    },
  },
  persist: true,
});
