export default {
  trainingBonus: (training) => {
    if (training === "specialized") {
      return 10;
    } else if (training === "trained") {
      return 5;
    } else {
      return 0;
    }
  }
}
