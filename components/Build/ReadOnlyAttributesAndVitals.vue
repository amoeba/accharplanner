<script setup lang="ts">
const props = defineProps(['build'])
</script>

<template>
  <div>
    <div class="grid grid-cols-[25px_auto_40px] gap-1 w-72">
      <div>
        <img src="/icons/strength.png" width="25" height="25" style="clip-path: circle(50%)">
      </div>
      <div>Strength</div>
      <div class="text-right">
        {{ props.build.character.attributes.strength.creation }}
      </div>
      <div>
        <img src="/icons/endurance.png" width="25" height="25" style="clip-path: circle(50%)">
      </div>
      <div>Endurance</div>
      <div class="text-right">
        {{ props.build.character.attributes.endurance.creation }}
      </div>
      <div>
        <img src="/icons/coordination.png" width="25" height="25" style="clip-path: circle(50%)">
      </div>
      <div>Coordination</div>
      <div class="text-right">
        {{ props.build.character.attributes.coordination.creation }}
      </div>
      <div>
        <img src="/icons/quickness.png" width="25" height="25" style="clip-path: circle(50%)">
      </div>
      <div>Quickness</div>
      <div class="text-right">
        {{ props.build.character.attributes.quickness.creation }}
      </div>
      <div>
        <img src="/icons/focus.png" width="25" height="25" style="clip-path: circle(50%)">
      </div>
      <div>Focus</div>
      <div class="text-right">
        {{ props.build.character.attributes.focus.creation }}
      </div>
      <div>
        <img src="/icons/self.png" width="25" height="25" style="clip-path: circle(50%)">
      </div>
      <div>Self</div>
      <div class="text-right">
        {{ props.build.character.attributes.self.creation }}
      </div>
      <div>
        <img src="/icons/health.png" width="25" height="25" style="clip-path: circle(50%)">
      </div>
      <div>Health</div>
      <div class="text-right">
        {{ props.build.character.attributes.endurance.creation / 2 }}
      </div>
      <div>
        <img src="/icons/stamina.png" width="25" height="25" style="clip-path: circle(50%)">
      </div>
      <div>Stamina</div>
      <div class="text-right">
        {{ props.build.character.attributes.endurance.creation }}
      </div>
      <div>
        <img src="/icons/mana.png" width="25" height="25" style="clip-path: circle(50%)">
      </div>
      <div>Mana</div>
      <div class="text-right">
        {{ props.build.character.attributes.self.creation }}
      </div>
    </div>
  </div>
</template>
