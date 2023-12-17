<script lang="ts" setup>
import type { TierElementData } from '@/views/TierList.vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const isVisible = ref(false)
const modal = ref<HTMLElement | null>(null)

const templateElement: TierElementData = { id: '', name: '', imageUrl: '', color: '#244ef5' }

const tierElement = ref<TierElementData>(templateElement)
const editElement = ref(false)

function open(element?: TierElementData) {
  editElement.value = element !== undefined
  tierElement.value = {
    ...templateElement,
    ...element
  }
  isVisible.value = true
}

function close() {
  isVisible.value = false
  emit('onClose', tierElement.value)
}

onClickOutside(modal, close)

const emit = defineEmits<{
  onClose: [element: TierElementData]
}>()

defineExpose({
  open,
  close
})
</script>

<template>
  <Teleport to="#app">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex h-full max-h-full w-full justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 p-4 pt-8"
    >
      <div class="relative max-h-full w-full max-w-lg">
        <!-- Modal content -->
        <div class="relative rounded-lg bg-white shadow dark:bg-gray-700" ref="modal">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5"
          >
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">{{ editElement ? "Edit" : "Create"}}</h3>
            <button
              type="button"
              class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              @click="close"
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
            <div>
              <label for="name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >Text</label
              >
              <input
                type="text"
                id="name"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                v-model="tierElement.name"
              />
            </div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white"
              >Background</label
            >
            <div class="flex items-center">
              <div class="flex flex-1">
                <span
                  class="rounded-e-0 inline-flex items-center rounded-s-md border border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400"
                >
                  <svg
                    class="h-6 w-6 fill-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path
                      d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  class="block w-full min-w-0 flex-1 rounded-none rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="https://placehold.co/600x400.png"
                  v-model="tierElement.imageUrl"
                />
              </div>
              <span class="px-4">or</span>
              <input
                id="style1"
                class="h-12 w-12 cursor-pointer appearance-none bg-transparent"
                type="color"
                v-model="tierElement.color"
              />
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5"
          >
            <button
              data-modal-hide="medium-modal"
              type="button"
              class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="close"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
input[type='color']::-moz-color-swatch {
  border-radius: 8px;
  border-style: none;
}

input[type='color']::-webkit-color-swatch {
  border-radius: 8px;
  border-style: none;
}
</style>
