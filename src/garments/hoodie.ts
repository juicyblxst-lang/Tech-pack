import { createStarterSpec, type GarmentSpec } from '../core/garment-spec'
import { hoodiePOMs } from '../core/pom'
import { hoodieBOM } from '../core/bom'
import { hoodieConstruction } from '../core/construction'

export function createHoodie(): GarmentSpec {
  return {
    ...createStarterSpec('hoodie'),
    name: 'Oversized Hoodie',
    measurements: hoodiePOMs.map(p => ({ id: p.id, name: p.name, value: p.value ?? 0, unit: p.unit, tolerance: p.tolerance })),
    materials: hoodieBOM.map(item => ({ id: item.id, name: item.item, specification: item.specification, color: 'Black' })),
    construction: hoodieConstruction.map(step => step.operation + (step.notes ? `: ${step.notes}` : '')),
  }
}
