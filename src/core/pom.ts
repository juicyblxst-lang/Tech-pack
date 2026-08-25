export type POMType = 'length' | 'width' | 'circumference' | 'opening' | 'placement'

export interface POM {
  id: string
  code: string
  name: string
  type: POMType
  definition: string
  value?: number
  unit: 'cm' | 'in'
  tolerance?: number
  required: boolean
}

export const hoodiePOMs: POM[] = [
  { id: 'body-length', code: 'A', name: 'Body Length', type: 'length', definition: 'High point shoulder to bottom hem', unit: 'cm', required: true },
  { id: 'chest', code: 'B', name: '1/2 Chest', type: 'width', definition: '1 inch below armhole, straight across', unit: 'cm', required: true },
  { id: 'shoulder', code: 'C', name: 'Shoulder Width', type: 'width', definition: 'Shoulder point to shoulder point', unit: 'cm', required: true },
  { id: 'sleeve', code: 'D', name: 'Sleeve Length', type: 'length', definition: 'Shoulder point to sleeve opening', unit: 'cm', required: true },
  { id: 'hood-depth', code: 'E', name: 'Hood Depth', type: 'length', definition: 'Hood opening seam to crown', unit: 'cm', required: true },
  { id: 'cuff-opening', code: 'F', name: 'Cuff Opening', type: 'opening', definition: 'Straight across cuff opening', unit: 'cm', required: true },
]

export const tshirtPOMs: POM[] = [
  { id: 'body-length', code: 'A', name: 'Body Length', type: 'length', definition: 'High point shoulder to bottom hem', unit: 'cm', required: true },
  { id: 'chest', code: 'B', name: '1/2 Chest', type: 'width', definition: '1 inch below armhole, straight across', unit: 'cm', required: true },
  { id: 'shoulder', code: 'C', name: 'Shoulder Width', type: 'width', definition: 'Shoulder point to shoulder point', unit: 'cm', required: true },
  { id: 'sleeve', code: 'D', name: 'Sleeve Length', type: 'length', definition: 'Shoulder point to sleeve opening', unit: 'cm', required: true },
  { id: 'neck-opening', code: 'E', name: 'Neck Opening', type: 'circumference', definition: 'Along finished neckline', unit: 'cm', required: true },
  { id: 'sleeve-opening', code: 'F', name: 'Sleeve Opening', type: 'opening', definition: 'Straight across sleeve opening', unit: 'cm', required: true },
]
