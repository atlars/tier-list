<script setup lang="ts">
import DialogWrapper from '@/components/DialogWrapper.vue'
import ElementDialog from '@/components/ElementDialog.vue'
import TierRow from '@/components/TierRow.vue'
import { closeDialog, openDialog } from '@/plugins/promise-dialog'
import { ref } from 'vue'
import draggable from 'vuedraggable'
import ContextMenu, {
  type ContextMenuItem,
  type ContextMenuResult
} from '../components/ContextMenu.vue'
import TierElement from '../components/TierElement.vue'
import RowDialog from '@/components/RowDialog.vue'

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

const tierRows = ref<TierRowData[]>([])

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

function closeActiveDialog() {
  closeDialog()
}

function onRowDragStart() {
  drag.value = true
  closeActiveDialog()
}
</script>

<template>
  <div>
    <button
      type="button"
      class="me-2 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
    <div class="my-2"></div>
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
        @start="closeActiveDialog"
      >
        <template #item="{ element }">
          <TierElement :element="element" @contextmenu="openElementContextMenu($event, element)" />
        </template>

        <template #footer>
          <div
            class="group marker box-border flex h-20 w-20 cursor-pointer items-center justify-center rounded border-[1px] border-gray-700 transition-transform hover:border-[2px] hover:border-gray-800"
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
