<script setup lang="ts">
import draggable from 'vuedraggable'
import TierRow from '@/components/TierRow.vue'
import TierElement from '../components/TierElement.vue'
import ContextMenu, { type ContextMenuItem } from '../components/ContextMenu.vue'
import { ref } from 'vue'
import ElementDialog from '@/components/ElementDialog.vue'

interface TierRowData {
  id: string
  name: string
  elements: TierElementData[]
}

export interface TierElementData {
  id: string
  name?: string
  color?: string
  imageUrl?: string
}

const items = ref<TierRowData[]>([
  {
    id: '0',
    name: 'Test 1',
    elements: []
  },
  {
    id: '1',
    name: 'Test 2',
    elements: []
  },
  {
    id: '2',
    name: 'Test 2',
    elements: []
  },
  {
    id: '3',
    name: 'Test 2',
    elements: []
  }
])

const availableElements = ref<TierElementData[]>([
  {
    id: '0',
    name: 'Test123'
  },
  {
    id: '1',
    name: 'Test1234'
  },
  {
    id: '2',
    name: 'Test1234'
  },
  {
    id: '3',
    name: 'Test12345'
  },
  {
    id: '4',
    name: 'Test126'
  },
  {
    id: '5',
    name: 'Test12347'
  }
])

const drag = ref(false)

const contextMenu = ref<InstanceType<typeof ContextMenu> | null>(null)
const elementDialog = ref<InstanceType<typeof ElementDialog> | null>(null)

const contextMenuItems: ContextMenuItem[] = [
  {
    name: 'Edit',
    icon: 'edit'
  },
  {
    name: 'Delete',
    icon: 'delete'
  }
]

function openContextMenu(event: MouseEvent, itemId: string) {
  contextMenu.value?.open(event, itemId)
}

function contextMenuItemSelected(name: string, context: string) {
  if (name === 'Delete') {
    availableElements.value = availableElements.value.filter((element) => element.id !== context)
    items.value.forEach((item) => {
      item.elements = item.elements.filter((element) => element.id !== context)
    })
  }
}
</script>

<template>
  <div>
    <!--- Tier rows -->
    <draggable
      class="bg-blue-500"
      :list="items"
      item-key="id"
      :group="{ name: 'tier-rows' }"
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
      <!--Tier elements of rows -->
      <template #item="{ element }">
        <TierRow :name="element.name">
          <template #elements>
            <draggable
              :list="element.elements"
              :group="{ name: 'tier-elements' }"
              item-key="name"
              animation="300"
              :component-data="{
                name: 'tier-element',
                type: 'transition-group',
                class: 'flex flex-row w-full gap-1 flex-wrap items-center mx-1'
              }"
            >
              <template #item>
                <TierElement @contextmenu.prevent="openContextMenu($event, element.id)" />
              </template>
            </draggable>
          </template>
        </TierRow>
      </template>
    </draggable>

    <!--- Available tier items -->
    <div class="mt-4 min-h-[6.5rem] border border-gray-300 bg-slate-200 p-4">
      <draggable
        :list="availableElements"
        item-key="name"
        :group="{ name: 'tier-elements' }"
        animation="300"
        :component-data="{
          name: 'available-element',
          class: 'flex flex-row flex-wrap items-center w-full gap-3'
        }"
      >
        <template #item="{ element }">
          <TierElement @contextmenu.prevent="openContextMenu($event, element.id)" />
        </template>

        <template #footer>
          <div
            class="marker flex h-16 w-16 cursor-pointer items-center justify-center rounded border-2 border-gray-600 transition-transform hover:scale-105"
            @click="elementDialog?.open"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 fill-gray-800"
              viewBox="0 -960 960 960"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </div>
        </template>
      </draggable>
    </div>

    <!-- Dialogs -->
    <div>
      <ElementDialog ref="elementDialog" />
      <ContextMenu
        ref="contextMenu"
        :items="contextMenuItems"
        menu-id="context-menu"
        @itemSelected="contextMenuItemSelected"
      />
    </div>
  </div>
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
