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
      augmentations: false,
      auras: false,
      items: false,
      armor_sets: false,
      buildStages: true,
      character: true,
      xpAndLuminance: true,
      knobsAndDials: true,
      extraSkillCredits: true,
    },
    darkMode: null,
  },
  build: {
    character: DefaultCharacter(),
    stages: [],
  },
};

export default state;
