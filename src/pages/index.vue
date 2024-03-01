<script setup lang="ts">
import draggable from 'vuedraggable'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue'
import ElementDialog from '@/components/dialogs/ElementDialog.vue'
import TierList from '@/components/TierList.vue'
import RowDialog from '@/components/dialogs/RowDialog.vue'
import { useEditorStore } from '@/stores/editor'
import { ToolbarItem } from '@/types/editor'

const store = useEditorStore()
const { editorTierList: list } = storeToRefs(store)

const { openDialog, closeDialog } = useDialog()

async function addTierElement() {
  const result = (await openDialog(ElementDialog)) as TierElement
  if (result) store.addElement(result)
}

async function createRow() {
  const result = (await openDialog(RowDialog)) as TierRow
  if (result) store.addRow(result)
}

function resetTierElements() {
  store.resetElements()
}

async function newFile() {
  const successful = (await openDialog(ConfirmDialog, {
    text: 'Are you sure?',
    subText: 'Your progress will be deleted',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  })) as boolean

  if (successful) store.resetList()
}

function toolbarItemClicked(item: ToolbarItem) {
  switch (item) {
    case ToolbarItem.NewFile:
      newFile()
      break
    case ToolbarItem.Save:
      break
    case ToolbarItem.Download:
      break
    case ToolbarItem.NewRow:
      createRow()
      break
    case ToolbarItem.ResetElements:
      resetTierElements()
      break
  }
}

function closeActiveDialog() {
  closeDialog()
}
</script>

<template>
  <div class="mt-4 bg-white p-4 shadow-sm">
    <EditorToolbar class="mt-4" @item-clicked="toolbarItemClicked" />

    <div class="my-8" />

    <TierList :list="list" />

    <!--- Available tier items -->
    <div class="mt-4 min-h-[7.0rem] border border-gray-200 bg-slate-50 p-4">
      <draggable
        :list="list.availableElements"
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
          <TierElement :element="element" />
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
.available-element-move {
  transition: transform 0.5s;
}
</style>
