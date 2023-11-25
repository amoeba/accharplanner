<script setup lang="ts">
import { ref } from "vue";
import { useGuideStore } from "~/stores/guide";

const client = useSupabaseClient();
const user = useSupabaseUser();
const store = useGuideStore();

const props = defineProps(["id"]);

const isNew = ref(true);

enum FormState {
  UNSENT,
  SENDING,
  SUCCESS,
  ERROR,
}

const formState = ref(FormState.UNSENT);

const createOrUpdateGuide = async function () {
  console.log("createOrUpdateGuide");
  let guide: Guide;
  if (isNew.value) {
    guide = await createGuide();
  } else {
    guide = await updateGuide();
  }

  navigateTo(`/guides/${guide.id}`);
  store.reset();
};

const fetchGuide = async function (id: Number): Guide {
  console.log("fetchGuide");

  const { data, error } = await client.from("guides").select().eq("id", id);

  if (error) {
    console.log(error);

    return;
  }

  console.log("success fetching", data[0]);
  console.log("syncing local store with fetched guide");

  return data[0];
};

const updateGuide = async function (): Guide {
  console.log(updateGuide);

  const { data, error } = await client
    .from("guides")
    .update({
      created_by: user.value?.id,
      title: store.guide.title,
      content: store.guide.content,
    })
    .eq("id", store.guide.id)
    .select();

  if (error) {
    console.log(error);

    return;
  }

  console.log("guide updated", data);

  return data[0];
};

const createGuide = async function (): Guide {
  console.log("createGuide");

  const { data, error } = await client
    .from("guides")
    .insert({
      created_by: user.value?.id,
      title: store.guide.title,
      content: store.guide.content,
    })
    .select();

  if (error) {
    console.log(error);

    return;
  }

  console.log("guide created", data);

  return data[0];
};

onMounted(async () => {
  // Set isNew
  if (props.id) {
    isNew.value = false;

    store.guide = await fetchGuide(props.id);
  }
});
</script>

<template>
  <h2
    v-if="isNew"
    class="text-lg font-bold"
  >
    New Guide
  </h2>
  <h2
    v-if="!isNew"
    class="text-lg font-bold"
  >
    Edit Guide
  </h2>
  <p class="py-2">
    Blurb about this...
  </p>

  <form
    v-if="store.guide"
    class="flex flex-col gap-2"
    @submit.prevent="createOrUpdateGuide"
  >
    <div class="flex flex-col">
      <label for="title">Title</label>
      <input
        id="title"
        v-model="store.guide.title"
        class="w-64"
        type="text"
      >
    </div>
    <div class="flex flex-col">
      <label
        for="content"
        class="font-bold"
      >Content</label>
      <GuideContentEditor
        v-model="store.guide.content"
        class="border rounded border-black"
      />
    </div>
    <input
      class="flex items-center gap-2 rounded border border-zinc-200 hover:bg-zinc-50 px-2 py-1 cursor-pointer w-auto"
      type="submit"
      value="Update"
      :disabled="formState == FormState.SENDING"
    >
  </form>
</template>
