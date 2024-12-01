import FloatingVue, { vTooltip } from 'floating-vue'
import 'floating-vue/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  // https://floating-vue.starpad.dev/guide/config#default-values
  FloatingVue.options.themes.tooltip.placement = 'bottom'
  FloatingVue.options.themes.tooltip.delay.show = 500

  nuxtApp.vueApp.directive('tooltip', vTooltip)
})
