<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div class="w-96">
    <h2 class="text-xl font-bold">
      Account
    </h2>
    <p>
      You are not logged in.
      <NuxtLink v-if="!user" to="/login">
        Go to the Login Page
      </NuxtLink>
    </p>
    <AccountManage v-if="user" />
  </div>
</template>
