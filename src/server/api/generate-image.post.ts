import type { Buffer } from 'node:buffer'
import { createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import RenderedTierList from '~/components/render/RenderedTierList.vue'
import { tierListSchema } from '~/types/schemas'

// Timeout to render the image in miliseconds
const RENDER_TIMEOUT_MS = 3000

/**
 * Creates a png image from a a tier list
 */
export default defineEventHandler(async (event) => {
  const logger = useLogger()
  const body = await readValidatedBody(event, tierListSchema.safeParse)

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body',
      data: body.error.issues,
    })
  }

  const tierList: TierList = body.data

  const app = createApp(h(RenderedTierList), { list: tierList })
  const html = await renderToString(app)
  const css = await useStorage('assets:generated').getItem(`main.css`)
  const fullHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
      ${css}

      :root {
        background-color: transparent !important;
      }
      </style>
    </head>
    <body>
      ${html}
    </body>
  </html>
`

  const browser = await useBrowser()

  async function renderImage(): Promise<Buffer> {
    const page = await browser.newPage()

    await page.setViewport({
      width: 900,
      height: 1000,
      deviceScaleFactor: 2,
    })
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' })
    await page.waitForSelector('#tier-list-container')

    const element = await page.$('#tier-list-container')

    if (!element) {
      logger.error('Could not find tier list element')
      throw createError({
        statusCode: 500,
        message: 'Error rendering tier list',
      })
    }

    const screenshot = await element.screenshot({
      type: 'png',
      omitBackground: true,
    })
    return screenshot
  }

  try {
    const buffer = await Promise.race([
      renderImage(),
      timeout(RENDER_TIMEOUT_MS),
    ])

    event.node.res.setHeader('Content-Type', 'image/png')
    event.node.res.setHeader('Content-Disposition', `attachment; filename="${tierList.name || 'tier-list'}.png"`)
    return buffer
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === 'Timeout') {
        throw createError({
          statusCode: 408,
          message: 'Timeout while generating image',
        })
      } else {
        logger.error(e)
        throw createError({
          statusCode: 500,
          message: 'Error rendering tier list',
        })
      }
    }
  }
})

function timeout(ms: number) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms)
  })
}
