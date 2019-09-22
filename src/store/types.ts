import { Character } from "./types/character";

enum NotificationType {
  Success,
  Error,
  Info
}

export interface Notification {
  type: NotificationType,
  message: string
}

export interface Build {
  character: any
}

export interface State {
  character: Character
  notifications: Notification[],
  savedBuilds: Build[],
  sharedBuild: string | null,
}

export enum Race {
  Aluvian,
  "Gharu'ndim",
  Sho
}

export enum Gender {
  Female,
  Male
}