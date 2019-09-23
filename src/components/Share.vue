
<template>
  <div id="share">
    <button v-on:click="shareBuild">Share</button>
    <input type="text" id="sharedBuildURL" v-model="sharedBuildURL">
        <button v-on:click="copyBuild">Copy</button>
</input>
  </div>
</template>

<script>
export default {
  name: "Share",
  computed: {
    sharedBuildURL() {
      const build = this.$store.getters.sharedBuild;

      if (build === null) {
        return "";
      }

      return "https://planner.treestats.net/" + build;
    }
  },
  methods: {
    shareBuild() {
      this.$store.commit("addNotification", {
        type: "info",
        message: "Sharing build, hang on tight...*portal sounds*"
      });

      this.$store.dispatch("shareBuild");
    },
    copyBuild(event) {
      const target = document.querySelector("#sharedBuildURL");

      if (target === null) {
        return;
      }

      target.select();
      document.execCommand("copy");

      this.$store.commit("addNotification", {
        type: "success",
        message: "Copied share link to clipboard!"
      });
    }
  }
};
</script>
<style></style>
