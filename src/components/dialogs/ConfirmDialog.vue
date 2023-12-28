<script lang="ts" setup>
import { closeDialog } from '@/plugins/promise-dialog'
import { onClickOutside, onKeyUp } from '@vueuse/core'
import { ref } from 'vue'

interface Props {
  text?: string
  subText?: string
  confirmButtonText?: string
  cancelButtonText?: string
}

let props = withDefaults(defineProps<Props>(), {
  text: 'Are you sure?',
  confirmButtonText: 'Yes',
  cancelButtonText: 'No'
})

let dialog = ref<HTMLElement | null>(null)

defineExpose({
  returnValue: () => false
})

onKeyUp('Escape', cancel)
onClickOutside(dialog, cancel)

function cancel() {
  closeDialog(false)
}

function confirm() {
  closeDialog(true)
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex h-full w-full justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 pt-20"
  >
    <div class="relative max-h-full w-full max-w-md">
      <div class="relative rounded-lg bg-white shadow dark:bg-gray-700" ref="dialog">
        <button
          type="button"
          class="absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="cancel"
        >
          <svg
            class="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6">
          <div class="pb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="me-4 inline-block h-12 w-12 fill-red-500 align-middle"
              viewBox="0 -960 960 960"
            >
              <path
                d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm-40-361h80v-240h-80v240Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Z"
              />
            </svg>
            <div class="inline-block align-middle">
              <h1 class="text-xl font-normal text-gray-700 dark:text-gray-500">{{ props.text }}</h1>
              <h2 class="text-base font-normal text-gray-500 dark:text-gray-400">
                {{ props.subText }}
              </h2>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-4 text-right">
            <button
              type="button"
              @click="confirm"
              class="me-2 inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              {{ props.confirmButtonText }}
            </button>
            <button
              type="button"
              @click="cancel"
              class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              {{ props.cancelButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
