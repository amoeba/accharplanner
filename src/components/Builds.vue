<template>
  <div>
    <div class="main-pane">
      <div class="main-pane-header">
        <h3>Builds</h3>
      </div>
      <div class="main-pane-body">
        <div class="builds" v-for="group in buildsGrouped">
          <h3>
            <img v-if="group.image" :src="'/img/' + group.image" width="16" height="16" />
            {{ group.name }}
            <img v-if="group.image" :src="'/img/' + group.image" width="16" height="16" />
          </h3>
          <p v-if="group.builds.length == 0">No builds to show. Yet.</p>
          <p v-if="group.url">
            More information at <a :href="group.url">{{ group.url }}</a>
          </p>

          <ul>
            <li v-for="build in group.builds">
              <a :href="'https://planner.treestats.net/' + build.id">{{ build.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

import BuildsEntry from "./BuildsEntry.vue";

export default {
  name: "Builds",
  components: {
    BuildsEntry,
  },
  data() {
    return {
      loading: false,
      builds: [],
      error: null,
      buildsGrouped: [
        {
          name: "Classic Builds",
          builds: [
            {
              id: "og_mage",
              name: "Og Mage",
            }
          ],
        },
        {
          name: "EoR Builds",
          builds: [
          ],
        },
        {
          name: "Levistras Auroch League Builds",
          url: "https://docs.google.com/spreadsheets/d/1pIHnxMNvQBnuDAJV0lvzCvbLqAT8p_HX2PL8TJgRNlU",
          image: "levistras.gif",
          builds: [
            {
              id: "XGqLZ8gCFY",
              name: "Chevaird",
            },
            {
              id: "gxzFUeHgsg",
              name: "Gearcrafter"
            },
            {
              id: "7mNURRylS7",
              name: "Hunter"
            },
            {
              id: "A4aJmNy4ht",
              name: "Samurai"
            },
            {
              id: "40KidImMaq",
              name: "Shadowbound"
            },
            {
              id: "vd9G8RkoBG",
              name: "Spirit Summoner"
            },
            {
              id: "n1dRPCba6m",
              name: "Vagabond"
            },
            {
              id: "qOo2QHQbZ3",
              name: "War Smith"
            }
          ],
        }
      ]
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.error = null;
      this.loading = true;

      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY
      );

      const { data, error } = await supabase
        .from("official_builds")
        .select();

      if (error) {
        this.error = true;
        this.loading = false;
      }

      this.loading = false;
      this.builds = data;
    },
  },
};
</script>

<style scoped>
.main-pane-body {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

h3 {
  margin-bottom: 0.5em;
}

p {
  word-break: break-all;
}

ul {
  list-style-type: disc;
  margin-left: 2em;
}
</style>