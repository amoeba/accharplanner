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
const isSending = ref(false)
const hasBeenSent = ref(false)

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

const signInWithEmail = async function (email) {
  isSending.value = true;
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
      errors.value.push(error as SupabaseError);
    } else {
      hasBeenSent.value = true;
    }
  } catch (e) {
    errors.value.push(e)
  } finally {
    isSending.value = false;
  }

  isSending.value = false;
}
</script>

<template>
  <h2>Log In</h2>
  <p>Enter your email address</p>
  <form @submit.prevent="handleSubmit">
    <label>Email<input type="text" v-model="email" /></label>
    <input type="submit" :disabled="isSending" value="Send Magic Link" />
  </form>
  <p v-if="hasBeenSent" class="text-green-400">Check your email for a link to log in.</p>
  <p v-if="errors.length > 0" class="text-red-400">
    <span class="font-bold">We encountered the following error(s) while submitting this form::</span>
  <ul>
    <li v-for="error in errors">
      <span v-if="error.name">
        <span class="font-bold">{{ error.name }} ({{ error.status }}): </span> {{ error.message }}
      </span>
      <span v-else>
        {{ error.message }}
      </span>
    </li>
  </ul>
  </p>
</template>