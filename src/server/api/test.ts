import { createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { useDialog } from '@/composables/dialog'
import RenderedTierList from '~/components/render/RenderedTierList.vue'
import 'src/assets/main.css'

export default defineEventHandler((event) => {
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
  return renderToString(app)
})
