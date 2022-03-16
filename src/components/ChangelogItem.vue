<template>
  <div class="release">
    <h2>
      <a v-bind:href="release.html_url">{{ release.name }}</a>
    </h2>
    <p>Released {{ release.created_at }}</p>
    <div class="release-body" v-html="releaseBody"></div>
  </div>
</template>

<script>
import MD from "markdown-it";

export default {
  name: "ChangelogItem",
  props: {
    release: Object,
  },
  computed: {
    releaseBody() {
      if (!this.release) {
        return;
      }

      return MD("default", {
        breaks: true,
        linkify: true,
      }).render(this.release.body);
    },
  },
};
</script>
