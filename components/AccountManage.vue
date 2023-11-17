<script setup lang="ts">
import { ref, onMounted } from 'vue';
const client = useSupabaseClient();
const user = useSupabaseUser();

interface SupabaseError {
  name: string | undefined,
  status: number | undefined,
  message: string
}

const name = ref("")
const message = ref("")
const errors = ref<SupabaseError[]>([])
const isSigningOut = ref(false);

// Form state state machine
enum FormState {
  UNSENT,
  SENDING,
  SUCCESS,
  ERROR
}

const formState = ref(FormState.UNSENT)

const signOut = async function () {
  try {
    errors.value = [];
    isSigningOut.value = true;

    let { error } = await client.auth.signOut()

    if (error) {
      errors.value.push(error);
    }
  } catch (error) {
    errors.value.push({ message: error.message } as SupabaseError)
  } finally {
    isSigningOut.value = false;
  }
}

const validateName = function (name: string) {
  let out: string = name.trim();

  if (out.length <= 0) {
    throw new Error("Name should be at least one character long.");
  }

  const pattern = /[a-zA-Z][a-zA-Z0-9 ']+/;

  if (!out.match(pattern)) {
    throw new Error("Name should match the regex " + pattern + ".");
  }

  return out;
}

const trySetName = async function () {
  formState.value = FormState.SENDING;

  try {
    message.value = "";
    errors.value = []
    const newName = validateName(name.value);

    const { data, error } = await client.from("profiles")
      .upsert({
        id: user.value?.id,
        name: newName
      }).select()

    if (error) {
      formState.value = FormState.ERROR;
      errors.value.push(error);
    } else {
      formState.value = FormState.SUCCESS;
      message.value = "Success!"
      setTimeout(() => { formState.value = FormState.UNSENT }, 3000);
    }
  } catch (error) {
    formState.value = FormState.ERROR;
    errors.value.push({ message: error.message } as SupabaseError)
  }
}

const fetchProfile = async function () {
  const { data, error } = await client.from("profiles").select().eq("id", user.value.id)

  if (error) {
    console.log("error", error);
  }

  if (data) {
    name.value = data[0]["name"];
  }
  return data;
}
onMounted(async () => {
  await fetchProfile();
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <form @submit.prevent="trySetName">
      <label class="block py-3">
        <div>Name</div>
        <input class="w-full px-2 py-1" type="text" v-model="name" />
      </label>
      <div class="flex justify-end gap-2 content-center">
        <div class="px-2 py-1" v-if="formState == FormState.SENDING">Sending...</div>
        <div class="px-2 py-1" v-if="formState == FormState.SUCCESS">{{ message }}</div>
        <FormErrors v-if="formState == FormState.ERROR" :errors="errors" />
        <input
          class="flex items-center gap-2 rounded border border-zinc-200 hover:bg-zinc-50 px-2 py-1 cursor-pointer w-auto"
          type="submit" value="Update" :disabled="formState == FormState.SENDING" />
      </div>
    </form>
  </div>
  <Button v-if="user" :disabled="isSigningOut" @click="signOut">Log Out</Button>
</template>
