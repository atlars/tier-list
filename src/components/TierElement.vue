<script lang="ts" setup>
defineProps<{
  element: TierElementData
}>()
</script>

<template>
  <div
    class="relative flex max-h-[8rem] min-h-[5rem] min-w-[5rem] max-w-[8rem] items-center justify-center hover:cursor-default"
    :style="{ backgroundColor: element.backgroundColor ?? '#5c7cff' }"
  >
    <div
      class="break-all p-2 text-white"
      :class="[element.imageUrl ? 'absolute z-10' : '']"
      :style="{ color: element.textColor ?? 'black' }"
    >
      {{ element.text }}
    </div>
    <img
      v-if="element.imageUrl"
      class="max-h-[8rem] min-h-[5rem] min-w-[5rem] object-cover object-top"
      :src="element.imageUrl"
    >
  </div>
</template>
