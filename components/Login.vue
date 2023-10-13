<script setup lang="ts">
import { ref } from 'vue';
const client = useSupabaseClient();
const user = useSupabaseUser();

interface SupabaseError {
  name: string | undefined,
  status: number | undefined,
  message: string
}

const email = ref("")
const errors = ref<SupabaseError[]>([])

// Form state state machine
enum FormState {
  UNSENT,
  SENDING,
  SUCCESS,
  ERROR
}

const formState = ref(FormState.UNSENT)

const handleSubmit = async function () {
  const finalEmail = email.value.trim();

  if (finalEmail.length <= 0) {
    errors.value.push({
      message: "Please provide an email address."
    } as SupabaseError
    )

    return;
  }

  await signInWithEmail(finalEmail);
}

const signInWithEmail = async function (email: string) {
  formState.value = FormState.SENDING;
  errors.value = []

  const config = useRuntimeConfig()

  try {
    const { data, error } = await client.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: config.supabaseRedirectUrl
      },
    });

    if (error) {
      formState.value = FormState.ERROR;
      errors.value.push(error as SupabaseError);
    } else {
      formState.value = FormState.SUCCESS;
      setTimeout(() => { formState.value = FormState.UNSENT }, 3000);
    }
  } catch (e) {
    formState.value = FormState.ERROR;
    errors.value.push(e);
  }
}
</script>

<template>
  <div class="w-96">
    <h2 class="text-xl font-bold">Log In</h2>
    <p class="py-3">Enter your email address and receive a link to log in.</p>
    <form @submit.prevent="handleSubmit">
      <label class="block py-3">
        <div>Email</div>
        <input class="w-full p-2" type="text" v-model="email" />
      </label>
      <div class="flex justify-end">
        <input class="p-2" type="submit" :disabled="formState == FormState.SENDING" value="Send Link" />
      </div>
    </form>
    <p v-if="formState == FormState.SUCCESS" class="text-green-400">Check your email for a link to log in.</p>
    <FormErrors v-if="formState == FormState.ERROR" errors="errors" />
  </div>
</template>