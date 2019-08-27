import Constants from "./constants";

export default {
  trainingBonus: training => {
    if (training === Constants.TRAINING.SPECIALIZED) {
      return 10;
    } else if (training === Constants.TRAINING.TRAINED) {
      return 0; // TODO: Verify?
    } else {
      return 0;
    }
  },
  buffBonus: level => {
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
  },
  cantripBonus: level => {
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
  },
  untrainedState: {
    alchemy: Constants.TRAINING.UNUSABLE
  },
  exportCharacter: (data, name) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const filename =
      (name || "character").replace(/[^a-zA-Z0-9_]+/, "-") + ".json";
    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }
};
