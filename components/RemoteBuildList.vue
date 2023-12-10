<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const errorMessage = ref("")
const { data, error } = await getMySharedBuilds(client, user, 10)

let builds: BuildRow[]

if (error) {
  errorMessage.value = error.message
} else if (data) {
  builds = data
}
</script>

<template>
  <div>
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <div v-if="!user">
      You must log in first.
    </div>
    <div v-if="user">
      <table v-if="data && data.length > 0" class="w-auto">
        <RemoteBuildListItem v-for="build in builds" :key="build.id" :build="build" />
      </table>
    </div>
  </div>
</template>
