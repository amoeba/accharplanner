<script setup lang="ts">
import { useRoute } from "vue-router"

const user = useSupabaseUser()
const route = useRoute()

useHead({
  title: 'Edit Guide - The Overly-Detailed Asheron\'s Call Character Planner'
})
</script>

<template>
  <div>
    <div class="flex">
      <MyLink :href="`/guides/${route.params.id}`">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back to Guide
      </MyLink>
    </div>
    <div v-if="!user">
      You must be logged in to edit a Guide.
      <ButtonView>
        <NuxtLink href="/login">
          Log In
        </NuxtLink>
      </ButtonView>
    </div>
    <GuideEdit
      v-if="user"
      :id="route.params.id"
    />
  </div>
</template>
