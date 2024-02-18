<script lang="ts" setup>
import ContextMenu, { type ContextMenuItem, type ContextMenuResult } from '@/components/dialogs/ContextMenu.vue'
import ElementDialog from '@/components/dialogs/ElementDialog.vue'

defineProps<{
  element: TierElement
}>()

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

async function openContextMenu(event: MouseEvent, tierElement: TierElement) {
  event.preventDefault()
  event.stopPropagation()

  const result = (await openDialog(ContextMenu, {
    items: contextMenuItems,
    event: event,
    context: tierElement,
  })) as ContextMenuResult

  if (result.itemName && result.context) {
    if (result.itemName === 'Delete') {
      store.deleteElement(result.context)
    } else if (result.itemName === 'Edit') {
      editElement(result.context)
    }
  }
}

async function editElement(element: TierElement) {
  const result = (await openDialog(ElementDialog, {
    tierElement: element,
  })) as TierElement
  if (result) store.updateElement(result)
}
</script>

<template>
  <div
    class="relative flex max-h-[8rem] min-h-[5rem] min-w-[5rem] max-w-[8rem] items-center justify-center hover:cursor-default"
    :style="{ backgroundColor: element.backgroundColor ?? '#5c7cff' }"
    @contextmenu="openContextMenu($event, element)"
  >
    <div
      class="break-all p-2 text-white"
      :class="[element.imageUrl ? 'absolute z-10' : '']"
      :style="{ color: element.textColor ?? 'black' }"
    >
      {{ element.text }}
    </div>
    <img
      v-if="element.imageUrl"
      class="max-h-[8rem] min-h-[5rem] min-w-[5rem] object-cover object-top"
      :src="element.imageUrl"
    >
  </div>
</template>
