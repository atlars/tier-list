<script setup lang="ts">
import TierElement from '@/components/TierElement.vue'
import TierRow from '@/components/TierRow.vue'
import ContextMenu, {
type ContextMenuItem,
type ContextMenuResult
} from '@/components/dialogs/ContextMenu.vue'
import ElementDialog from '@/components/dialogs/ElementDialog.vue'
import RowDialog from '@/components/dialogs/RowDialog.vue'
import { LocalStorageKeys } from '@/constants'
import { closeDialog, openDialog } from '@/plugins/promise-dialog'
import DialogWrapper from '@/plugins/promise-dialog/DialogWrapper.vue'
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import draggable from 'vuedraggable'

export interface TierRowData {
  id: string
  text: string
  textColor?: string
  backgroundColor?: string
  elements: TierElementData[]
}

export interface TierElementData {
  id: string
  text?: string
  textColor?: string
  backgroundColor?: string
  imageUrl?: string
}

const tierRows = useStorage<TierRowData[]>(LocalStorageKeys.TierRows, [])
const availableElements = useStorage<TierElementData[]>(LocalStorageKeys.AvailableTierElements, [])

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

async function openRowContextMenu(event: MouseEvent, tierElement: TierRowData) {
  event.preventDefault()

  let result = (await openDialog(ContextMenu, {
    items: contextMenuItems,
    event: event,
    context: tierElement
  })) as ContextMenuResult

  if (result.itemName && result.context) {
    if (result.itemName === 'Delete') {
      deleteRow(result.context)
    } else if (result.itemName === 'Edit') {
      editRow(result.context)
    }
  }
}

async function openElementContextMenu(event: MouseEvent, tierElement: TierElementData) {
  event.preventDefault()
  event.stopPropagation()

  let result = (await openDialog(ContextMenu, {
    items: contextMenuItems,
    event: event,
    context: tierElement
  })) as ContextMenuResult

  if (result.itemName && result.context) {
    if (result.itemName === 'Delete') {
      deleteElement(result.context)
    } else if (result.itemName === 'Edit') {
      editElement(result.context)
    }
  }
}

async function addTierElement() {
  let result = (await openDialog(ElementDialog)) as TierElementData
  if (result) availableElements.value.push(result)
}

function deleteElement(element: TierElementData) {
  availableElements.value = availableElements.value.filter((e) => e.id !== element.id)
  tierRows.value.forEach((item) => {
    item.elements = item.elements.filter((e) => e.id !== element.id)
  })
}

function deleteRow(row: TierRowData) {
  let index = tierRows.value.findIndex((r) => r.id === row.id)
  if (index >= 0) tierRows.value.splice(index, 1)
}

async function editElement(element: TierElementData) {
  let result = (await openDialog(ElementDialog, {
    tierElement: element
  })) as TierElementData
  if (result) updateElement(result)
}

async function createRow() {
  let result = (await openDialog(RowDialog)) as TierRowData
  if (result) tierRows.value.push(result)
}

async function editRow(row: TierRowData) {
  let result = (await openDialog(RowDialog, { rowData: row })) as TierRowData
  if (result) updateRow(result)
}

function updateRow(row: TierRowData) {
  let index = tierRows.value.findIndex((r) => r.id === row.id)
  tierRows.value.splice(index, 1, row)
}

function updateElement(element: TierElementData) {
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

function resetTierElements() {
  tierRows.value.forEach((row) => {
    availableElements.value.push(...row.elements)
    row.elements = []
  })
}

function newFile() {
  tierRows.value = []
  availableElements.value = []
}

function closeActiveDialog() {
  closeDialog()
}

function onRowDragStart() {
  drag.value = true
  closeActiveDialog()
}
</script>

<template>
  <div class="mt-4 bg-white p-4 shadow-sm">
    <div class="my-4 flex gap-2 py-2">
      <!-- New row button -->
      <button
        type="button"
        @click="newFile"
        class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          class="me-1 h-5 w-5 fill-white"
        >
          <path
            d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
          />
        </svg>
        New
      </button>

      <!-- Download button -->
      <button
        type="button"
        class="rounded-lg bg-blue-600 p-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-5 w-5 fill-white">
          <path
            d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"
          />
        </svg>
      </button>

      <!-- Export button -->
      <button
        type="button"
        class="rounded-lg bg-blue-600 p-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg class="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path
            d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
          />
        </svg>
      </button>

      <!-- Reset elements button -->
      <button
        type="button"
        @click="resetTierElements"
        class="rounded-lg bg-blue-600 p-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-5 w-5 fill-white">
          <path
            d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"
          />
        </svg>
      </button>

      <div class="flex-1"></div>

      <!-- New row button -->
      <button
        type="button"
        class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="createRow"
      >
        <svg
          class="me-1 h-5 w-5 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
        Row
      </button>
    </div>

    <div class="my-2"></div>
    <!--- Tier rows -->
    <draggable
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
          ? 'flex flex-col cursor-move gap-[0.2rem] bg-gray-800'
          : 'flex flex-col gap-[0.2rem] bg-gray-800'
      }"
      @start="onRowDragStart"
      @end="drag = false"
    >
      <!--Tier elements of rows -->
      <template #item="{ element }">
        <TierRow :row="element" @contextmenu="openRowContextMenu($event, element)">
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
              @start="closeActiveDialog"
            >
              <template #item="{ element }">
                <TierElement
                  :element="element"
                  @contextmenu="openElementContextMenu($event, element)"
                />
              </template>
            </draggable>
          </template>
        </TierRow>
      </template>
    </draggable>

    <!--- Available tier items -->
    <div class="mt-4 min-h-[7.0rem] border border-gray-200 bg-slate-50 p-4">
      <draggable
        :list="availableElements"
        item-key="id"
        :group="{ name: 'tier-elements' }"
        animation="300"
        :component-data="{
          name: 'available-element',
          class: 'flex flex-row flex-wrap items-center w-full h-full gap-3'
        }"
        @start="closeActiveDialog"
      >
        <template #item="{ element }">
          <TierElement :element="element" @contextmenu="openElementContextMenu($event, element)" />
        </template>

        <template #footer>
          <div
            class="marker group box-border flex h-20 w-20 cursor-pointer items-center justify-center rounded border-[1px] border-gray-600 transition-transform hover:border-[2px] hover:border-gray-800"
            @click="addTierElement"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 fill-gray-700 group-hover:fill-gray-800"
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
@/plugins/promise-dialog/promise-dialog
