import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindConfig from './tailwind.config'
import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  serverDir: 'src/server/',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-security'],
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
      version: pkg.version,
    },
    browserUrl: 'http://localhost:9222',
  },

  nitro: {
    imports: {
      dirs: ['src/server/utils'],
    },
    rollupConfig: {
      // @ts-expect-error
      plugins: [vue()],
    },
    serverAssets: [
      {
        baseName: 'generated',
        dir: './.generated',
      },
    ],
    routeRules: {
      '/generate-image': {
        security: {
          // Allow 3 requests per 10 seconds
          rateLimiter: {
            tokensPerInterval: 3,
            interval: 10000,
          },
        },
      },
    },
  },

  security: {
    enabled: true,
    hidePoweredBy: true,
    csrf: true,
    headers: {
      contentSecurityPolicy: {
        'img-src': ['*'],
      },
    },
  },

  hooks: {
    // Generate css file for the server side rendered components
    'build:before': async () => {
      const mainCss = fs.readFileSync(path.resolve(__dirname, 'src/assets/main.css'), 'utf8')
      const result = await postcss([
        tailwindcss({
          config: tailwindConfig,
        }),
        autoprefixer,
      ]).process(mainCss, { from: 'src/assets/main.css' })
      const cssPath = path.resolve(__dirname, 'src/server/.generated/main.css')
      fs.mkdirSync(path.dirname(cssPath), { recursive: true })
      fs.writeFileSync(cssPath, result.css)
    },
  },

  compatibilityDate: '2024-11-30',
})
