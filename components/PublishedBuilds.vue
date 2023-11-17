<script setup lang="ts">
const client = useSupabaseClient();

const getPublishedBuilds = async function () {
  let { data, error } = await client
    .from("builds")
    .select(`
      id,
      content,
      created_at,
      profiles (
        name
      )
    `)
    .order("created_at")
    .eq("is_published", true)
    .limit(10)

  return {
    data, error
  };
}

const { data, error } = await getPublishedBuilds();
</script>

<template>
  <TableWithName>
    <template #title>Popular Builds</template>
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
          <tr v-if="data" v-for="build in data">
            <td class="px-2 py-1">
              <a class="text-blue-500 underline hover:no-underline" :href="'/' + build.id">{{ build.content.character.name
              }}</a>
            </td>
            <td class="px-2 py-1">⭐️ 999</td>
            <td class="px-2 py-1">
              <span v-if="build.profiles">{{ build.profiles.name }}</span>
              <span v-else>Anonymous</span>
            </td>
          </tr>
          <tr v-else-if="error">
            <td class="px-2 py-1" colspan="3">{{ error }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </TableWithName>
</template>
