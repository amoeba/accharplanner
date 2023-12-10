<script setup lang="ts">
import { ref } from 'vue'

const isAdmin = ref(false)

const user = useSupabaseUser()
isAdmin.value = user.value?.user_metadata.is_admin
</script>

<template>
  IsAdmin? {{ isAdmin }}
</template>
