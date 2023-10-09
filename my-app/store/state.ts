import DefaultCharacter from "./DefaultCharacter";

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
    modalVisibility: {
      share: false,
      settings: false,
    },
    darkMode: null,
  },
  build: {
    character: DefaultCharacter(),
    stages: [],
  },
  settings: {
    infiniteMode: false,
  },
  auth: {
    isLoggedIn: false,
    isAdmin: false,
  },
};

export default state;
