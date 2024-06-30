import 'src/assets/main.css'
import { createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import RenderedTierList from '~/components/render/RenderedTierList.vue'

export default defineEventHandler(async (event) => {
  const exampleList: TierList = {
    id: '1',
    name: 'test',
    availableElements: [],
    tierRows: [
      {
        id: '1',
        text: 'A',
        elements: [
          {
            id: '1',
            text: 'A1',
          },
          {
            id: '2',
            text: 'A2',
          },
        ],
      },
      {
        id: '1',
        text: 'B',
        elements: [],
      },
    ],
  }
  const app = createApp(h(RenderedTierList), { list: exampleList })
  const html = await renderToString(app)
  const css = await useStorage('assets:generated').getItem(`main.css`)
  const fullHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
      ${css}
      </style>
    </head>
    <body>
      ${html}
    </body>
  </html>
`

  return fullHtml
})
