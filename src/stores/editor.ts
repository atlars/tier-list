import { skipHydrate } from 'pinia'
import { v4 as uuid } from 'uuid'
import { LocalStorageKeys } from '~/constants'

export const useEditorStore = defineStore('tier-lists', () => {
  const list = useLocalStorage(LocalStorageKeys.EditorTierList, () => <TierList>{
    id: uuid(),
    name: 'untitled',
    tierRows: [],
    availableElements: [],
  }, {
    // When value is overridden, do not merge value with existing value in localStorage
    mergeDefaults: false,
  })

  function addElement(element: TierElement) {
    list.value.availableElements.push(element)
  }

  function deleteElement(element: TierElement) {
    list.value.availableElements = list.value.availableElements.filter(e => e.id !== element.id)
    list.value.tierRows.forEach((item) => {
      item.elements = item.elements.filter(e => e.id !== element.id)
    })
  }

  function updateElement(element: TierElement) {
    let index = list.value.availableElements.findIndex(e => e.id === element.id)
    if (index <= -1) {
      list.value.tierRows.forEach((row) => {
        index = row.elements.findIndex(e => e.id === element.id)
        if (index >= 0) row.elements.splice(index, 1, element)
      })
    } else {
      list.value.availableElements.splice(index, 1, element)
    }
  }

  function addRow(row: TierRow) {
    list.value.tierRows.push(row)
  }

  function deleteRow(row: TierRow) {
    const index = list.value.tierRows.findIndex(r => r.id === row.id)
    if (index >= 0) list.value.tierRows.splice(index, 1)
  }

  function updateRow(row: TierRow) {
    const index = list.value.tierRows.findIndex(r => r.id === row.id)
    list.value.tierRows.splice(index, 1, row)
  }

  function resetElements() {
    list.value.tierRows.forEach((row) => {
      list.value.availableElements.push(...row.elements)
      row.elements = []
    })
  }

  function resetList() {
    list.value = {
      id: uuid(),
      name: 'untitled',
      tierRows: [],
      availableElements: [],
    }
  }

  return {
    editorTierList: skipHydrate(list),
    addElement,
    deleteElement,
    updateElement,
    addRow,
    deleteRow,
    updateRow,
    resetElements,
    resetList,
  }
})
