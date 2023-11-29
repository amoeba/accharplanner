<script setup lang="ts">
import { usePlannerStore } from "~/stores/planner"

const client = useSupabaseClient()
const user = useSupabaseUser()
const store = usePlannerStore()

const isFavoriteInError = ref(false)
const defaultFavoriteTooltip = "Favorite this build."
const favoriteTooltip = ref(defaultFavoriteTooltip)
const isFavoriteInSuccess = ref(false)
const favoriteClass = computed(() => ({
  "stroke-red-600": isFavoriteInError.value,
  "hover:stroke-red-600": isFavoriteInError.value,
  "fill-red-600": isFavoriteInError.value,
  "hover:fill-red-600": isFavoriteInError.value,
  "stroke-black": !isFavoriteInError.value || !isFavoriteInSuccess.value,
  "stroke-green-600": isFavoriteInSuccess.value,
  "hover:stroke-green-600": isFavoriteInSuccess.value,
  "fill-green-600": isFavoriteInSuccess.value,
  "hover:fill-green-600": isFavoriteInSuccess.value,
}))

const doFavoriteBuild = async function () {
  isFavoriteInError.value = false
  favoriteTooltip.value = defaultFavoriteTooltip

  if (!user)
    return

  // TODO: make dynamic (get it from the store)
  const buildId = "OtFbpJEFl4"

  // Check if we've already favorited
  const { data: selectData, error: selectError } = await hasAlreadyFavorited(client, user, buildId)

  if (selectError) {
    isFavoriteInError.value = true
    favoriteTooltip.value = "Encountered an unexpected problem while trying to favorite this build. Please report this if you have a minute."

    return
  }

  if (selectData.length > 0) {
    isFavoriteInSuccess.value = true

    setTimeout(() => {
      isFavoriteInSuccess.value = false
    }, 3000)

    return
  }

  // Only now do we favorite
  const { data, error } = await favoriteBuild(client, user, buildId)

  if (error) {
    isFavoriteInError.value = true
    favoriteTooltip.value = "Encountered an unexpected problem while trying to favorite this build. Please report this if you have a minute."
  }
  else {
    isFavoriteInSuccess.value = true

    setTimeout(() => {
      isFavoriteInSuccess.value = false
    }, 3000)
  }
}

const doPublishBuild = async function () {
  console.log("publishBuild")

  const { data, error } = await publishBuild(client, user, store.build)
}
</script>

<template>
  <!-- TODO: Only allow Favorite when we're viewing a build -->
  <ButtonView v-if="user" v-tooltip="favoriteTooltip" @click="doFavoriteBuild">
    <svg
      xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="lucide lucide-star hover:fill-yellow-400 hover:stroke-yellow-400" :class="favoriteClass"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  </ButtonView>
  <ButtonView v-if="user" @click="doPublishBuild">
    <svg
      xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone"
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  </ButtonView>
</template>
