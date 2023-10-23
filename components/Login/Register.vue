<script setup lang="ts">

</script>

<template>
  <div>
    <h2 class="text-xl font-bold">Register</h2>
    <form class="flex flex-col gap-2">
      <label>
        Email
        <input type="text" class="border rounded p-2" />
      </label>
      <label>
        Password
        <input type="text" class="border rounded p-2" />
      </label>
      <input type="submit" class="border rounded p-2 hover:bg-zinc-100" value="Register" />
    </form>
  </div>
</template>