<!--
  * File: DialogWrapper.vue
 * Author: Régis Lemaigre
 * Source: https://github.com/rlemaigre/vue3-promise-dialog/blob/main/lib/components/DialogWrapper.vue
 * License: MIT
-->
<script lang="ts">
import { type ComponentPublicInstance, defineComponent, ref, watch } from 'vue'
import { dialogRef } from '~/composables/dialog'

export default defineComponent({
  name: 'DialogWrapper',
  components: {},
  props: {
    name: {
      type: String,
      default: 'default',
    },
    transitionAttrs: Object,
  },
  setup() {
    const dialogInstance = ref<ComponentPublicInstance<any>>()

    watch(dialogInstance, () => {
      if (dialogRef.value) dialogRef.value.comp = dialogInstance.value
    })

    return {
      dialogRef,
      dialogInstance,
    }
  },
})
</script>

<template>
  <transition v-bind="transitionAttrs">
    <component
      :is="dialogRef.dialog"
      v-if="dialogRef && dialogRef.wrapper === name"
      v-bind="dialogRef.props"
      ref="dialogInstance"
    />
  </transition>
</template>
