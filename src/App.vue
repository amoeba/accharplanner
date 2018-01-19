<template>
  <div id="app">
    <router-link to="/">Planner</router-link>
    <router-link to="/about">About</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: sans-serif;
  color: #2c3e50;
}
</style>
