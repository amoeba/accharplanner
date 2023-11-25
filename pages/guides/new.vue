<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <div>
    <ButtonView>
      <NuxtLink href="/guides"> Back to Guides </NuxtLink>
    </ButtonView>
    <div v-if="!user">
      You must be logged in to create a new Guide.
      <ButtonView>
        <NuxtLink href="/login"> Log In </NuxtLink>
      </ButtonView>
    </div>
    <GuideCreate v-if="user" />
  </div>
</template>
