<script setup lang="ts">
import { createId } from "mnemonic-id";
import { usePlannerStore } from "~/stores/planner";

const user = useSupabaseUser();
const client = useSupabaseClient();
const store = usePlannerStore();

const favoriteBuild = async function () {
  if (!user) {
    return;
  }

  // TODO: make dynamic (get it from the store)
  const buildId = "hn7HnjGcjn";

  // Check if we've already favorited
  const { data: selectData, error: selectError } = await client
    .from("builds_favorites")
    .select()
    .eq("build_id", buildId)
    .eq("favorited_by", user.value.id);

  if (selectError) {
    console.log("Failed to find existing favs", selectError);

    return;
  }

  if (selectData.length > 0) {
    console.log("Fav already existed, not faving again");

    return;
  }

  // Only now do we favorite
  const { data, error } = await client
    .from("builds_favorites")
    .insert({ build_id: buildId })
    .select();

  if (error) {
    console.log("Failed to update favs count", error);
  } else {
    // TODO: Do something more fun with succcess
    // like a spinning star
    console.log("Favorited successfully", data);
  }
};

const publishBuild = async function () {
  console.log("publishBuild");

  // const { data, error } = await client
  //   .from("builds")
  //   .insert({ id: createId(10), content: store.build, is_published: true, user_id: user.value?.id })
  //   .select();

  // if (data) {
  //   console.log(data);
  // }

  // if (error) {
  //   console.log(error);
  // }
};
</script>
<template>
  <!-- TODO: Only allow Favorite when we're viewing a build -->
  <ButtonView v-if="user" @click="favoriteBuild"> ⭐️ </ButtonView>
  <ButtonView v-if="user" @click="publishBuild"> 🌍 </ButtonView>
</template>
