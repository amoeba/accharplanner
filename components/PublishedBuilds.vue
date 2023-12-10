<script setup lang="ts">
const client = useSupabaseClient()
const props = defineProps<{ max: number }>()

const { data, error } = await getPublishedBuilds(client, props.max || 10)
</script>

<template>
  <TableWithName>
    <template #title>
      Published Builds
    </template>
    <template #table>
      <p v-if="data && data.length === 0">
        No builds found.
      </p>
      <p v-if="error">
        {{ error }}
      </p>
      <table v-if="data && data.length > 0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stars</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="build in data" :key="build.id">
            <td class="p-0">
              <a class="text-blue-500 underline hover:no-underline" :href="`/${build.id}`">{{
                build.content.character.name
              }}</a>
            </td>
            <td class="p-0">
              <div class="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-star fill-yellow-400 stroke-yellow-400">
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {{ build.builds_favorites.length }}
              </div>
            </td>
            <td class="p-0">
              <span v-if="build.profiles">{{ build.profiles.name }}</span>
              <span v-else>Anonymous</span>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </TableWithName>
</template>
