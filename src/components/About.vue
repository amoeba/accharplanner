<template>
  <div>
    <div class="main-pane">
      <div class="main-pane-header">
        <h3>About</h3>
      </div>
      <div class="main-pane-body">
        <p>
          The Overly-Detailed Asheron's Call Character Planner (ODACCP) was
          started as a reason to learn
          <a href="https://vuejs.org/">Vue.js</a> but has turned into a quite
          useful Asheron's Call character planner.
        </p>

        <h4>Credit</h4>
        <p>
          A big part of implementing this planner has been to understand the
          intricacies of game mechanics. Because the planner calculates so much
          of what you see in game, it has to get those mechanics implemented
          correctly.
        </p>
        <p>
          My thanks goes out to the dedicated developers who have helped me
          implement all of these mechanics including Virindi, hazridi, parad0x,
          Ripley, and Morosoity and many others I can't recall but really should
          thank.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>
