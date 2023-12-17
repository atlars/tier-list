<script lang="ts" setup>
import type { TierElementData } from '@/views/TierList.vue';

const props = defineProps<{
  element: TierElementData
}>()
</script>

<template>
  <div class="h-20 w-20 flex items-center justify-center hover:cursor-default p-2" :style="{ backgroundColor: element.color}">
    <span class="break-all">{{ element.name }}</span>
  </div>
</template>
