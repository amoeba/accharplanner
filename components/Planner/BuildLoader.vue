<template>
  <div>
    <span>
      <h2>Loading Build...</h2>
    </span>
  </div>
</template>

<script>
import { usePlannerStore } from "~/stores/planner";

export default {
  name: "BuildLoader",
  setup() {
    const store = usePlannerStore();

    return {
      store
    }
  },
  created: function () {
    const path = this.$route.path;
    const build_id = path.replace(/^\//, "");

    if (typeof build_id === "string" && build_id.length > 0) {
      this.store.loadRemoteBuild({
        build_id: build_id,
        router: this.$router,
      });
    }
  },
};
</script>
