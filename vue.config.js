const { gitDescribeSync } = require("git-describe");
process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash;

module.exports = {
  pwa: {
    workboxPluginMode: "GenerateSW",
    name: "Overly-Detailed Asheron's Call Character Planner"
  }
};
