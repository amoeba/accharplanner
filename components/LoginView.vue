<template>
  <div>
    <h2 class="text-xl font-bold">
      Log In
    </h2>
    <p class="py-2">
      Choose a method to log in:
    </p>
    <div class="flex flex-col gap-4 divide-y">
      <div>
        <NuxtLink
          class="flex w-full rounded border px-2 py-1 text-center hover:bg-zinc-100"
          to="/login/email"
        >
          Link
        </NuxtLink>
      </div>
      <div>
        <p class="py-2">
          or log in with Email and Password
        </p>
        <NuxtLink
          class="flex w-full rounded border px-2 py-1 text-center hover:bg-zinc-100"
          to="/login/register"
        >
          Register New Account
        </NuxtLink>
        <form class="flex flex-col gap-2">
          <label>
            Email
            <input
              type="text"
              class="rounded border px-2 py-1"
            >
          </label>
          <label>
            Password
            <input
              type="text"
              class="rounded border px-2 py-1"
            >
          </label>
          <input
            type="submit"
            class="rounded border px-2 py-1 hover:bg-zinc-100"
            value="Log In"
          >
        </form>
      </div>
    </div>
  </div>
</template>
