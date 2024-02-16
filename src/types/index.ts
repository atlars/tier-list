interface TierList {
  id: string
  name: string
  tierRows: TierRow[]
}

interface TierRow {
  id: string
  text: string
  textColor?: string
  backgroundColor?: string
  elements: TierElement[]
}

interface TierElement {
  id: string
  text?: string
  textColor?: string
  backgroundColor?: string
  imageUrl?: string
}
