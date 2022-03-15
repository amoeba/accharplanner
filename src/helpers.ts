import { Training } from "./types";

/**
 * Specialized skills were given a free +10 bonus. Skills trained at creation
 * only were given 5 free points in the skill but this isn't a bonus on top,
 * it's just a head start towards 208 total points spent.
 *
 * Notes: https://github.com/amoeba/accharplanner/issues/301
 */
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

// Most sets have this schema for bonuses
export const standardSetBonus = function (pieces: number) {
  if (pieces < 2) {
    return 0;
  } else if (pieces === 2) {
    return 3;
  } else if (pieces === 3) {
    return 5;
  } else if (pieces === 4) {
    return 10;
  } else if (pieces >= 5) {
    return 20;
  } else {
    return 0;
  }
}

// Many sets have the same secondary effect magnitudes (3/5)
export const standardSecondarySetBonus = function (pieces: number) {
  if (pieces === 4) {
    return 3;
  } else if (pieces >= 5) {
    return 5;
  } else {
    return 0;
  }
}

export const dedicationSetBonus = function (pieces: number) {
  if (pieces < 2) {
    return 0;
  } else if (pieces >= 2 && pieces < 4) {
    return 3;
  } else if (pieces >= 4 && pieces < 6) {
    return 6;
  } else if (pieces >= 6 && pieces < 8) {
    return 9;
  } else if (pieces == 8) {
    return 12;
  } else if (pieces >= 9) {
    return 15
  } else {
    return 0;
  }
}

export const dextrousSetStaminaBonus = function (pieces: number) {
  if (pieces === 4) {
    return 6;
  } else if (pieces >= 5) {
    return 20;
  } else {
    return 0;
  }
}

export const heartySetHealthBonus = function (pieces: number) {
  if (pieces === 4) {
    return 3;
  } else if (pieces >= 5) {
    return 10;
  } else {
    return 0;
  }
}

export const wiseSetManaBonus = function (pieces: number) {
  if (pieces === 4) {
    return 6;
  } else if (pieces >= 5) {
    return 20;
  } else {
    return 0;
  }
}

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
