<script setup lang="ts">
import { getUserId } from "~/utils/supabase"

const client = useSupabaseClient()
const user = useSupabaseUser()

const profileGetErrorMessage = ref("")
const profileCreateErrorMessage = ref("")

// Wait for user to be loaded before trying to fetch profile
if (getUserId(user)) {
  const { data: profileData, error: profileError } = await getProfile(client, user);

  if (profileError) {
    profileGetErrorMessage.value = profileError.message
  }

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
    <RedirectNotice />
    <p
      v-if="profileGetErrorMessage"
      class="text-red-600"
    >
      Error getting profile: {{ profileGetErrorMessage }}
    </p>
    <p
      v-if="profileCreateErrorMessage"
      class="text-red-600"
    >
      Error automatically creating profile: {{ profileCreateErrorMessage }}
    </p>

    <AccountView />
  </NarrowPageContainer>
</template>
