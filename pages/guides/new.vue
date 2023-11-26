<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <div>
    <ButtonView>
      <NuxtLink href="/guides">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-arrow-left">
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back to Guides
      </NuxtLink>
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
