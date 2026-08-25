export interface BOMItem {
  id: string
  category: 'fabric' | 'trim' | 'thread' | 'label' | 'artwork' | 'packaging'
  item: string
  specification: string
  quantity?: string
  placement?: string
}

export const hoodieBOM: BOMItem[] = [
  { id: 'body-fabric', category: 'fabric', item: 'Main Body', specification: 'Heavyweight cotton fleece, 400 GSM' },
  { id: 'rib', category: 'trim', item: 'Rib', specification: '2x2 cotton rib', placement: 'Cuffs and hem' },
  { id: 'drawcord', category: 'trim', item: 'Drawcord', specification: 'Cotton braided cord', placement: 'Hood opening' },
  { id: 'thread', category: 'thread', item: 'Sewing Thread', specification: 'Polyester core-spun, matching color' },
  { id: 'main-label', category: 'label', item: 'Main Label', specification: 'Woven brand label', placement: 'Inside back neck' },
]

export const tshirtBOM: BOMItem[] = [
  { id: 'body-fabric', category: 'fabric', item: 'Main Body', specification: '100% cotton jersey, 220 GSM' },
  { id: 'neck-rib', category: 'trim', item: 'Neck Rib', specification: '1x1 cotton rib', placement: 'Neckline' },
  { id: 'thread', category: 'thread', item: 'Sewing Thread', specification: 'Polyester core-spun, matching color' },
  { id: 'main-label', category: 'label', item: 'Main Label', specification: 'Woven brand label', placement: 'Inside back neck' },
]
