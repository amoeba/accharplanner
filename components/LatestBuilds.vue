<script setup lang="ts">
const client = useSupabaseClient();

const { data, error } = await getLastestBuilds(client);
</script>

<template>
  <TableWithName>
    <template #title> Latest Builds </template>
    <template #table>
      <p v-if="data && data.length == 0">No builds found.</p>
      <p v-if="error">{{ error }}</p>
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
            <td class="px-2 py-1">
              <a class="text-blue-500 underline hover:no-underline" :href="'/' + build.id">{{ build.content.character.name
              }}</a>
            </td>
            <td class="px-2 py-1">⭐️ 999</td>
            <td class="px-2 py-1">
              <span v-if="build.user_id">{{ build.user_id }}</span>
              <span v-else>Anonymous</span>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </TableWithName>
</template>
