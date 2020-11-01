<template>
  <div class="share-modal">
    <div class="share-modal-status">{{ shareStatus }}</div>
    <input
      id="sharedBuildURL"
      type="text"
      v-model="sharedBuildURL"
      placeholder="Sharing, hang on tight..."
    />
    <button v-on:click="copyBuild">{{ copyButtonText }}</button>
  </div>
</template>

<script>
export default {
  name: "ShareModal",
  data() {
    return {
      copyButtonText: "Copy to Clipboard"
    };
  },
  created() {
    this.$store.dispatch("shareBuild");
  },
  computed: {
    shareStatus() {
      return this.$store.getters.shareStatus;
    },
    sharedBuildURL() {
      const build = this.$store.getters.sharedBuild;

      if (build === null) {
        return "";
      }

      return "https://planner.treestats.net/" + build;
    }
  },
  methods: {
    copyBuild(event) {
      const target = document.querySelector("#sharedBuildURL");

      if (target === null) {
        return;
      }

      target.select();
      document.execCommand("copy");

      const self = this;
      self.copyButtonText = "Copied!";

      window.setTimeout(e => {
        self.copyButtonText = "Copy to Clipboard";
      }, 1000);
    }
  }
};
</script>
