import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss'],
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
})
