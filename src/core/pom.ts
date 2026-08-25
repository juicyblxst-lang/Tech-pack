export type Unit = 'cm' | 'in'

export interface POM {
  id: string
  name: string
  definition: string
  value: number
  unit: Unit
  tolerance?: number
}

export const tshirtPOMs: POM[] = [
  { id: 'a', name: 'Body Length', definition: 'High point shoulder to bottom hem', value: 70, unit: 'cm', tolerance: 1 },
  { id: 'b', name: 'Chest Width', definition: '1 inch below armhole, straight across', value: 56, unit: 'cm', tolerance: 1 },
  { id: 'c', name: 'Shoulder Width', definition: 'Shoulder point to shoulder point', value: 47, unit: 'cm', tolerance: 0.5 },
  { id: 'd', name: 'Sleeve Length', definition: 'Shoulder point to sleeve hem', value: 22, unit: 'cm', tolerance: 0.5 },
]

export const hoodiePOMs: POM[] = [
  { id: 'a', name: 'Body Length', definition: 'High point shoulder to bottom hem', value: 70, unit: 'cm', tolerance: 1 },
  { id: 'b', name: 'Chest Width', definition: '1 inch below armhole, straight across', value: 62, unit: 'cm', tolerance: 1 },
  { id: 'c', name: 'Shoulder Width', definition: 'Shoulder point to shoulder point', value: 61, unit: 'cm', tolerance: 1 },
  { id: 'd', name: 'Sleeve Length', definition: 'Shoulder point to cuff edge', value: 62, unit: 'cm', tolerance: 1 },
  { id: 'e', name: 'Hood Height', definition: 'Neck seam to hood edge', value: 38, unit: 'cm', tolerance: 1 },
]
