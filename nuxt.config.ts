import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  serverDir: 'src/server/',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['@/assets/main.css'],
  routeRules: {
    '/': { ssr: false },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  imports: {
    autoImport: true,
    dirs: ['types/*.ts'],
  },
  runtimeConfig: {
    public: {
      vesion: pkg.version,
    },
  },
  nitro: {
    rollupConfig: {
      // @ts-expect-error
      plugins: [vue()],
    },
  },
})
