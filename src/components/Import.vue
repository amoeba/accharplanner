<template>
  <div>
    <div class="build">
      <div class="build-header">
        <h3>Import a Build</h3>
      </div>
      <div class="build-body">
        <p>
          Import builds you've saved to your computer from the <router-link to="/saved">Saved Builds</router-link> tab.
        </p>
        <input id="input" type="file" />
        <button v-on:click="importBuild">Import</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Import",
  computed: {},
  methods: {
    importBuild() {
      const selectedFile = document.getElementById("input").files[0];

      if (typeof selectedFile === "undefined") {
        this.$store.commit("addNotification", {
          type: "error",
          message: "Failed to import build from file: No file was selected."
        });

        return;
      }

      const reader = new FileReader();

      reader.onload = e => {
        try {
          var build = JSON.parse(e.target.result);
          this.$store.dispatch("import", build);
        } catch (error) {
          this.$store.commit("addNotification", {
            type: "error",
            message: "Failed to build from file: " + error + "."
          });
        }
      };

      reader.readAsText(selectedFile);
    }
  }
};
</script>
