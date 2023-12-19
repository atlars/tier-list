<script lang="ts" setup>
import { closeDialog } from '@/plugins/promise-dialog'
import { getCurrentInstance } from 'vue';

let app = getCurrentInstance()

let props = withDefaults(
  defineProps<{
    text: string
  }>(),
  {
    text: 'test'
  }
)

function close(argument?: string) {
    console.log()
}
</script>

<template>
  <div>
    <button @click="close('yes')">Yes</button>
    <button @click="close('no')">No</button>
  </div>
</template>
