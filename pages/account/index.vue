<script setup lang="ts">
import { ref } from 'vue';
const client = useSupabaseClient();
const user = useSupabaseUser();

interface SupabaseError {
  name: string | undefined,
  status: number | undefined,
  message: string
}
const errors = ref<SupabaseError[]>([])
const isSigningOut = ref(false);

const signOut = async function () {
  const config = useRuntimeConfig()

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

</script>

<template>
  <div>
    <h2>Account</h2>
    <!-- TODO: Show the user their account if logged in -->
    <!-- TODO: Show the user a sign out button if logged in -->
  </div>
</template>