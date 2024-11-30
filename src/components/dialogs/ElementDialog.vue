<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import { v4 as uuid } from 'uuid'
import { onKeyUp } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const props = defineProps<Props>()

const modal = ref<HTMLElement | null>(null)

interface Props {
  tierElement?: TierElement
}

const defaultElement: TierElement = {
  id: uuid(),
  backgroundColor: '#f0f0f0',
  textColor: '#000000',
}

const { openDialog, closeDialog } = useDialog()

const tierElement = props.tierElement ? { ...toRaw(props.tierElement) } : defaultElement
const createElement: boolean = props.tierElement === undefined

onClickOutside(modal, cancel)
onKeyUp('Escape', cancel)
useFocusTrap(modal, { immediate: true, initialFocus: false })

function submit() {
  closeDialog(tierElement)
}

function cancel() {
  closeDialog()
}

defineExpose({
  returnValue: (): TierElement | undefined => {
    return undefined
  },
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex size-full max-h-full justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 p-4 pt-8">
    <div class="relative max-h-full w-full max-w-lg">
      <!-- Modal content -->
      <div ref="modal" class="relative rounded-lg bg-white shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            {{ createElement ? 'Create element' : 'Edit element' }}
          </h3>
          <button
            type="button"
            class="ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="cancel()"
          >
            <svg
              class="size-3"
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
                v-model="tierElement.text"
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                maxlength="40"
              >
            </div>

            <input
              v-model="tierElement.textColor"
              class="size-12 cursor-pointer appearance-none bg-transparent"
              type="color"
            >
          </div>

          <!-- Background -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Background</label>
            <div class="flex items-center">
              <div class="flex flex-1">
                <span
                  class="rounded-e-0 inline-flex items-center rounded-s-md border border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="size-6 fill-gray-600 dark:fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path
                      d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"
                    />
                  </svg>
                </span>
                <input
                  v-model="tierElement.imageUrl"
                  type="text"
                  class="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="https://placehold.co/600x400.png"
                >
              </div>
              <span class="px-4 dark:text-white">or</span>
              <input
                v-model="tierElement.backgroundColor"
                class="size-12 cursor-pointer appearance-none bg-transparent"
                type="color"
              >
            </div>
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
