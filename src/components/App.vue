<template>
  <div id="app">
    <Notifications />
    <header>
      <div class="logo">
        <a href="/"><img src="/img/logo.svg" width="32" height="32" alt="Overly-Detailed Asheron's Call Character Planner (ODAACP)"></a>
      </div>
      <nav>
        <router-link class="selected" to="/">
          Planner
        </router-link>
        <router-link to="/builds">
          Builds
        </router-link>
        <router-link to="/import">
          Import
        </router-link>
      </nav>
    </header>
    <content>
      <router-view></router-view>
    </content>
  </div>
</template>

<script>
import Notifications from "./Notifications";

export default {
  name: "App",
  components: {
    Notifications
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
}

/* General stuff */
table {
  width: 100%;
}

input,
select,
button {
  font-size: 100%;
  background-color: white;
  border: 1px solid #CCC;
  border-radius: 3px;
}

button {
  background-color: #ccc;
  border: 1px solid #bbb;
}

table {
  border-collapse: collapse;
  margin: 0;
}

td,
th {
  padding: 1px 3px;
  text-align: left;
  white-space: nowrap;
  height: 30px;
}

#planner img {
  clip-path: circle(10px at center);
}

h1, h2, h3, h4, h5 {
  margin: 0;
  font-weight: 500;
}

a,
a:visited {
  color: blue;
  text-decoration: none;
}

header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #CCC;
  padding: 0 0.5rem;
}

header > div:last-child {
  text-align: right;
}

header > div:last-child a {
  margin-left: 0.5rem;
}

header a,
header a:visited {
  color: black;
  text-decoration: none;
}

header .logo {
  margin-right: 0.5rem;
}

nav {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

nav a {
  margin-right: 0.25rem;
  padding: 0.75rem 0.5rem;
}

nav .router-link-exact-active {
  border-bottom: 2px solid #000066;
}

a.link-discord,
a:visited.link-discord {
  color: rgb(95, 114, 209);
}

a.link-github,
a:visited.link-github {
  color: black;
}

/* Utility classes */
.error {
  color: red;
}

.center {
  text-align: center;
}

.red {
  color: red;
}

.gray {
  color: gray;
}

.right {
  text-align: right;
}

.inline {
  display: inline-block;
}

/* Notifications */
#notifications {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  margin: 0;
  padding: 0;
}

.notification {
  position: relative;
  color: white;
  width: 90%;
  margin: 0.5rem auto;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
}

.notification.success {
  border: 1px solid green;
  background-color: rgba(0, 150, 0, 0.95);
}

.notification.info {
  border: 1px solid yellow;
  background-color: rgba(200, 200, 0, 0.95);
  color: black;
}

.notification.error {
  border: 1px solid red;
  background-color: rgba(150, 0, 0, 0.9);
}
</style>
