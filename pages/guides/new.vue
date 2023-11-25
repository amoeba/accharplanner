<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
</script>

<template>
  <NuxtLink href="/guides">
    Back to Guides
  </NuxtLink>
  <div v-if="!user">
    You must be logged in to create a new Guide.
    <Button>
      <NuxtLink href="/login">
        Log In
      </NuxtLink>
    </Button>
  </div>
  <GuideEditor v-if="user" />
</template>
