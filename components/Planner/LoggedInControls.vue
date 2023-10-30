<script setup lang="ts">
import { createId } from "mnemonic-id";
import { usePlannerStore } from "~/stores/planner";

const user = useSupabaseUser();
const client = useSupabaseClient();
const store = usePlannerStore();

const publishBuild = async function () {
  console.log("publishBuild")


  const { data, error } = await client
    .from("builds")
    .insert({ id: createId(10), content: store.build, is_published: true, user_id: user.value?.id })
    .select();

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }
}
</script>
<template>
  <!-- TODO: Only allow Favorite when we're viewing a build -->
  <Button v-if="user">X Favorite</Button>
  <Button v-if="user" @click="publishBuild">X Publish</Button>
</template>
