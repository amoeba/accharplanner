<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const props = defineProps<{ buildId: string }>()
const userHasAlreadyFavorited = ref(false)
const count = ref(0)

const favoriteClass = computed(() => ({
  "fill-yellow-400": userHasAlreadyFavorited.value,
  "stroke-yellow-400": userHasAlreadyFavorited.value,
}))

const doFavoriteBuild = async function () {
  if (!user.value) {
    router.push("/login")

    return
  }

  if (!props.buildId) {
    return
  }

  // Check if we've already favorited
  const { count: hasAlreadyFavoritedCount } = await hasAlreadyFavorited(client, user, props.buildId)

  if (hasAlreadyFavoritedCount && hasAlreadyFavoritedCount > 0) {
    userHasAlreadyFavorited.value = true;

    return
  }

  // Only now do we favorite
  const { error } = await favoriteBuild(client, user, props.buildId)

  if (!error) {
    const { count: getNumFavoritesCount } = await getNumFavorites(client, props.buildId)
    count.value = getNumFavoritesCount || 0
  }
}

const doUnFavoriteBuild = async function () {
  if (!user) {
    return
  }

  if (!props.buildId) {
    return
  }

  const { error: unfavoriteError } = await unFavoriteBuild(client, user, props.buildId)

  if (!unfavoriteError) {
    const { data, count: favoriteCount } = await getNumFavorites(client, props.buildId)

    if (data) {
      count.value = favoriteCount || 0
    }
  }
}

const handleClick = async function () {
  if (userHasAlreadyFavorited.value) {
    await doUnFavoriteBuild()
  } else {
    await doFavoriteBuild()
  }
}

const { count: numFavorites } = await getNumFavorites(client, props.buildId)

if (numFavorites) {
  count.value = numFavorites
}
</script>

<template>
  <div class="inline-flex items-center gap-2 divide-x rounded border">
    <button
      class="flex items-center gap-2 px-2 py-1"
      @click="handleClick"
    >
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
        :class="favoriteClass"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        />
      </svg>
      <span v-if="userHasAlreadyFavorited">
        Unstar
      </span>
      <span v-else>Star</span>
    </button>
    <div class="px-2 py-1">
      {{ count }}
    </div>
  </div>
</template>
