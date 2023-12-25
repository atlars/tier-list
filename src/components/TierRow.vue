<script setup lang="ts">
import type { TierRowData } from '@/views/TierList.vue'

let props = defineProps<{
  row: TierRowData
}>()
</script>

<template>
  <div class="flex h-full min-h-[5rem] flex-row bg-slate-700">
    <!-- Drag -->
    <!-- Handle class indicates the draggable library the area to drag on-->
    <div class="handle flex w-10 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="h-5 w-5 fill-white">
        <path
          d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z"
        />
      </svg>
    </div>
    <!-- Name -->
    <div class="flex w-24 items-center justify-center break-all p-4" :style="{ backgroundColor: props.row.backgroundColor ?? '#2563eb'}">
      <p contenteditable="plaintext-only" class="font-bold text-white outline-none" :style="{ color: props.row.textColor ?? 'black'}">
        {{ props.row.text }}
      </p>
    </div>
    <!-- Tier elements -->
    <slot name="elements"></slot>
  </div>
</template>

<style scoped>
.tier-element-move {
  transition: transform 0.5s;
}
</style>
