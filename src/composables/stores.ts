import { skipHydrate } from 'pinia'
import { v4 as uuid } from 'uuid'
import { LocalStorageKeys } from '~/constants'

export const useTierListStore = defineStore('tier-lists', () => {
  const editorTierList = useLocalStorage(LocalStorageKeys.EditorTierList, () => <TierList>{
    id: uuid(),
    name: 'untitled',
    tierRows: [],
    availableElements: [],
  })

  return {
    editorTierList: skipHydrate(editorTierList),
  }
})
