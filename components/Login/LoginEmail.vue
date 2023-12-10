<script setup lang="ts">
import { ref } from 'vue'

const client = useSupabaseClient()
const user = useSupabaseUser()

interface SupabaseError {
  name: string | undefined
  status: number | undefined
  message: string
}

const defaultButtonText = 'Send 🔮 Link'
const email = ref('')
const submitButtonText = ref(defaultButtonText)
const errorMessage = ref('')

// Form state state machine
enum FormState {
  UNSENT,
  SENDING,
  SUCCESS,
  ERROR,
}

const formState = ref(FormState.UNSENT)

const handleSubmit = async function () {
  errorMessage.value = ''

  const finalEmail = email.value.trim()

  if (finalEmail.length <= 0) {
    formState.value = FormState.ERROR
    errorMessage.value
      = 'Please provide an email address that isn\'t just an empty string.'

    return
  }

  await signInWithEmail(finalEmail)
}

const signInWithEmail = async function (email: string) {
  formState.value = FormState.SENDING
  submitButtonText.value = 'Sending...'

  const config = useRuntimeConfig()

  try {
    const { data, error } = await client.auth.signInWithOtp({
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
      submitButtonText.value = 'Check your inbox!'

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
  <div>
    <p class="py-3">
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
          class="hover:bg-zinc-100 cursor-pointer px-2 py-1 disabled:bg-zinc-200 disabled:text-zinc-500"
          type="submit"
          :disabled="formState === FormState.SENDING"
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
      class="text-red-500"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
