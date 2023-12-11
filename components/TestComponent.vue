<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const props = defineProps(["build_id"])

const count = ref(0)
const { data, error } = await getNumFavorites(client, user, props.build_id)

</script>

<template>
  <div>
    Hello from TestComponent. Build ID is {{ props.build_id }}. Count is {{ count }}.
  </div>
</template>
