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
      armor_sets: true,
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
  auth: {
    isLoggedIn: false,
    isAdmin: false,
  },
};

export default state;
