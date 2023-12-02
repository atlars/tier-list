<script lang="ts" setup>

interface Props {
  color?: string
}
withDefaults(defineProps<Props>(), {
  color: '#FF0000'
})
</script>

<template>
  <div class="h-18 w-18 bg-red-400">
  </div>
</template>
