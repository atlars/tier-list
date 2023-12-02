<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'

export interface ContextMenuItem {
  name: string
  type?: 'divider'
  icon?: 'edit' | 'delete'
}

interface ContextMenuProps {
  menuId: string
  items: ContextMenuItem[]
}

const props = defineProps<ContextMenuProps>()

const emit = defineEmits<{
  itemSelected: [name: string]
}>()

onMounted(() => {
    document.addEventListener('keyup', onEscKeyRelease)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onEscKeyRelease)
})

function onEscKeyRelease(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

function open(event: MouseEvent) {
  var menu = document.getElementById(props.menuId)
  if (!menu) return

  if (menu.offsetWidth + event.pageX >= window.innerWidth) {
    menu.style.left = event.pageX - menu.offsetWidth + 2 + 'px'
  } else {
    menu.style.left = event.pageX - 2 + 'px'
  }

  if (menu.offsetHeight + event.pageY >= window.innerHeight) {
    menu.style.top = event.pageY - menu.offsetHeight + 2 + 'px'
  } else {
    menu.style.top = event.pageY - 2 + 'px'
  }
  menu.style.display = 'block'
}

function close() {
  var menu = document.getElementById(props.menuId)
  if (menu) menu.style.display = 'none'
}

function menuItemClicked(name: string) {
  close()
  emit('itemSelected', name)
}

defineExpose({
  open,
  close
})
</script>

<template>
  <div
    class="fixed z-50 hidden cursor-default divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
    v-click-outside="close"
  >
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
      <li v-for="(item, index) in props.items" :key="index">
        <a
          class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          :class="{ 'flex items-center justify-start gap-1 ': item.icon }"
          @click="menuItemClicked(item.name)"
        >
          <span v-if="item.icon === 'edit'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="h-5 w-5 fill-gray-800"
            >
              <path
                d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
              />
            </svg>
          </span>
          <span v-else-if="item.icon === 'delete'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="h-5 w-5 fill-gray-800"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </span>
          <span v-html="item.name"></span>
        </a>
      </li>
    </ul>
  </div>
</template>
