<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-2">
    <div class="text-xl font-bold py-3">
      <span>Welcome to ODACCP!</span>
    </div>

    <div class="flex flex-col sm:flex-row">
      <Suspense>
        <PublishedBuilds :max="5" />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
      <Suspense>
        <LatestBuilds :max="5" />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </div>

    <div class="flex justify-center">
      <ButtonLink to="/planner">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-swords">
          <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
          <line x1="13" x2="19" y1="19" y2="13" />
          <line x1="16" x2="20" y1="16" y2="20" />
          <line x1="19" x2="21" y1="21" y2="19" />
          <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
          <line x1="5" x2="9" y1="14" y2="18" />
          <line x1="7" x2="4" y1="17" y2="20" />
          <line x1="3" x2="5" y1="19" y2="21" />
        </svg>
        Enter the Planner
      </ButtonLink>
    </div>

    <p>
      The Overaly-Detailed Asheron's Call Character Planner (ODACCP) is hopefully the most advanced
      <NuxtLink to="https://en.wikipedia.org/wiki/Asheron%27s_Call">
        Asheron's Call
      </NuxtLink>
      character planner you'll ever use. It aims to be as useful as other character planners you may have seen or used
      before while also offering much, much more.
    </p>

    <p>It's key features beyond traditional planners include:</p>

    <ul>
      <li>
        See the effect of:
        <ul>
          <li>Buffs</li>
          <li>Experience Augmentations</li>
          <li>Auras</li>
          <li>Items</li>
          <li>Armor Sets</li>
          <li>Enlightenment</li>
        </ul>
      </li>
      <li>Snapshot your build into multiple Stages to show your build's progression as it levels</li>
      <li>
        Automatically save your progress and even export your <NuxtLink to="/builds">
          Builds
        </NuxtLink> locally
      </li>
      <li>
        Publish your <NuxtLink to="/builds">
          Builds
        </NuxtLink> for others to discover
      </li>
      <li>
        Create detailed <NuxtLink to="/guides">
          Guides
        </NuxtLink> for your Builds
      </li>
    </ul>
  </div>
</template>
