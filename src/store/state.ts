import DefaultCharacter from "./DefaultCharacter";
import { State } from "../types";

let state: State  = {
  notifications: [],
  savedBuilds: [],
  sharedBuild: null,
  character: DefaultCharacter()
}

export default state;