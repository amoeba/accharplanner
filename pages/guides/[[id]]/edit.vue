<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const user = useSupabaseUser();
const route = useRoute();
</script>

<template>
  <NuxtLink href="/guides">
    Back to Guides
  </NuxtLink>
  <div v-if="!user">
    You must be logged in to edit a Guide.
    <Button>
      <NuxtLink href="/login">
        Log In
      </NuxtLink>
    </Button>
  </div>
  <GuideEditor
    v-if="user"
    :id="route.params.id"
  />
</template>
