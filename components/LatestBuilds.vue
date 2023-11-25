<script setup lang="ts">
const client = useSupabaseClient();

const getLastestBuilds = async function () {
  const { data, error } = await client.from("builds").select().limit(10).order('created_at')

  return { data, error };
}

const { data, error } = await getLastestBuilds();
</script>

<template>
  <TableWithName>
    <template #title>
      Latest Builds
    </template>
    <template #table>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stars</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="build in data"
            v-if="data"
          >
            <td class="px-2 py-1">
              <a
                class="text-blue-500 underline hover:no-underline"
                :href="'/' + build.id"
              >{{
                build.content.character.name }}</a>
            </td>
            <td class="px-2 py-1">
              ⭐️ 999
            </td>
            <td class="px-2 py-1">
              <span v-if="build.user_id">{{ build.user_id }}</span>
              <span v-else>Anonymous</span>
            </td>
          </tr>
          <tr v-else-if="error">
            <td
              class="px-2 py-1"
              colspan="3"
            >
              {{ error }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </TableWithName>
</template>
