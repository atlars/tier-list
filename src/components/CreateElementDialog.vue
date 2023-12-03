<script lang="ts" setup>
import type { TierElementData } from '@/views/TierList.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isVisible = ref(false)
const tierElement = ref<TierElementData>({ name: '' })
const modal = ref<HTMLElement | null>(null)

const emit = defineEmits<{
  onClose: [element: TierElementData]
}>()

function close() {
  isVisible.value = false
  emit('onClose', tierElement.value)
}

function open() {
  isVisible.value = true
}

onClickOutside(modal, close)

defineExpose({
  open,
  close
})
</script>

<template>
  <Teleport to="#app">
    <div
      v-if="isVisible"
      class="bg-black bg-opacity-40 fixed z-50 p-4 pt-8 flex h-full max-h-full w-full justify-center overflow-y-auto overflow-x-hidden inset-0"
    >
      <div class="relative max-h-full w-full max-w-lg">
        <!-- Modal content -->
        <div class="relative rounded-lg bg-white shadow dark:bg-gray-700" ref="modal">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5"
          >
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Default modal</h3>
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
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="space-y-4 p-4 md:p-5">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy
              laws for its citizens, companies around the world are updating their terms of service
              agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on
              May 25 and is meant to ensure a common set of data rights in the European Union. It
              requires organizations to notify users as soon as possible of high-risk data breaches
              that could personally affect them.
            </p>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5"
          >
            <button
              data-modal-hide="medium-modal"
              type="button"
              class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              data-modal-hide="medium-modal"
              type="button"
              class="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
