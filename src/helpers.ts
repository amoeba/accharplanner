import { Training } from "./types";

export default {
  trainingBonus: function (training: Training) {
    if (training === Training.SPECIALIZED) {
      return 10;
    } else if (training === Training.TRAINED) {
      return 0; // TODO: Verify?
    } else {
      return 0;
    }
  },
  buffBonus: function (level: number) {
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
  cantripBonus: function (level: number) {
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
    alchemy: Training.UNUSABLE
  },
  exportCharacter: function(data: object, name: string | null) {
    const filename =
      (name || "character").replace(/[^a-zA-Z0-9_]+/, "-") + ".json";

      this.exportJSONData(data, filename);
  },
  exportJSONData: function(data: object, filename: string) {
    let json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], {
      type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }
};
