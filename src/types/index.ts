interface TierRowData {
  id: string
  text: string
  textColor?: string
  backgroundColor?: string
  elements: TierElementData[]
}

interface TierElementData {
  id: string
  text?: string
  textColor?: string
  backgroundColor?: string
  imageUrl?: string
}
