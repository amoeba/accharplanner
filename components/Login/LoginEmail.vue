<script setup lang="ts">
import { ref } from "vue"

const client = useSupabaseClient()

const defaultButtonText = "Send 🔮 Link"
const email = ref("")
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

  await signInWithEmail(finalEmail)
}

const signInWithEmail = async function (email: string) {
  formState.value = FormState.SENDING
  submitButtonText.value = "Sending..."

  const config = useRuntimeConfig()

  try {
    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: config.supabaseRedirectUrl as string,
      },
    })

    if (error) {
      formState.value = FormState.ERROR
      submitButtonText.value = defaultButtonText
      errorMessage.value = error.message
    }
 else {
      formState.value = FormState.SUCCESS
      submitButtonText.value = "Check your inbox!"

      setTimeout(() => {
        formState.value = FormState.UNSENT
        submitButtonText.value = defaultButtonText
      }, 3000)
    }
  }
 catch (e: any) {
    formState.value = FormState.ERROR
    submitButtonText.value = defaultButtonText
    errorMessage.value = e
  }
}
</script>

<template>
  <div class="w-full max-w-96">
    <p class="py-2">
      Enter your email address and receive a link to log in.
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
      Check your email for a link to log in.
    </p>
    <p
      v-if="formState === FormState.ERROR"
      class="text-red-600"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
