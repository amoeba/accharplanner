<script setup lang="ts">
</script>

<template>
  <NarrowPageContainer>
    <h2
      class="text-lg font-bold"
    >
      Log In
    </h2>
    <div class="flex flex-col">
      <p class="py-2">
        Log in with email and password or <NuxtLink to="/register">
          create an acccount
        </NuxtLink>.
      </p>
      <LoginPassword />
      <!-- OR -->
      <div>
        <div class="flex py-2">
          <div class="flex grow flex-col">
            <div class="grow" />
            <div class="h-1 bg-gray-200" />
            <div class="grow" />
          </div>
          <div class="px-2">
            OR
          </div>
          <div class="flex grow flex-col">
            <div class="grow" />
            <div class="h-1 bg-gray-200" />
            <div class="grow" />
          </div>
        <!-- /OR -->
        </div>
        <p class="py-2">
          Log in with a magic link sent to your email address:
        </p>
        <LoginEmail />
      </div>
    </div>
  </NarrowPageContainer>
</template>
