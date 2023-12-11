<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const props = defineProps<{ id: string }>()
const count = ref(0)

const favoriteClass = computed(() => ({
  "fill-yellow-400": count.value > 0,
  "stroke-yellow-400": count.value > 0,
}))

const doFavoriteBuild = async function () {
  if (count.value > 0) {
    return
  }

  if (!user) {
    return
  }

  if (!props.id) {
    return
  }

  // Check if we've already favorited
  const { data: selectData, error: selectError } = await hasAlreadyFavorited(client, user, props.id)

  if (selectError) {
    return
  }

  if (selectData.length > 0) {
    return
  }

  // Only now do we favorite
  const { data, error } = await favoriteBuild(client, user, props.id)

  if (!error) {
    count.value = await getNumFavorites(client, user, props.id)
  }
}

const doUnFavoriteBuild = async function () {
  if (!user) {
    return
  }

  if (!props.id) {
    return
  }

  const { data, error } = await unFavoriteBuild(client, user, props.id)

  if (!error) {
    count.value = await getNumFavorites(client, user, props.id)
  }
}

const handleClick = async function () {
  if (count.value > 0) {
    await doUnFavoriteBuild(client, user, props.id)
  }
  else {
    await doFavoriteBuild(client, user, props.id)
  }
}
count.value = await getNumFavorites(client, user, props.id)
</script>

<template>
  <div class="inline-flex items-center border divide-x rounded gap-2">
    <button class="flex items-center gap-2 px-2 py-1" @click="handleClick">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star" :class="favoriteClass">
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span v-if="count > 0">
        Unstar
      </span>
      <span v-if="count === 0">Star</span>
    </button>
    <div class="px-2 py-1">
      {{ count }}
    </div>
  </div>
</template>
