import Constants from "./constants";

export default {
  trainingBonus: (training) => {
    if (training === Constants.TRAINING.SPECIALIZED) {
      return 10;
    } else if (training === Constants.TRAINING.TRAINED) {
      return 5;
    } else {
      return 0;
    }
  },
  buffBonus: (level) => {
    switch(level) {
      case 1:
        return 10;
      case 2:
        return 20;
      case 3:
        return 30;
      case 4:
        return 40;
      case 5:
        return 50;
      case 6:
        return 60;
      case 7:
        return 70;
      case 8:
        return 80;
      default:
        return 0;
    }
  },
  cantripBonus: (level) => {
    switch(level) {
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
  }
}
