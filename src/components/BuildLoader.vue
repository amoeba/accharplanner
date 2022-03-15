<template>
  <div class="build-loader">
    <span>
      <h2>Loading Build...</h2>
    </span>
  </div>
</template>

<script>
export default {
  name: "BuildLoader",
  created: function () {
    const path = this.$route.path;
    const build_id = path.replace(/^\//, "");

    if (typeof build_id === "string" && build_id.length > 0) {
      this.$store.dispatch("loadRemoteBuild", {
        build_id: build_id,
        router: this.$router,
      });
    }
  },
};
</script>
