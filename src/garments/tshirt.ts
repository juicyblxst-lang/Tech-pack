import { createStarterSpec, type GarmentSpec } from '../core/garment-spec'
import { tshirtPOMs } from '../core/pom'
import { tshirtBOM } from '../core/bom'
import { tshirtConstruction } from '../core/construction'

export function createTshirt(): GarmentSpec {
  return {
    ...createStarterSpec('tshirt'),
    name: 'Classic T-shirt',
    measurements: tshirtPOMs.map(p => ({ id: p.id, name: p.name, value: p.value ?? 0, unit: p.unit, tolerance: p.tolerance })),
    materials: tshirtBOM.map(item => ({ id: item.id, name: item.item, specification: item.specification, color: 'Black' })),
    construction: tshirtConstruction.map(step => step.operation + (step.notes ? `: ${step.notes}` : '')),
  }
}
