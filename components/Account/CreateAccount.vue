<script setup lang="ts">
const originalSubmitButtonText = "Register Account"
const email = ref("")
const password = ref("")
const errorMessage = ref("")
const submitButtonText = ref(originalSubmitButtonText)

const supabase = useSupabaseClient();

// Form state state machine
enum FormState {
  UNSENT,
  SENDING,
  SUCCESS,
  ERROR,
}

const formState = ref(FormState.UNSENT)


async function handleSubmit() {
  await signUpNewUser();
}

async function signUpNewUser() {
  formState.value = FormState.SENDING
  submitButtonText.value = "Creating..."

  const { data, error } = await supabase.auth.signUp({
    email: email.value.trim(),
    password: password.value.trim(),
  })

  if (error) {
    formState.value = FormState.ERROR
    errorMessage.value = error.message
    submitButtonText.value = originalSubmitButtonText

    return;
  }

  if (data) {
    formState.value = FormState.SUCCESS
    submitButtonText.value = originalSubmitButtonText

    // Redirect to onboarding for new users to set up their profile
    await navigateTo("/onboarding")
  }
}
</script>

<template>
  <div>
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
      Account successfully created.
    </p>
    <p
      v-if="formState === FormState.ERROR"
      class="text-red-600"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
