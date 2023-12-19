<script lang="ts" setup>
import type { TierElementData } from '@/views/TierList.vue'

const props = defineProps<{
  element: TierElementData
}>()
</script>

<template>
  <div
    class="relative max-h-[8rem] min-h-[5rem] min-w-[5rem] max-w-[8rem] hover:cursor-default flex justify-center items-center"
    :style="[{ backgroundColor: element.color }]"
  >
    <div :class="[element.imageUrl ? 'absolute z-10': '',  'text-white break-all p-2']">{{ element.name }}</div>
    <img
      v-if="element.imageUrl"
      class="object-cover object-top max-h-[8rem] min-h-[5rem] min-w-[5rem]"
      :src="element.imageUrl"
    />
  </div>
</template>
