export type GarmentCategory = 'tshirt' | 'hoodie'
export type Fit = 'regular' | 'oversized' | 'cropped'

export interface Measurement { id: string; name: string; value: number; unit: 'cm' | 'in'; tolerance?: number }
export interface Material { id: string; name: string; specification: string; color?: string }
export interface Artwork { id: string; type: 'print' | 'embroidery' | 'applique'; placement: string; width?: number; height?: number; }

export interface GarmentSpec {
  id: string
  name: string
  category: GarmentCategory
  fit: Fit
  colorways: string[]
  measurements: Measurement[]
  materials: Material[]
  artwork: Artwork[]
  construction: string[]
  version: number
}

export const createStarterSpec = (category: GarmentCategory): GarmentSpec => ({
  id: crypto.randomUUID(),
  name: category === 'hoodie' ? 'Oversized Hoodie' : 'Classic T-shirt',
  category,
  fit: category === 'hoodie' ? 'oversized' : 'regular',
  colorways: ['Black'],
  measurements: [],
  materials: [],
  artwork: [],
  construction: [],
  version: 1,
})
