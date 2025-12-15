<script setup lang="ts">
import { getUserId } from "~/utils/supabase"

const client = useSupabaseClient()
const user = useSupabaseUser()

definePageMeta({
  middleware: ['onboarding-only']
})

const profileGetErrorMessage = ref("")
const profileCreateErrorMessage = ref("")

// Wait for user to be loaded before trying to fetch profile
if (getUserId(user)) {
  const { data: profileData, error: profileError } = await getProfile(client, user);

  if (profileError) {
    profileGetErrorMessage.value = profileError.message
  }

  // Auto-create profile if it doesn't exist
  if (!profileData || profileData.length < 1) {
    const { error } = await createProfile(client, user);

    if (error) {
      profileCreateErrorMessage.value = error.message
    }
  }
}
</script>

<template>
  <NarrowPageContainer>
    <div class="py-8">
      <h1 class="text-2xl font-bold mb-4">
        Welcome! Let's set up your account
      </h1>
      <p class="mb-6 text-gray-600 dark:text-gray-400">
        Choose a unique username to get started. This will be your display name on the platform.
      </p>

      <p
        v-if="profileGetErrorMessage"
        class="text-red-600 mb-4"
      >
        Error getting profile: {{ profileGetErrorMessage }}
      </p>
      <p
        v-if="profileCreateErrorMessage"
        class="text-red-600 mb-4"
      >
        Error creating profile: {{ profileCreateErrorMessage }}
      </p>

      <OnboardingUsernameSetup />
    </div>
  </NarrowPageContainer>
</template>
