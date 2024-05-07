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
        <LoginEmail />
      </div>
    </div>
  </NarrowPageContainer>
</template>
