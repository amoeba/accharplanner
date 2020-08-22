import { Training } from "./types";

export const trainingBonus = function (training: Training) {
  if (training === Training.SPECIALIZED) {
    return 10;
  } else if (training === Training.TRAINED) {
    return 0;
  } else {
    return 0;
  }
};

export const buffBonus = function (level: number) {
  switch (level) {
    case 1:
      return 10;
    case 2:
      return 15;
    case 3:
      return 20;
    case 4:
      return 25;
    case 5:
      return 30;
    case 6:
      return 35;
    case 7:
      return 40;
    case 8:
      return 45;
    default:
      return 0;
  }
};

export const cantripBonus = function (level: number) {
  switch (level) {
    case 1:
      return 5;
    case 2:
      return 15;
    case 3:
      return 25;
    case 4:
      return 35;
    default:
      return 0;
  }
};

export const exportJSONData = function (data: object, filename: string) {
  let json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], {
    type: "application/json"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
};

export const exportCharacter = function (data: object, name: string | null) {
  const filename =
    (name || "character").replace(/[^a-zA-Z0-9_]+/, "-") + ".json";

  exportJSONData(data, filename);
};

export const clamp = function (value: number, clamp: number): number {
  if (value < clamp) {
    return clamp;
  }

  return value;
};
