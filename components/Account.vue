<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <div class="w-96">
    <h2 class="text-xl font-bold">Account</h2>
    <NuxtLink v-if="!user" to="/login">You are not logged in. You should Sign In</NuxtLink>
    <AccountManage v-if="user" />
  </div>
</template>