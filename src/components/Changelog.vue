<template>
  <div>
    <div class="main-pane">
      <div class="main-pane-header">
        <h3>Changelog</h3>
      </div>
      <div class="main-pane-body">
        <div v-if="loading">Loading releases...</div>

        <ChangelogItem
          v-for="release in releases"
          v-bind:key="release.id"
          v-bind:release="release"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChangelogItem from "./ChangelogItem.vue";

// [
//   {
//     "url": "https://api.github.com/repos/amoeba/accharplanner/releases/61959405",
//     "assets_url": "https://api.github.com/repos/amoeba/accharplanner/releases/61959405/assets",
//     "upload_url": "https://uploads.github.com/repos/amoeba/accharplanner/releases/61959405/assets{?name,label}",
//     "html_url": "https://github.com/amoeba/accharplanner/releases/tag/v1.0.1",
//     "id": 61959405,
//     "author": {
//       "login": "amoeba",
//       "id": 563,
//       "node_id": "MDQ6VXNlcjU2Mw==",
//       "avatar_url": "https://avatars.githubusercontent.com/u/563?v=4",
//       "gravatar_id": "",
//       "url": "https://api.github.com/users/amoeba",
//       "html_url": "https://github.com/amoeba",
//       "followers_url": "https://api.github.com/users/amoeba/followers",
//       "following_url": "https://api.github.com/users/amoeba/following{/other_user}",
//       "gists_url": "https://api.github.com/users/amoeba/gists{/gist_id}",
//       "starred_url": "https://api.github.com/users/amoeba/starred{/owner}{/repo}",
//       "subscriptions_url": "https://api.github.com/users/amoeba/subscriptions",
//       "organizations_url": "https://api.github.com/users/amoeba/orgs",
//       "repos_url": "https://api.github.com/users/amoeba/repos",
//       "events_url": "https://api.github.com/users/amoeba/events{/privacy}",
//       "received_events_url": "https://api.github.com/users/amoeba/received_events",
//       "type": "User",
//       "site_admin": false
//     },
//     "node_id": "RE_kwDOBbGWwc4DsWzt",
//     "tag_name": "v1.0.1",
//     "target_commitish": "main",
//     "name": "v1.0.1",
//     "draft": false,
//     "prerelease": false,
//     "created_at": "2022-03-16T04:31:04Z",
//     "published_at": "2022-03-16T04:33:48Z",
//     "assets": [

//     ],
//     "tarball_url": "https://api.github.com/repos/amoeba/accharplanner/tarball/v1.0.1",
//     "zipball_url": "https://api.github.com/repos/amoeba/accharplanner/zipball/v1.0.1",
//     "body": "FIXED\r\n\r\n- Base skill levels for trained skills were being 5 points too high. The fixed implementation has been verified to match PCAPs and both emulator softwares. #301 \r\n\r\n"
//   }
// ]

export default {
  name: "Changelog",
  components: { ChangelogItem },
  data() {
    return {
      loading: false,
      releases: [],
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;

      const url = "https://api.github.com/repos/amoeba/accharplanner/releases";

      fetch(url)
        .then((data) => data.json())
        .then((json) => {
          this.loading = false;
          this.releases = json;
        })
        .catch((err) => {
          this.error = err;
          this.loading = false;
        });
    },
  },
};
</script>
