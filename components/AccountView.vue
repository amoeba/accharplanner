<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <NarrowPageContainer>
    <h2 class="text-xl font-bold">
      Account
    </h2>
    <p v-if="!user">
      You are not logged in.
      <NuxtLink to="/login">
        Go to the Login Page
      </NuxtLink>
    </p>
    <AccountManage v-if="user" />
  </NarrowPageContainer>
</template>
