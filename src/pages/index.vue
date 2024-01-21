<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { toPng } from 'html-to-image'
import { ref } from 'vue'
import draggable from 'vuedraggable'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue'
import ContextMenu from '@/components/dialogs/ContextMenu.vue'
import ElementDialog from '@/components/dialogs/ElementDialog.vue'
import RowDialog from '@/components/dialogs/RowDialog.vue'
import { LocalStorageKeys } from '@/constants'
import type { ContextMenuItem, ContextMenuResult } from '~/components/dialogs/ContextMenu.vue'
import { ToolbarItem } from '@/types/editor'

const tierRows = useStorage<TierRowData[]>(LocalStorageKeys.TierRows, [])
const availableElements = useStorage<TierElementData[]>(LocalStorageKeys.AvailableTierElements, [])

const { openDialog, closeDialog } = useDialog()

const drag = ref(false)

const contextMenuItems: ContextMenuItem[] = [
  {
    name: 'Edit',
    icon: 'edit',
  },
  {
    name: 'Delete',
    icon: 'delete',
  },
]

const tierList = ref<HTMLElement | null>(null)

async function openRowContextMenu(event: MouseEvent, tierElement: TierRowData) {
  event.preventDefault()

  const result = (await openDialog(ContextMenu, {
    items: contextMenuItems,
    event: event,
    context: tierElement,
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

  const result = (await openDialog(ContextMenu, {
    items: contextMenuItems,
    event: event,
    context: tierElement,
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
  const result = (await openDialog(ElementDialog)) as TierElementData
  if (result) availableElements.value.push(result)
}

function deleteElement(element: TierElementData) {
  availableElements.value = availableElements.value.filter(e => e.id !== element.id)
  tierRows.value.forEach((item) => {
    item.elements = item.elements.filter(e => e.id !== element.id)
  })
}

function deleteRow(row: TierRowData) {
  const index = tierRows.value.findIndex(r => r.id === row.id)
  if (index >= 0) tierRows.value.splice(index, 1)
}

async function editElement(element: TierElementData) {
  const result = (await openDialog(ElementDialog, {
    tierElement: element,
  })) as TierElementData
  if (result) updateElement(result)
}

async function createRow() {
  const result = (await openDialog(RowDialog)) as TierRowData
  if (result) tierRows.value.push(result)
}

async function editRow(row: TierRowData) {
  const result = (await openDialog(RowDialog, { rowData: row })) as TierRowData
  if (result) updateRow(result)
}

function updateRow(row: TierRowData) {
  const index = tierRows.value.findIndex(r => r.id === row.id)
  tierRows.value.splice(index, 1, row)
}

function updateElement(element: TierElementData) {
  let index = availableElements.value.findIndex(e => e.id === element.id)
  if (index <= -1) {
    tierRows.value.forEach((row) => {
      index = row.elements.findIndex(e => e.id === element.id)
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

async function newFile() {
  const successful = (await openDialog(ConfirmDialog, {
    text: 'Are you sure?',
    subText: 'Your progress will be deleted',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  })) as boolean

  if (successful) {
    tierRows.value = []
    availableElements.value = []
  }
}

async function exportList() {
  if (!tierList.value) return

  const filter = (node: HTMLElement) => {
    // Do not render handle
    return !node.classList?.contains('handle')
  }

  const dataUrl = await toPng(tierList.value, {
    width: 1024,
    pixelRatio: 2,
    cacheBust: true,
    filter: filter,
  })

  const link = document.createElement('a')
  link.href = dataUrl
  link.download = 'captured_image.png'
  link.click()
}

function closeActiveDialog() {
  closeDialog()
}

function onRowDragStart() {
  drag.value = true
  closeActiveDialog()
}

function toolbarItemClicked(item: ToolbarItem) {
  switch (item) {
    case ToolbarItem.NewFile:
      newFile()
      break
    case ToolbarItem.Save:
      break
    case ToolbarItem.Download:
      exportList()
      break
    case ToolbarItem.NewRow:
      createRow()
      break
    case ToolbarItem.ResetElements:
      resetTierElements()
      break
  }
}
</script>

<template>
  <div class="mt-4 bg-white p-4 shadow-sm">
    <EditorToolbar class="mt-4" @item-clicked="toolbarItemClicked" />

    <div class="my-8" />

    <div ref="tierList" class="box-content">
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
          class: drag ? 'cursor-move' : '',
        }"
        @start="onRowDragStart"
        @end="drag = false"
      >
        <!-- Tier rows -->
        <template #item="{ element: tierRow }">
          <TierRow :row="tierRow" @contextmenu="openRowContextMenu($event, tierRow) ">
            <template #elements>
              <draggable
                :list="tierRow.elements"
                :group="{ name: 'tier-elements' }"
                item-key="id"
                animation="200"
                :component-data="{
                  name: 'tier-element',
                  type: 'transition-group',
                  class: 'flex flex-row w-full items-start flex-wrap',
                }"
                @start="closeActiveDialog"
              >
                <!-- Tier elements -->
                <template #item="{ element: tierElement }">
                  <TierElement :element="tierElement" @contextmenu="openElementContextMenu($event, tierElement)" />
                </template>
              </draggable>
            </template>
          </TierRow>
        </template>
      </draggable>
    </div>

    <!--- Available tier items -->
    <div class="mt-4 min-h-[7.0rem] border border-gray-200 bg-slate-50 p-4">
      <draggable
        :list="availableElements"
        item-key="id"
        :group="{ name: 'tier-elements' }"
        animation="300"
        :component-data="{
          name: 'available-element',
          class: 'flex flex-row flex-wrap items-center w-full h-full gap-3',
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
