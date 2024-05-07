<script setup lang="ts">
import { ref } from "vue"

const client = useSupabaseClient()
const router = useRouter()

const defaultButtonText = "Log In"
const email = ref("")
const password = ref("")
const submitButtonText = ref(defaultButtonText)
const errorMessage = ref("")

// Form state state machine
enum FormState {
  UNSENT,
  SENDING,
  SUCCESS,
  ERROR,
}

const formState = ref(FormState.UNSENT)

const handleSubmit = async function () {
  if (formState.value === FormState.SENDING) {
    return
  }

  errorMessage.value = ""

  const finalEmail = email.value.trim()

  if (finalEmail.length <= 0) {
    formState.value = FormState.ERROR
    errorMessage.value
      = "Please provide an email address that isn't just an empty string."

    return
  }

  await signInWithEmail()
}

async function signInWithEmail() {
  formState.value = FormState.SENDING
  submitButtonText.value = "Logging in..."

  const { data, error } = await client.auth.signInWithPassword({
    email: email.value.trim(),
    password: password.value.trim(),
  })

  if (data) {
    formState.value = FormState.SUCCESS
    submitButtonText.value = defaultButtonText
    await navigateTo("/")
  }

  if (error) {
    formState.value = FormState.ERROR
    errorMessage.value = error.message
    submitButtonText.value = defaultButtonText
  }
}
</script>

<template>
  <div>
    <p class="py-2">
      Log in with email and password:
    </p>
    <form @submit.prevent="handleSubmit">
      <label class="block py-3">
        <div>Email</div>
        <input
          v-model="email"
          class="w-full px-2 py-1"
          type="text"
        >
      </label>
      <label class="block py-3">
        <div>Password</div>
        <input
          v-model="password"
          class="w-full px-2 py-1"
          type="password"
        >
      </label>
      <div class="flex justify-end">
        <input
          class="cursor-pointer px-2 py-1 hover:bg-zinc-100 dark:hover:bg-stone-600"
          type="submit"
          :value="submitButtonText"
        >
      </div>
    </form>
    <p
      v-if="formState === FormState.SUCCESS"
      class="text-green-600"
    >
      You are now logged in.
    </p>
    <p
      v-if="formState === FormState.ERROR"
      class="text-red-600"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
