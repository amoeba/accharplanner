<script setup lang="ts">
import Stage from './Stage.vue'
import { usePlannerStore } from '~/stores/planner'

const store = usePlannerStore()

const save = async function (event: MouseEvent) {
  event.stopPropagation()

  store.saveStage()
}

const toggleExpanded = async function () {
  store.toggleBuildStagesPane()
}

// Drag and Drop
const dragstart = async function (e: DragEvent) {
  if (!e.dataTransfer)
    return

  if (!e.target || !e.target.dataset)
    return

  e.dataTransfer.setData('text/plain', e.target.dataset.index)
  e.dataTransfer.dropEffect = 'move'
}

const dragover = async function (e: DragEvent) {
  // Critical to keep this in
  e.preventDefault()
}

const update = async function (index: number, clientX: number) {
  const stages = [
    {
      index,
      x: clientX,
    },
  ]

  // TODO: Convert to a ref instead of document.querySelectorAll
  document.querySelectorAll('div.stage').forEach((el, i) => {
    if (i === index)
      return

    stages.push({
      index: i,
      x: el.getBoundingClientRect().x,
    })
  })

  stages.sort((a, b) => {
    return a.x - b.x
  })

  const indices = stages.map(s => s.index)

  // Don't re-order if no re-order happened. Do that by making sure
  // the indices are monotonically increasing
  if (valuesMatchIndicies(indices))
    return

  store.reorderStages(indices)
}

function drop(e: DragEvent) {
  if (!e.currentTarget)
    return

  // Adjust client X by half the drag target's width. This makes
  // drag and drop match the user's expectation more closely
  const adjustedClientX = e.clientX - e.currentTarget.clientWidth / 2
  const index = Number(e.dataTransfer?.getData('text/plain'))

  update(index, adjustedClientX)
}
</script>

<template>
  <CollapsiblePane
    :toggle-expanded="toggleExpanded"
    :is-expanded="store.ui.paneVisibility.buildStages"
  >
    <template #title>
      Build Stages
      <span
        v-tooltip="
          'Stages are useful if your build has a progression based on level or experience and you want to see what the build loos like at each of those points. You can edit an already-saved stage by clicking it to select it and then using the Planner as normal.'
        "
        class="px-2 text-zinc-400 font-normal"
      >?</span>
    </template>
    <template #right />
    <template #content>
      <div class="flex w-full">
        <div v-if="store.build.stages.length === 0">
          No stages have been set up for this build.
        </div>
        <Stage
          v-for="(stage, index) in store.build.stages"
          :key="index"
          class="stage"
          :index="index"
          :level="stage.level"
          :data-index="index"
          :stages="store.build.stages.length"
          :draggable="true"
          @dragstart="dragstart"
          @dragover="dragover"
          @drop="drop"
        />
        <ButtonView class="ml-2 px-1 py-1 text-xs" @click="save">
          + Stage
        </ButtonView>
      </div>
    </template>
  </CollapsiblePane>
</template>
