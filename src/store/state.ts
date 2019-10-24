import DefaultCharacter from "./DefaultCharacter";
import { State } from "../types";

let state: State  = {
  notifications: [],
  savedBuilds: [],
  shareStatus: null,
  sharedBuild: null,
  character: DefaultCharacter(),
  stages: []
}

export default state;
