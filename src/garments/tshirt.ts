import { createStarterSpec, type GarmentSpec } from '../core/garment-spec'
import { tshirtPOMs } from '../core/pom'
import { tshirtBOM } from '../core/bom'
import { tshirtConstruction } from '../core/construction'

export function createTshirt(): GarmentSpec {
  return {
    ...createStarterSpec('tshirt'),
    name: 'Classic T-shirt',
    measurements: tshirtPOMs.map(p => ({ id: p.id, name: p.name, value: p.value, unit: p.unit, tolerance: p.tolerance, definition: p.definition })),
    materials: tshirtBOM.map(item => ({ id: item.id, name: item.item, type: item.category, color: 'Black', notes: item.specification })),
    construction: tshirtConstruction.map(step => `${step.operation}: ${step.instruction}`),
  }
}
