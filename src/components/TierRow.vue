<script setup lang="ts">
import RowDialog from '@/components/dialogs/RowDialog.vue'
import ContextMenu, { type ContextMenuItem, type ContextMenuResult } from '@/components/dialogs/ContextMenu.vue'

interface Props {
  row: TierRow
  showHandle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showHandle: true,
})

const store = useEditorStore()
const { openDialog } = useDialog()

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

async function openContextMenu(event: MouseEvent, tierElement: TierRow) {
  event.preventDefault()

  const result = (await openDialog(ContextMenu, {
    items: contextMenuItems,
    event: event,
    context: tierElement,
  })) as ContextMenuResult

  if (result.itemName && result.context) {
    if (result.itemName === 'Delete') {
      store.deleteRow(result.context)
    } else if (result.itemName === 'Edit') {
      editRow(result.context)
    }
  }
}

async function editRow(row: TierRow) {
  const result = (await openDialog(RowDialog, { rowData: row })) as TierRow
  if (result) store.updateRow(result)
}
</script>

<template>
  <div
    class="box-content flex h-full min-h-[5rem] flex-row border-t-2 border-black bg-slate-600 first:border-t-0"
    @contextmenu="openContextMenu($event, row)"
  >
    <!-- Drag -->
    <!-- Handle class indicates the draggable library the area to drag on -->
    <div v-if="showHandle" class="handle flex w-10 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-5 w-5 fill-white">
        <path
          d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z"
        />
      </svg>
    </div>
    <!-- Name -->
    <div
      class="flex w-24 items-center justify-center break-all border-r-2 border-black p-4"
      :style="{
        backgroundColor: props.row.backgroundColor ?? '#2563eb',
      }"
    >
      <p
        contenteditable="plaintext-only"
        class="text-white outline-none"
        :style="{
          color: props.row.textColor ?? 'black',
        }"
      >
        {{ props.row.text }}
      </p>
    </div>
    <!-- Tier elements -->
    <slot name="elements" />
  </div>
</template>

<style scoped>
.tier-element-move {
  transition: transform 0.5s;
}
</style>
