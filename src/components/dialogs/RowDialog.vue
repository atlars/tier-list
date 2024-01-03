<script lang="ts" setup>
import { onKeyUp } from '@vueuse/core'
import { v4 as uuid } from 'uuid'
import { ref, toRaw } from 'vue'

interface Props {
  rowData?: TierRowData
}

const props = defineProps<Props>()

const { openDialog, closeDialog } = useDialog()

const defaultRowData: TierRowData = {
  id: uuid(),
  text: '',
  textColor: '#000000',
  backgroundColor: '#E68281',
  elements: [],
}

const row = props.rowData ? { ...toRaw(props.rowData) } : defaultRowData
const createElement: boolean = props.rowData === undefined

const modal = ref<HTMLElement | null>(null)

function submit() {
  closeDialog(row)
}

function cancel() {
  closeDialog(undefined)
}

onClickOutside(modal, cancel)
onKeyUp('Escape', cancel)

defineExpose({
  returnValue: (): TierRowData | undefined => {
    return undefined
  },
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex h-full max-h-full w-full justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 p-4 pt-8">
    <div class="relative max-h-full w-full max-w-lg">
      <!-- Modal content -->
      <div ref="modal" class="relative rounded-lg bg-white shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            {{ createElement ? 'Create row' : 'Edit row' }}
          </h3>
          <button
            type="button"
            class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="cancel()"
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
          </button>
        </div>
        <!-- Modal body -->
        <div class="space-y-4 p-4 md:p-5">
          <!-- Text -->
          <div class="flex items-end gap-2">
            <div class="flex-1">
              <label
                for="name"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Text</label>
              <input
                id="name"
                v-model="row.text"
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                maxlength="40"
              >
            </div>

            <input
              v-model="row.textColor"
              class="h-12 w-12 cursor-pointer appearance-none bg-transparent"
              type="color"
            >
          </div>
          <!-- Background -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Background</label>
            <input
              v-model="row.backgroundColor"
              class="h-12 w-12 cursor-pointer appearance-none bg-transparent"
              type="color"
            >
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center rounded-b border-t border-gray-200 p-4 md:p-5 dark:border-gray-600"
        >
          <button
            data-modal-hide="medium-modal"
            type="button"
            class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="submit"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='color']::-moz-color-swatch {
  border-radius: 8px;
  border-style: 1px solid rgb(95, 95, 95);
}

input[type='color']::-webkit-color-swatch {
  border-radius: 8px;
  border-style: 1px solid rgb(95, 95, 95);
}
</style>
