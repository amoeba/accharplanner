import DefaultCharacter from "./DefaultCharacter";
import { State } from "../types";

let state: State = {
  ui: {
    notifications: [],
    savedBuilds: [],
    shareStatus: null,
    sharedBuild: null,
    currentStage: null,
    paneVisibility: {
      attributes: true,
      skills: true,
      augmentations: true,
      auras: true,
      items: true,
      buildStages: true,
      character: true,
      xpAndLuminance: true,
      knobsAndDials: true,
      extraSkillCredits: true
    }
  },
  build: {
    character: DefaultCharacter(),
    stages: []
  }
};

export default state;
