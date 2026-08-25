export interface BOMItem {
  id: string
  category: 'fabric' | 'trim' | 'thread' | 'label' | 'artwork'
  item: string
  specification: string
  placement?: string
}

export const tshirtBOM: BOMItem[] = [
  { id: 'fabric', category: 'fabric', item: 'Main Fabric', specification: '100% cotton jersey, 220 GSM' },
  { id: 'thread', category: 'thread', item: 'Sewing Thread', specification: 'Polyester, matching color' },
  { id: 'label', category: 'label', item: 'Main Label', specification: 'Woven brand label', placement: 'Back neck' },
]

export const hoodieBOM: BOMItem[] = [
  { id: 'fabric', category: 'fabric', item: 'Main Fabric', specification: 'Cotton/polyester fleece, 400 GSM' },
  { id: 'rib', category: 'trim', item: 'Rib', specification: '2x2 cotton rib', placement: 'Cuff and hem' },
  { id: 'cord', category: 'trim', item: 'Drawcord', specification: 'Flat cotton drawcord', placement: 'Hood opening' },
  { id: 'thread', category: 'thread', item: 'Sewing Thread', specification: 'Polyester, matching color' },
  { id: 'label', category: 'label', item: 'Main Label', specification: 'Woven brand label', placement: 'Back neck' },
]
