<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <div>
    <NuxtLink href="/guides"> Back to Guides </NuxtLink>
    <div v-if="!user">
      You must be logged in to create a new Guide.
      <ButtonView>
        <NuxtLink href="/login"> Log In </NuxtLink>
      </ButtonView>
    </div>
    <GuideEditor v-if="user" />
  </div>
</template>
