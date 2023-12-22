<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const errorMessage = ref("")
let builds: BuildRow[]

if (user.value) {
  const { data, error } = await getMySharedBuilds(client, user, 10)

  if (error) {
    errorMessage.value = error.message
  } else if (data) {
    builds = data
  }
}
</script>

<template>
  <div>
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <div v-if="!user">
      You must <NuxtLink to="/login">log in</NuxtLink> first.
    </div>
    <div v-if="user">
      <p v-if="builds && builds.length == 0">You haven't shared any builds yet.</p>
      <div v-if="builds && builds.length > 0" class="flex flex-col gap-2">
        <RemoteBuildListItem v-for="build in builds" :key="build.id" :build="build" />
      </div>
    </div>
  </div>
</template>
