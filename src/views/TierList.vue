<script setup lang="ts">
import DialogWrapper from '@/components/DialogWrapper.vue'
import ElementDialog from '@/components/ElementDialog.vue'
import TierRow from '@/components/TierRow.vue'
import { closeDialog, openDialog } from '@/plugins/promise-dialog'
import { ref } from 'vue'
import draggable from 'vuedraggable'
import ContextMenu, { type ContextMenuItem, type ContextMenuResult } from '../components/ContextMenu.vue'
import TierElement from '../components/TierElement.vue'

interface TierRowData {
  id: string
  name: string
  elements: TierElementData[]
}

export interface TierElementData {
  id: string
  text?: string
  textColor?: string
  backgroundColor?: string
  imageUrl?: string
}

const tierRows = ref<TierRowData[]>([
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

const availableElements = ref<TierElementData[]>([])

const drag = ref(false)

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

async function openContextMenu(event: MouseEvent, tierElement: TierElementData) {
  let result = (await openDialog(ContextMenu, {items: contextMenuItems, event: event, context: tierElement})) as ContextMenuResult
  if(result.itemName !== undefined && result.context !== undefined) {
    contextMenuItemSelected(result.itemName, result.context)
  }
}

function closeContextMenu() {
  closeDialog()
}

function contextMenuItemSelected(name: string, tierElement: TierElementData) {
  if (name === 'Delete') {
    availableElements.value = availableElements.value.filter(
      (element) => element.id !== tierElement.id
    )
    tierRows.value.forEach((item) => {
      item.elements = item.elements.filter((element) => element.id !== tierElement.id)
    })
  } else if (name === 'Edit') {
    editTierElement(tierElement)
  }
}

async function addTierElement() {
  let result = (await openDialog(ElementDialog, { createElement: true })) as TierElementData
  if (result) {
    availableElements.value.push(result)
  }
}

async function editTierElement(element: TierElementData) {
  let result = (await openDialog(ElementDialog, {
    createElement: false,
    tierElement: element
  })) as TierElementData
  if (result) updateElement(result)
}

function updateElement(element: TierElementData) {
  // Find and update edited element
  let index = availableElements.value.findIndex((e) => e.id === element.id)
  if (index <= -1) {
    tierRows.value.forEach((row) => {
      index = row.elements.findIndex((e) => e.id === element.id)
      if (index >= 0) row.elements.splice(index, 1, element)
    })
  } else {
    availableElements.value.splice(index, 1, element)
  }
}
</script>

<template>
  <div>
    <!--- Tier rows -->
    <draggable
      class="bg-blue-500"
      :list="tierRows"
      item-key="id"
      :group="{ name: 'tier-rows' }"
      handle=".handle"
      ghost-class="bg-gray-500"
      animation="200"
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
              item-key="id"
              animation="200"
              :component-data="{
                name: 'tier-element',
                type: 'transition-group',
                class: 'flex flex-row w-full gap-1 flex-wrap items-start mx-1'
              }"
              @start="closeContextMenu"
            >
              <template #item="{ element }">
                <TierElement
                  :element="element"
                  @contextmenu.prevent="openContextMenu($event, element)"
                />
              </template>
            </draggable>
          </template>
        </TierRow>
      </template>
    </draggable>

    <!--- Available tier items -->
    <div class="mt-4 min-h-[7.0rem] border border-gray-300 bg-slate-200 p-4">
      <draggable
        :list="availableElements"
        item-key="id"
        :group="{ name: 'tier-elements' }"
        animation="300"
        :component-data="{
          name: 'available-element',
          class: 'flex flex-row flex-wrap items-center w-full h-full gap-3'
        }"
        @start="closeContextMenu"
      >
        <template #item="{ element }">
          <TierElement :element="element" @contextmenu.prevent="openContextMenu($event, element)" />
        </template>

        <template #footer>
          <div
            class="marker flex h-18 w-18 cursor-pointer items-center justify-center rounded border-2 border-gray-600 transition-transform hover:scale-105"
            @click="addTierElement"
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
      <DialogWrapper />
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
