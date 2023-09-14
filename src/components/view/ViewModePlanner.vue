<script setup lang="ts">
import { ref } from "vue";

enum Tab {
  Attributes = "Attributes",
  Skills = "Skills",
  Augmentations = "Augmentations",
  Auras = "Auras",
}

const currentTab = ref(Tab.Attributes);

function changeTab(e: Event) {
  currentTab.value = e.target.dataset.tabId;
}
</script>

<template>
  <div>
    <div class="tab-container">
      <div class="tabs">
        <div v-for="(id, idx) in Object.keys(Tab)" @click="changeTab" :data-tab-id="id" class="tab">
          {{ Tab[id] }}
        </div>
      </div>
      <div class="tab-contents">
        <div v-show="currentTab == Tab.Attributes" class="tab-content">
          Content for Attributes
        </div>
        <div v-show="currentTab == Tab.Skills" class="tab-content">
          Content for Skills
        </div>
        <div v-show="currentTab == Tab.Augmentations" class="tab-content">
          Content for Augmentations
        </div>
        <div v-show="currentTab == Tab.Auras" class="tab-content">
          Content for Auras
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
}

.tab {
  cursor: pointer;
  padding: 1.5em;
  border: 1px solid red;
}

.tab:hover {
  background-color: red;
}

.tab-contents {
  border: 1px solid black;
}

.tab-content {
  padding: 1.5em;
}
</style>
