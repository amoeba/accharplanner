<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="text-xl font-bold py-3">
    Welcome to ODACCP!
  </div>
  <Features class="py-3"></Features>

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
          <tr>
            <td>Some Name</td>
            <td>999</td>
            <td>User</td>
          </tr>
          <tr>
            <td>Some Name</td>
            <td>999</td>
            <td>User</td>
          </tr>
          <tr>
            <td>Some Name</td>
            <td>999</td>
            <td>User</td>
          </tr>
          <tr>
            <td>Some Name</td>
            <td>999</td>
            <td>User</td>
          </tr>
          <tr>
            <td>Some Name</td>
            <td>999</td>
            <td>User</td>
          </tr>
        </tbody>
      </table>
    </template>
  </TableWithName>

  <TableWithName>
    <template #title>Recent Builds</template>
    <template #table>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Some Name</td>
            <td>666 minutes ago</td>
            <td>User</td>
          </tr>
          <tr>
            <td>Some Name</td>
            <td>666 minutes ago</td>
            <td>User</td>
          </tr>
          <tr>
            <td>Some Name</td>
            <td>666 minutes ago</td>
            <td>User</td>
          </tr>
          <tr>
            <td>Some Name</td>
            <td>666 minutes ago</td>
            <td>User</td>
          </tr>
          <tr>
            <td>Some Name</td>
            <td>666 minutes ago</td>
            <td>User</td>
          </tr>
        </tbody>
      </table>
    </template>
  </TableWithName>
</template>
