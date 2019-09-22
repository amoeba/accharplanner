import { Race, Gender } from "../types";

export interface Character {
  name: string,
  race: Race,
  gender: Gender,
  level: number,
  timesEnlightened: number,
  extraSkillCredits: any,
  attributes: any,
  vitals: any,
  skills: any,
  augmentations: any,
  luminance_auras: any
}