<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const user = useSupabaseUser();
const route = useRoute();
</script>

<template>
  <div>
    <ButtonView>
      <NuxtLink href="/guides"> Back to Guides </NuxtLink>
    </ButtonView>
    <div v-if="!user">
      You must be logged in to edit a Guide.
      <ButtonView>
        <NuxtLink href="/login"> Log In </NuxtLink>
      </ButtonView>
    </div>
    <GuideEdit v-if="user" :id="route.params.id" />
  </div>
</template>
