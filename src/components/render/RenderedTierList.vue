<script lang="ts" setup>
defineProps<{
  list: TierList
}>()
</script>

<template>
  <div id="tier-list-container">
    <div
      v-for="(row, rowIndex) in list.tierRows"
      :key="rowIndex"
      class="box-content flex h-full min-h-20 flex-row border-t-2 border-gray-700 bg-slate-600 first:border-t-0"
    >
      <div
        class="flex w-24 items-center justify-center break-all border-r-2 border-gray-700 p-4"
        :style="{
          backgroundColor: row.backgroundColor ?? '#2563eb',
        }"
      >
        <p
          class="text-white outline-none"
          :style="{
            color: row.textColor ?? 'black',
          }"
        >
          {{ row.text }}
        </p>
      </div>
      <div
        v-for="(element, elementIndex) in row.elements"
        :key="elementIndex"
        class="relative flex max-h-32 min-h-20 min-w-20 max-w-32 items-center justify-center"
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
          class="max-h-32 min-h-20 min-w-20 object-cover object-top"
          :src="element.imageUrl"
        >
      </div>
    </div>
  </div>
</template>
