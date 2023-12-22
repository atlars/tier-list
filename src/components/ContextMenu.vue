<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { onBeforeUnmount, onMounted, ref } from 'vue';

export interface ContextMenuItem {
  name: string
  icon?: 'edit' | 'delete'
}

const props = defineProps<{
  items: ContextMenuItem[]
}>()

const emit = defineEmits<{
  itemSelected: [name: string, context: any]
}>()

const isVisible = ref(false)
// Unique identifier for the active context menu
const context = ref<any>(null)
const top = ref(0)
const left = ref(0)
const menu = ref<HTMLElement | null>(null)

onMounted(() => {
  document.addEventListener('keyup', onEscKeyRelease)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onEscKeyRelease)
})

function onEscKeyRelease(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

function open(event: MouseEvent, menuContext: any) {
  if (!menu.value) return

  if (top.value <= 0 || left.value <= 0) {
    menu.value.style.visibility = 'hidden'
    menu.value.style.display = 'block'
    menu.value.removeAttribute('style')
  }

  if (menu.value.offsetWidth + event.pageX >= window.innerWidth) {
    left.value = event.pageX - menu.value.offsetWidth + 2
  } else {
    left.value = event.pageX - 2
  }

  if (menu.value.offsetHeight + event.pageY >= window.innerHeight) {
    top.value = event.pageY - menu.value.offsetHeight + 2
  } else {
    top.value = event.pageY - 2
  }

  isVisible.value = true
  context.value = menuContext
}

function close() {
  isVisible.value = false
  top.value = 0
  left.value = 0
}

function menuItemClicked(name: string) {
  emit('itemSelected', name, context.value)
  close()
}

onClickOutside(menu, close)

defineExpose({
  open,
  close
})
</script>

<template>
  <div
    class="fixed z-50 cursor-default divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
    :style="{ top: top + 'px', left: left + 'px' }"
    ref="menu"
    v-show="isVisible"
  >
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
      <li v-for="(item, index) in props.items" :key="index">
        <a
          class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          :class="{ 'flex items-center justify-start gap-1 ': item.icon }"
          @click.prevent="menuItemClicked(item.name)"
        >
          <span v-if="item.icon === 'edit'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="h-5 w-5 fill-gray-800 dark:fill-white"
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
              class="h-5 w-5 fill-gray-800 dark:fill-white"
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
