<script setup lang="ts">
const { isVisible, message, type, closeSnackbar } = useSnackbar()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      class="fixed bottom-4 right-4 z-50 mb-4 flex items-center rounded-lg p-4 dark:bg-gray-800"
      :class="{
        'bg-green-50 text-green-800': type === 'success',
        'bg-red-50 text-red-800': type === 'error',
        'bg-blue-50 text-blue-800': type === 'info',
        'bg-yellow-50 text-yellow-800': type === 'warning',
      }"
    >
      <svg
        class="size-4 flex-shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Info</span>
      <div class="me-2 ms-3 text-sm font-medium">
        {{ message }}
      </div>
      <button
        type="button"
        class="-m-1.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg p-1.5"
        :class="{
          'bg-green-50 text-green-500 hover:bg-green-200 focus:ring-green-400': type === 'success',
          'bg-red-50 text-red-500 hover:bg-red-200 focus:ring-red-400': type === 'error',
          'bg-blue-50 text-blue-500 hover:bg-blue-200 focus:ring-blue-400': type === 'info',
          'bg-yellow-50 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400': type === 'warning',
        }"
        aria-label="Close"
        @click="closeSnackbar()"
      >
        <span class="sr-only">Close</span>
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
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
