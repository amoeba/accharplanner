<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const profileGetErrorMessage = ref("")
const profileCreateErrorMessage = ref("")

console.log("Fetching profile...")
const { data: profileData, error: profileError } = await getProfile(client, user);

if (profileError) {
  profileGetErrorMessage.value = profileError.message
}

if (!profileData || profileData.length < 1) {
  console.log("Auto creating profile...")
  const { error } = await createProfile(client, user);

  if (error) {
    profileCreateErrorMessage.value = error.message
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-2">
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
  </div>
</template>
