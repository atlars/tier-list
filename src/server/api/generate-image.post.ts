import puppeteer from 'puppeteer'
import 'src/assets/main.css'
import { createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import RenderedTierList from '~/components/render/RenderedTierList.vue'
import { tierListSchema } from '~/types/schemas'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, tierListSchema.safeParse);

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
  // Launch a new browser instance
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({
    width: 900,
    height: 1000,
    deviceScaleFactor: 2
  })

  // Set the content of the page
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' })

  await page.waitForSelector('#tier-list-container')

  // Get the element
  const element = await page.$('#tier-list-container')

  if (!element) {
    throw new Error('Could not find the tier list element')
  }

  const screenshot = await element.screenshot({
    type: 'png',
    omitBackground: true
  })

  await browser.close()
  // Set the response headers for binary image data
  event.node.res.setHeader('Content-Type', 'image/png')
  event.node.res.setHeader('Content-Disposition', 'inline; filename="tier-list.png"')
  // Return the screenshot buffer directly as binary data
  return screenshot
})
