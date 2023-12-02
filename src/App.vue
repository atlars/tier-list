<script setup lang="ts">
import draggable from 'vuedraggable'
import TierRow from '@/components/TierRow.vue'
import TierElement from './components/TierElement.vue'
import ContextMenu, { type ContextMenuItem } from './components/ContextMenu.vue'
import { ref } from 'vue'

const drag = ref(false)

interface TierRowData {
  id: number
  name: string
  elements: TierRowElementData[]
}

interface TierRowElementData {
  name: string
}

const items = ref<TierRowData[]>([
  {
    id: 0,
    name: 'Test 1',
    elements: [
      {
        name: 'Test1'
      },
      {
        name: 'Test2'
      }
    ]
  },
  {
    id: 1,
    name: 'Test 2',
    elements: []
  },
  {
    id: 2,
    name: 'Test 2',
    elements: []
  },
  {
    id: 3,
    name: 'Test 2',
    elements: []
  }
])

const availableElements = ref<TierRowElementData[]>([
  {
    name: 'Test123'
  },
  {
    name: 'Test1234'
  },
  {
    name: 'Test1234'
  },
  {
    name: 'Test12345'
  },
  {
    name: 'Test126'
  },
  {
    name: 'Test12347'
  }
])

const contextMenu = ref<InstanceType<typeof ContextMenu> | null>(null)

const contextMenuItems: ContextMenuItem[] = [
  {
    name: "Edit",
    icon: "edit"
  },
  {
    name: "Delete",
    icon: "delete"
  }
]

function openContextMenu(event: MouseEvent) {
  contextMenu.value?.open(event)
}
</script>

<template>
  <main class="mx-2 my-4">
    <h1 class="text-2xl font-bold text-slate-700">Create tierlist</h1>
    <draggable
      class="bg-blue-500"
      :list="items"
      item-key="id"
      :group="{ name: 'tiers' }"
      handle=".handle"
      ghost-class="bg-gray-500"
      animation="300"
      :component-data="{
        name: !drag ? 'flip-list' : null,
        type: 'transition-group',
        class: drag
          ? 'flex flex-col cursor-move gap-1 bg-slate-800'
          : 'flex flex-col gap-1 bg-slate-800'
      }"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <TierRow :name="element.name">
          <template #elements>
            <draggable
              :list="element.elements"
              :group="{ name: 'test' }"
              item-key="name"
              animation="300"
              :component-data="{
                name: 'tier-element',
                type: 'transition-group',
                class: 'flex flex-row w-full gap-1 flex-wrap items-center mx-1'
              }"
            >
              <template #item>
                <TierElement @contextmenu.prevent="openContextMenu" />
              </template>
            </draggable>
          </template>
        </TierRow>
      </template>
    </draggable>

    <h1 class="text-xl">Available elements</h1>
    <div class="bg-slate-200 p-4 min-h-[6.5rem]">
      <draggable
      :list="availableElements"
      item-key="name"
      :group="{ name: 'test' }"
      animation="300"
      :component-data="{
        name: 'available-element',
        class: 'flex flex-row w-full gap-2'
      }"
    >
      <template #item>
        <TierElement @contextmenu.prevent="openContextMenu"/>
      </template>
    </draggable>
    </div>
    
    <div>
      <ContextMenu ref="contextMenu" :items="contextMenuItems" menu-id="context-menu"/>
    </div>
  </main>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.tier-element-move {
  transition: transform 0.5s;
}

.available-element-move {
  transition: transform 0.5s;
}
</style>
