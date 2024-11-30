<script lang="ts" setup>
import { ToolbarItem } from '@/types/editor'

const emit = defineEmits<{
  itemClicked: [item: ToolbarItem]
}>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <!-- New row button -->
    <button
      type="button"
      class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="emit('itemClicked', ToolbarItem.NewFile)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="me-1 size-5 fill-white">
        <path
          d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
        />
      </svg>
      New
    </button>

    <!-- Save button -->
    <button
      type="button"
      class="rounded-lg bg-blue-600 p-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-5 fill-white">
        <path
          d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"
        />
      </svg>
    </button>

    <!-- Download button -->
    <button
      type="button"
      class="rounded-lg bg-blue-600 p-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="emit('itemClicked', ToolbarItem.Download)"
    >
      <svg class="size-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path
          d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
        />
      </svg>
    </button>

    <!-- Reset elements button -->
    <button
      type="button"
      class="rounded-lg bg-blue-600 p-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="emit('itemClicked', ToolbarItem.ResetElements)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-5 fill-white">
        <path
          d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"
        />
      </svg>
    </button>

    <div class="flex-1" />

    <!-- New row button -->
    <button
      type="button"
      class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="emit('itemClicked', ToolbarItem.NewRow)"
    >
      <svg class="me-1 size-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
      </svg>
      Row
    </button>
  </div>
</template>
