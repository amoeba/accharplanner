<script setup lang="ts">
import { ref } from "vue"
import type { ProfileRow } from "~/utils/database.types";
import { setProfileName } from "~/utils/supabase";

const client = useSupabaseClient()
const user = useSupabaseUser()

const profile = ref<ProfileRow>()
const message = ref("")
const errorMessage = ref("")
const isSigningOut = ref(false)

// Form state state machine
enum FormState {
  UNSENT,
  SENDING,
  SUCCESS,
  ERROR,
}

const formState = ref(FormState.UNSENT)

const signOut = async function () {
  try {
    errorMessage.value = ""
    isSigningOut.value = true

    const { error } = await client.auth.signOut()

    if (error) {
      errorMessage.value = error.message
    }
  }
  catch (error) {
    errorMessage.value = error.message
  }
  finally {
    isSigningOut.value = false
  }
}

const validateName = async function (name: string) {
  const out: string = name.trim()

  // Validate length
  if (out.length <= 0) {
    throw new Error("Name should be at least one character long.")
  }

  // Validate against our pattern
  const pattern = /^[a-zA-Z][a-zA-Z0-9 ']+$/

  if (!out.match(pattern)) {
    throw new Error(`Name should match the regex ${pattern}.`)
  }

  // Make sure the new name doesn't already exist but be cool with it
  // if it's the current profile name
  if (profile.value.name !== name) {
    const { data, error } = await doesProfileNameAlreadyExist(client, name);

    if (error) {
      throw new Error("Error encountered while checking new profile name:", error.message)
    }

    if (data.length > 0) {
      throw new Error("A user already exists with that name.")
    }
  }

  return out
}

const trySetName = async function () {
  formState.value = FormState.SENDING

  message.value = ""
  errorMessage.value = ""

  let newName: string

  // Validate
  try {
    newName = await validateName(profile.value.name)
  } catch (e: any) {
    formState.value = FormState.ERROR
    errorMessage.value = e

    return;
  }

  // Submit
  try {
    const { data, error } = await setProfileName(client, user, newName)

    if (error) {
      formState.value = FormState.ERROR
      errorMessage.value = error.message
    }
    else if (data) {
      formState.value = FormState.SUCCESS
      message.value = "Success!"

      setTimeout(() => {
        formState.value = FormState.UNSENT
      }, 3000)
    }
  } catch (e: any) {
    formState.value = FormState.ERROR
    errorMessage.value = e

    return;
  }
}

const { data, error } = await client
  .from("profiles")
  .select()
  .eq("id", user.value.id)

if (error) {
  errorMessage.value = error.message
} else if (data) {
  profile.value = data[0]
}
</script>

<template>
  <Suspense>
    <div>
      <div class="flex flex-col gap-2">
        <form @submit.prevent="trySetName">
          <label class="block py-3">
            <div>Name</div>
            <input
              v-model="profile.name"
              class="w-full px-2 py-1"
              type="text"
            >
          </label>
          <div class="flex content-center justify-end gap-2">
            <div
              v-if="formState === FormState.SENDING"
              class="px-2 py-1"
            >
              Sending...
            </div>
            <div
              v-if="formState === FormState.ERROR"
              class="px-2 py-1 text-red-500"
            >
              {{ errorMessage }}
            </div>
            <div
              v-if="formState === FormState.SUCCESS"
              class="px-2 py-1 text-green-500"
            >
              {{ message }}
            </div>
            <input
              class="flex w-auto cursor-pointer items-center gap-2 rounded border border-zinc-200 px-2 py-1 hover:bg-zinc-50"
              type="submit"
              value="Update"
            >
          </div>
        </form>
      </div>
      <ButtonView
        v-if="user"
        :disabled="isSigningOut"
        @click="signOut"
      >
        Log Out
      </ButtonView>
    </div>

    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
