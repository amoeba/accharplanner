import DefaultCharacter from "./DefaultCharacter";
import { State } from "../types";

let state: State  = {
  ui: {
    notifications: [],
    savedBuilds: [],
    shareStatus: null,
    sharedBuild: null,
    currentStage: null,
  },
  build: {
    character: DefaultCharacter(),
    stages: []
  }
}

export default state;
